import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import AdminLayout from "../../components/layouts/AdminLayout";
import Markdown from "../../components/Markdown";
import { Doc } from "../../interfaces";
import { getDoc, getDocSlugs } from "../../lib/docs";
import { NotFoundError } from "../../lib/errors";
import { getAsArray } from "../../utils/queryParams";

interface Props {
    doc: Doc | null;
    errors?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const Documentation: NextPage<Props> = ({ doc, errors }: Props) => {
    const classes = useStyles();

    if (errors) {
        <AdminLayout title="Error">
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" style={{ color: "red" }}>
                        Error
                    </Typography>
                    <p>
                        <span>{errors}</span>
                    </p>
                </div>
            </Container>
        </AdminLayout>;
    }

    return (
        <AdminLayout title={`${doc && doc.title ? doc.title : "Documentation"}`}>
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>{doc && <Markdown source={doc.content} />}</div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: { params: { slug: string[] } }[] = (await getDocSlugs()).map(slug => ({
        params: {
            slug: slug.split("/")
        }
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const staticProps: GetStaticPropsResult<Props> = { props: { doc: null } };

    try {
        if (params?.slug) {
            const slug = params.slug;
            const doc = await getDoc(getAsArray(slug).join("/"));

            if (!doc) throw new NotFoundError("Doc not found");
            else staticProps.props.doc = doc;
        }
    } catch (err) {
        staticProps.props.errors = err.message;
    }

    return staticProps;
};

export default Documentation;
