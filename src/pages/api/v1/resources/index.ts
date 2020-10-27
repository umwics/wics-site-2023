import { NextApiRequest, NextApiResponse } from "next";
import { hasPermission, Resource } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllResources, getUser } from "../../../../lib/db";
import { createAuditLog, createResource } from "../../../../lib/dbAdmin";
import { UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addResourceSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (_req: NextApiRequest, res: NextApiResponse) => {
        const resources: Resource[] = await getAllResources();

        res.status(200).json({ resources });
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");

            const rawValues = <Resource>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addResourceSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "write"))
                throw new UnauthorizedError("Invalid permissions");

            const newResource = await createResource({
                ...(newValues as Resource)
            });
            if (newResource) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "create",
                    collection: "resources",
                    timestamp: new Date().toISOString()
                });
            }

            res.status(200).json(newResource);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
