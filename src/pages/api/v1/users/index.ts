import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllUsers } from "../../../../lib/db";

const handler = getHandler().get(async (_req: NextApiRequest, res: NextApiResponse) => {
    const users: User[] = await getAllUsers();

    res.status(200).json({ users });
});

export default handler;
