import { NextApiRequest, NextApiResponse } from "next";
import { Company } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getCompany } from "../../../../lib/db";
import { NotFoundError } from "../../../../lib/errors";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler().get(async (req: NextApiRequest, res: NextApiResponse) => {
    const company: Company | null = await getCompany(getAsString(req.query.id));

    if (!company) throw new NotFoundError("Company not found");

    res.status(200).json(company);
});

export default handler;
