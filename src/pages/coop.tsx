import { Container, CssBaseline, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import { default as React } from "react";
import BackToTop from "../components/BackToTop";
import CoopCard from "../components/coop/CoopCard";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8)
    },
    root: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    icon: {
        marginRight: theme.spacing(2)
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
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    }
}));

const Coop: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Co-op">
            <Container component="main">
                <React.Fragment>
                    <CssBaseline />
                    <main>
                        {/* Hero unit */}
                        <div className={classes.heroContent}>
                            <Container maxWidth="md">
                                <Typography
                                    component="h2"
                                    variant="h2"
                                    align="center"
                                    color="textPrimary"
                                    gutterBottom
                                >
                                    Computer Science Co-op Program
                                </Typography>
                                <Typography
                                    component="h5"
                                    variant="h6"
                                    align="center"
                                    color="textSecondary"
                                    paragraph
                                >
                                    At the University of Manitoba provides students with a fantastic
                                    opportunity to transform academic knowledge into real-world
                                    experience. The program has garnered much success over the last
                                    few years and has become one of the university&apos;s largest
                                    co-op programs securing an average of 180 placements per year.
                                    The program focuses on matching students with employers for
                                    three four-month work terms. The list of companies ranges from
                                    local Winnipeg-based start-ups to international corporations.
                                </Typography>
                            </Container>
                        </div>

                        <div className={classes.heroContent} id="companies">
                            <Typography
                                component="h4"
                                variant="h4"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                Click the following companies to see which WICS members have worked
                                there!
                            </Typography>

                            <Container className={classes.cardGrid} maxWidth="md">
                                {/* End hero unit */}
                                <CoopCard />
                            </Container>
                        </div>
                    </main>
                </React.Fragment>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default Coop;
