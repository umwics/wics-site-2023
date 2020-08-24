import { NextApiRequest, NextApiResponse } from "next";
import { Company } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllCompanies } from "../../../../lib/db";

const handler = getHandler().get(async (_req: NextApiRequest, res: NextApiResponse) => {
    const companies: Company[] = await getAllCompanies();

    res.status(200).json({ companies });
});

export default handler;
