import { NextApiRequest, NextApiResponse } from "next";
import { Member } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getMember } from "../../../../lib/db";
import { NotFoundError } from "../../../../lib/errors";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler().get(async (req: NextApiRequest, res: NextApiResponse) => {
    const member: Member | null = await getMember(getAsString(req.query.id));

    if (!member) throw new NotFoundError("Member not found");

    res.status(200).json(member);
});

export default handler;
