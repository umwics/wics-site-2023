import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { GetStaticProps, NextPage } from "next";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import useSWR from "swr";
import ContentsLayout from "../components/layouts/ContentsLayout";
import EventTab from "../components/resources/EventTab";
import { Resource } from "../interfaces";
import { getAllResources } from "../lib/db";

interface Props {
    resources: Resource[];
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8)
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        "& h2": {
            color: "#363b3f",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "Lato"
        },
        "& h5": {
            fontFamily: "Lato"
        },
        "& h4": {
            color: "#ff6f6f",
            fontFamily: "Lato"
        }
    },
    section: {
        marginBottom: theme.spacing(8)
    },
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        textAlign: "center",
        "& h1": {
            color: "#363b3f",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "Lato"
        }
    }
}));

const Resources: NextPage<Props> = ({ resources }: Props) => {
    const classes = useStyles();

    const { data } = useSWR<{ resources: Resource[] }>(`/api/${process.env.apiVersion}/resources`, {
        initialData: { resources }
    });

    const revalidatedResources = (data && data.resources) || [];

    return (
        <ContentsLayout title="Resources">
            <Container component="main">
                <Fade bottom duration={1000} delay={100} distance="30px">
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography
                                component="h2"
                                variant="h2"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                Resources
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                align="center"
                                color="textSecondary"
                                paragraph
                            >
                                Discover more resources!
                            </Typography>
                        </Container>
                    </div>
                </Fade>
                <Fade bottom duration={1000} delay={300} distance="30px">
                    <EventTab resources={revalidatedResources} />
                </Fade>
            </Container>
        </ContentsLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const resources: Resource[] = await getAllResources();
    return { props: { resources }, revalidate: 60 };
};

export default Resources;
