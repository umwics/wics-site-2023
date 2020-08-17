import { NextApiRequest, NextApiResponse } from "next";
import getHandler from "../../lib/apiHandler";
import { NotFoundError } from "../../lib/errors";

const handler = getHandler().get(async (_req: NextApiRequest, _res: NextApiResponse) => {
    throw new NotFoundError("not found");
});

export default handler;
