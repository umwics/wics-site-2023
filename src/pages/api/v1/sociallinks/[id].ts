import { NextApiRequest, NextApiResponse } from "next";
import { hasPermission, TreeLink } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getSocialLink, getUser } from "../../../../lib/db";
import { createAuditLog, deleteSocialLink, updateSocialLink } from "../../../../lib/dbAdmin";
import { NotFoundError, UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addSocialLinkSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const socialLink: TreeLink | null = await getSocialLink(getAsString(req.query.id));

        if (!socialLink) throw new NotFoundError("Social Link not found");

        res.status(200).json(socialLink);
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "manage"))
                throw new UnauthorizedError("Invalid permissions");

            const success = await deleteSocialLink(id);
            if (success) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "delete",
                    collection: "sociallinks",
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

            const rawValues = <TreeLink>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addSocialLinkSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "manage"))
                throw new UnauthorizedError("Invalid permissions");

            const newSocialLinkValues = await updateSocialLink(id, {
                ...(newValues as Partial<TreeLink>)
            });
            if (newSocialLinkValues) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "update",
                    collection: "sociallinks",
                    timestamp: new Date().toISOString()
                });
            }

            res.status(200).json(newSocialLinkValues);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
