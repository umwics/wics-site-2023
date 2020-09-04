import { NextApiRequest, NextApiResponse } from "next";
import { Event, hasPermission } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllEvents, getUser } from "../../../../lib/db";
import { createEvent } from "../../../../lib/dbAdmin";
import { UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addEventSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (_req: NextApiRequest, res: NextApiResponse) => {
        const events: Event[] = await getAllEvents();

        res.status(200).json({ events });
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");

            const rawValues = <Event>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addEventSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || (executingUser && !hasPermission(executingUser, "write")))
                throw new UnauthorizedError("Invalid permissions");

            const newEvent = await createEvent({
                ...(newValues as Event)
            });

            res.status(200).json(newEvent);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
