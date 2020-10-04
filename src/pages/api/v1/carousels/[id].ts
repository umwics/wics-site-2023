import { NextApiRequest, NextApiResponse } from "next";
import { Carousel, hasPermission } from "../../../../interfaces";
import getHandler from "../../../../lib/apiHandler";
import { getCarousel, getUser } from "../../../../lib/db";
import { deleteCarousel, updateCarousel } from "../../../../lib/dbAdmin";
import { NotFoundError, UnauthorizedError } from "../../../../lib/errors";
import { auth } from "../../../../lib/firebaseAdmin";
import { addCarouselSchema, validateStrictStrip } from "../../../../lib/validators";
import { getAsString } from "../../../../utils/queryParams";

const handler = getHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const carousel: Carousel | null = await getCarousel(getAsString(req.query.id));

        if (!carousel) throw new NotFoundError("Carousel not found");

        res.status(200).json(carousel);
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "manage"))
                throw new UnauthorizedError("Invalid permissions");

            const success = await deleteCarousel(id);

            res.status(200).json({ statusCode: res.statusCode, success });
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = getAsString(req.headers.token || "");
            const id = getAsString(req.query.id);

            const rawValues = <Carousel>JSON.parse(req.body);
            const newValues = await validateStrictStrip(addCarouselSchema, rawValues);

            const decoded = await auth?.verifyIdToken(token);

            const executingUser = decoded?.uid ? await getUser(decoded.uid) : null;
            if (!executingUser || !hasPermission(executingUser, "manage"))
                throw new UnauthorizedError("Invalid permissions");

            const newCarouselValues = await updateCarousel(id, {
                ...(newValues as Partial<Carousel>)
            });

            res.status(200).json(newCarouselValues);
        } catch (e) {
            throw new UnauthorizedError("Token invalid");
        }
    });

export default handler;
