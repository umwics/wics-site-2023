import { NextApiRequest, NextApiResponse } from "next";
import { hasPermission, User } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getUser } from "../../../../lib/db";
import { updateUser } from "../../../../lib/dbAdmin";
import { NotFoundError, UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { updateUserSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const user: User | null = await getUser(getAsString(req.query.id));

        if (!user) throw new NotFoundError("User not found");

        res.status(200).json(user);
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const rawValues = <User>JSON.parse(req.body);
            const newValues = await validateStrictStrip(updateUserSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || (executingUser && !hasPermission(executingUser, "manage")))
                throw new UnauthorizedError("Invalid permissions");

            const newUserValues = await updateUser(id, {
                ...(newValues as Partial<User>)
            });

            res.status(200).json(newUserValues);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
