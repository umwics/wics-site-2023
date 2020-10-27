import { NextApiRequest, NextApiResponse } from "next";
import { Carousel, hasPermission } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getAllCarousels, getUser } from "../../../../lib/db";
import { createAuditLog, createCarousel } from "../../../../lib/dbAdmin";
import { UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addCarouselSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (_req: NextApiRequest, res: NextApiResponse) => {
        const carousels: Carousel[] = await getAllCarousels();

        res.status(200).json({ carousels });
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");

            const rawValues = <Carousel>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addCarouselSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "write"))
                throw new UnauthorizedError("Invalid permissions");

            const newCarousel = await createCarousel({
                ...(newValues as Carousel)
            });
            if (newCarousel) {
                createAuditLog({
                    id: "",
                    executorId: executingUser.id,
                    action: "create",
                    collection: "carousels",
                    timestamp: new Date().toISOString()
                });
            }

            res.status(200).json(newCarousel);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
