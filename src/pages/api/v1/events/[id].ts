import { NextApiRequest, NextApiResponse } from "next";
import { Event, hasPermission } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getEvent, getUser } from "../../../../lib/db";
import { createAuditLog, deleteEvent, updateEvent } from "../../../../lib/dbAdmin";
import { NotFoundError, UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addEventSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const event: Event | null = await getEvent(getAsString(req.query.id));

        if (!event) throw new NotFoundError("Event not found");

        res.status(200).json(event);
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "manage"))
                throw new UnauthorizedError("Invalid permissions");

            const success = await deleteEvent(id);
            if (success) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "delete",
                    collection: "events",
                    timestamp: new Date().toISOString()
                });
            }

            res.status(200).json({ statusCode: res.statusCode, success });
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const rawValues = <Event>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addEventSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "manage"))
                throw new UnauthorizedError("Invalid permissions");

            const newEventValues = await updateEvent(id, {
                ...(newValues as Partial<Event>)
            });
            if (newEventValues) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "update",
                    collection: "events",
                    timestamp: new Date().toISOString()
                });
            }

            res.status(200).json(newEventValues);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
