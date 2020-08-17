import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getHandler = () => {
    return nc<NextApiRequest, NextApiResponse>({
        onError(error, _req, res) {
            res.status(error.code || error.status || 500).json({
                statusCode: res.statusCode,
                error: `${error.message}`
            });
        },
        onNoMatch(req, res) {
            res.status(405).json({
                statusCode: res.statusCode,
                error: `Method ${req.method} Not Allowed`
            });
        }
    });
};

export default getHandler;
