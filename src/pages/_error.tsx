import { NextPage, NextPageContext } from "next";
import Error from "next/error";

interface Props {
    statusCode: number;
    title?: string;
}

const ErrorWrapper: NextPage<Props> = ({ statusCode, title }: Props) => {
    return <Error statusCode={statusCode} title={title} />;
};

ErrorWrapper.getInitialProps = ({ res, err }: NextPageContext): Promise<Props> | Props => {
    const statusCode = (res && res.statusCode) || (err && err.statusCode) || 404;

    return { statusCode };
};

export default ErrorWrapper;
