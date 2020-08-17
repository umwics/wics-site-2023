import { NextApiRequest, NextApiResponse } from "next";
import { Member } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllMembers } from "../../../../lib/db";

const handler = getHandler().get(async (_req: NextApiRequest, res: NextApiResponse) => {
    const members: Member[] = await getAllMembers();

    res.status(200).json({ members });
});

export default handler;
