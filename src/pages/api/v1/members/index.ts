import { NextApiRequest, NextApiResponse } from "next";
import { hasPermission, Member } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllMembers, getUser } from "../../../../lib/db";
import { createMember } from "../../../../lib/dbAdmin";
import { UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addMemberSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (_req: NextApiRequest, res: NextApiResponse) => {
        const members: Member[] = await getAllMembers();

        res.status(200).json({ members });
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");

            const rawValues = <Member>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addMemberSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || (executingUser && !hasPermission(executingUser, "write")))
                throw new UnauthorizedError("Invalid permissions");

            const newMember = await createMember({
                ...(newValues as Member)
            });

            res.status(200).json(newMember);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
