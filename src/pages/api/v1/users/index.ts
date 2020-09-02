import { NextApiRequest, NextApiResponse } from "next";
import { CustomUser, defaultUserRole, User } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllUsers, getUser } from "../../../../lib/db";
import { createUser } from "../../../../lib/dbAdmin";
import { UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { mapProviderUser } from "../../../../lib/mapProviderUser.";
import { createUserSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (_req: NextApiRequest, res: NextApiResponse) => {
        const users: User[] = await getAllUsers();

        res.status(200).json({ users });
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const rawCustomUser = <CustomUser>JSON.parse(req.body);
            const customUser = await validateStrictStrip(createUserSchema, rawCustomUser);

            // could check to see if the auth time was within ~5minutes and fail if greater

            const decoded = await auth?.verifyIdToken(token);

            const authUser = mapProviderUser(decoded);
            const oldUser = await getUser(authUser.id);
            const permissionUser = {
                role: oldUser?.role || defaultUserRole
            };

            const newUser = await createUser({
                ...oldUser,
                ...authUser,
                ...customUser,
                ...permissionUser
            } as User);

            res.status(200).json(newUser);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
