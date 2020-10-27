import { NextApiRequest, NextApiResponse } from "next";
import { Company, hasPermission } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getCompany, getUser } from "../../../../lib/db";
import { createAuditLog, deleteCompany, updateCompany } from "../../../../lib/dbAdmin";
import { NotFoundError, UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addCompanySchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const company: Company | null = await getCompany(getAsString(req.query.id));

        if (!company) throw new NotFoundError("Company not found");

        res.status(200).json(company);
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "manage"))
                throw new UnauthorizedError("Invalid permissions");

            const success = await deleteCompany(id);
            if (success) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "delete",
                    collection: "companies",
                    timestamp: new Date().toISOString()
                });
            }

            res.status(200).json({ statusCode: res.statusCode, success });
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const rawValues = <Company>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addCompanySchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "manage"))
                throw new UnauthorizedError("Invalid permissions");

            const newCompanyValues = await updateCompany(id, {
                ...(newValues as Partial<Company>)
            });
            if (newCompanyValues) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "update",
                    collection: "companies",
                    timestamp: new Date().toISOString()
                });
            }

            res.status(200).json(newCompanyValues);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
