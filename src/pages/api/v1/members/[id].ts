import { NextApiRequest, NextApiResponse } from "next";
import { hasPermission, Member } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getMember, getUser } from "../../../../lib/db";
import { deleteMember, updateMember } from "../../../../lib/dbAdmin";
import { NotFoundError, UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addMemberSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const member: Member | null = await getMember(getAsString(req.query.id));

        if (!member) throw new NotFoundError("Member not found");

        res.status(200).json(member);
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || (executingUser && !hasPermission(executingUser, "manage")))
                throw new UnauthorizedError("Invalid permissions");

            const success = await deleteMember(id);

            res.status(200).json({ statusCode: res.statusCode, success });
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const rawValues = <Member>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addMemberSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || (executingUser && !hasPermission(executingUser, "manage")))
                throw new UnauthorizedError("Invalid permissions");

            const newMemberValues = await updateMember(id, {
                ...(newValues as Partial<Member>)
            });

            res.status(200).json(newMemberValues);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
