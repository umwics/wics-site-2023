import { NextApiRequest, NextApiResponse } from "next";
import { Company, hasPermission } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllCompanies, getUser } from "../../../../lib/db";
import { createCompany } from "../../../../lib/dbAdmin";
import { UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addCompanySchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (_req: NextApiRequest, res: NextApiResponse) => {
        const companies: Company[] = await getAllCompanies();

        res.status(200).json({ companies });
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");

            const rawValues = <Company>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addCompanySchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || (executingUser && !hasPermission(executingUser, "write")))
                throw new UnauthorizedError("Invalid permissions");

            const newCompany = await createCompany({
                ...(newValues as Company)
            });

            res.status(200).json(newCompany);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
