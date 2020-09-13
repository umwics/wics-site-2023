import {
    Container,
    GridList,
    GridListTile,
    ListSubheader,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import AdminLoading from "../../components/AdminLoading";
import BackToTop from "../../components/BackToTop";
import ContentsLayout from "../../components/layouts/ContentsLayout";
import { Event } from "../../interfaces";
import { getEvent } from "../../lib/db";
import { NotFoundError } from "../../lib/errors";
import { getAsString } from "../../utils/queryParams";

interface Props {
    event: Event | null;
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

const EventDetail: NextPage<Props> = ({ event, errors }: Props) => {
    const router = useRouter();
    const classes = useStyles();

    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.up("sm"));
    const matchesLg = useMediaQuery(theme.breakpoints.up("md"));

    const cols = matchesLg ? 3 : matchesMd ? 2 : 1;

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <AdminLoading />;
    }

    if (errors) {
        return (
            <ContentsLayout title="Error">
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
            </ContentsLayout>
        );
    }

    return (
        <ContentsLayout title={`${event ? event.name : "Event Detail"}`}>
            <Container component="main">
                <div className={classes.paper}>
                    {event && (
                        <GridList cellHeight={400} cols={cols}>
                            <GridListTile key="Previews" cols={cols} style={{ height: "auto" }}>
                                <ListSubheader component="div">{event.name}</ListSubheader>
                            </GridListTile>
                            {event.images.map((url, idx) => (
                                <GridListTile key={idx}>
                                    <img src={url} />
                                </GridListTile>
                            ))}
                        </GridList>
                    )}
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    const paths: { params: { id: string } }[] = []; // Let it all fallback

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const staticProps: GetStaticPropsResult<Props> = {
        props: { event: null },
        revalidate: 60
    };

    try {
        if (params?.id) {
            const id = params.id;
            const event = await getEvent(getAsString(id));

            if (!event) throw new NotFoundError("Event not found");
            else staticProps.props.event = event;
        }
    } catch (err) {
        staticProps.props.errors = err.message;
    }

    return staticProps;
};

export default EventDetail;
