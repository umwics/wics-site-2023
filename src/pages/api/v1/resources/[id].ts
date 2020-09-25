import { NextApiRequest, NextApiResponse } from "next";
import { hasPermission, Resource } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getResource, getUser } from "../../../../lib/db";
import { deleteResource, updateResource } from "../../../../lib/dbAdmin";
import { NotFoundError, UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addResourceSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const resource: Resource | null = await getResource(getAsString(req.query.id));

        if (!resource) throw new NotFoundError("Resource not found");

        res.status(200).json(resource);
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || (executingUser && !hasPermission(executingUser, "manage")))
                throw new UnauthorizedError("Invalid permissions");

            const success = await deleteResource(id);

            res.status(200).json({ statusCode: res.statusCode, success });
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const rawValues = <Resource>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addResourceSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || (executingUser && !hasPermission(executingUser, "manage")))
                throw new UnauthorizedError("Invalid permissions");

            const newResourceValues = await updateResource(id, {
                ...(newValues as Partial<Resource>)
            });

            res.status(200).json(newResourceValues);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
