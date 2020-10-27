import { NextApiRequest, NextApiResponse } from "next";
import { hasPermission, TreeLink } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllSocialLinks, getUser } from "../../../../lib/db";
import { createAuditLog, createSocialLink } from "../../../../lib/dbAdmin";
import { UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addSocialLinkSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (_req: NextApiRequest, res: NextApiResponse) => {
        const socialLinks: TreeLink[] = await getAllSocialLinks();

        res.status(200).json({ links: socialLinks });
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");

            const rawValues = <TreeLink>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addSocialLinkSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "write"))
                throw new UnauthorizedError("Invalid permissions");

            const newSocialLink = await createSocialLink({
                ...(newValues as TreeLink)
            });
            if (newSocialLink) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "create",
                    collection: "sociallinks",
                    timestamp: new Date().toISOString()
                });
            }

            res.status(200).json(newSocialLink);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
