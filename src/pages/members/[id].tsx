/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Container,
    Grid,
    GridList,
    GridListTile,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import BackToTop from "../../components/BackToTop";
import ContentsLoading from "../../components/ContentsLoading";
import ContentsLayout from "../../components/layouts/ContentsLayout";
import { Member } from "../../interfaces";
import { getMember } from "../../lib/db";
import { NotFoundError } from "../../lib/errors";
import { getAsString } from "../../utils/queryParams";

interface Props {
    member: Member | null;
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

const MemberDetail: NextPage<Props> = ({ member, errors }: Props) => {
    const router = useRouter();
    const classes = useStyles();

    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.up("sm"));
    const matchesLg = useMediaQuery(theme.breakpoints.up("md"));

    const cols = matchesLg ? 3 : matchesMd ? 2 : 1;

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <ContentsLoading />;
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

    // TODO: Images should be lazy loaded with a fallback to either a lower quality version or given fallback.
    // checkout Next.js RFC for status on Image component progress https://github.com/vercel/next.js/discussions/16832
    return (
        <ContentsLayout title={`${member ? member.name : "Member Detail"}`}>
            <Container component="main">
                <div className={classes.paper}>
                    {member && (
                        <Grid container>
                            <GridList cellHeight={400} cols={cols}>
                                <GridListTile key="Previews" cols={cols} style={{ height: "auto" }}>
                                    <div>
                                        <Typography gutterBottom color="textPrimary" variant="h4">
                                            {member.name}
                                        </Typography>
                                        <Typography>{member.title}</Typography>
                                        <Typography gutterBottom variant="subtitle1">
                                            {new Date(member.email).toDateString()}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1">
                                            <FontAwesomeIcon icon={faMapMarker} /> {member.email}
                                        </Typography>
                                        <Typography paragraph variant="body2">
                                            {member.description}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            color="textSecondary"
                                            variant="subtitle2"
                                        >
                                            {member.links.join(" ")}
                                        </Typography>
                                    </div>
                                </GridListTile>
                            </GridList>
                        </Grid>
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
        props: { member: null },
        revalidate: 60
    };

    try {
        if (params?.id) {
            const id = params.id;
            const member = await getMember(getAsString(id));

            if (!member) throw new NotFoundError("Member not found");
            else if (staticProps.props) staticProps.props.member = member;
        }
    } catch (err) {
        if (staticProps.props) staticProps.props.errors = err.message;
    }

    return staticProps;
};

export default MemberDetail;
