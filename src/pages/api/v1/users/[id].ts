import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getUser } from "../../../../lib/db";
import { NotFoundError } from "../../../../lib/errors";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler().get(async (req: NextApiRequest, res: NextApiResponse) => {
    const user: User | null = await getUser(getAsString(req.query.id));

    if (!user) throw new NotFoundError("User not found");

    res.status(200).json(user);
});

export default handler;
