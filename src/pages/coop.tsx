import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { GetStaticProps, NextPage } from "next";
import { default as React } from "react";
import useSWR from "swr";
import BackToTop from "../components/BackToTop";
import CoopCard from "../components/coop/CoopCard";
import ContentsLayout from "../components/layouts/ContentsLayout";
import { Company, Member } from "../interfaces";
import { getAllCompanies, getAllMembers } from "../lib/db";

interface Props {
    companies: Company[];
    members: Member[];
}

const useStyles = makeStyles((theme: Theme) => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        "& h2": {
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
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    }
}));

const Coop: NextPage<Props> = ({ companies, members }: Props) => {
    const classes = useStyles();

    const { data: companyData } = useSWR<{ companies: Company[] }>(
        `/api/${process.env.apiVersion}/companies`,
        {
            initialData: { companies }
        }
    );
    const { data: memberData } = useSWR<{ members: Member[] }>(
        `/api/${process.env.apiVersion}/members`,
        {
            initialData: { members }
        }
    );

    const revalidatedCompanies = (companyData && companyData.companies) || [];
    const revalidatedMembers = (memberData && memberData.members) || [];

    return (
        <ContentsLayout title="Co-op">
            <Container component="main">
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
                            opportunity to transform academic knowledge into real-world experience.
                            The program has garnered much success over the last few years and has
                            become one of the university&apos;s largest co-op programs securing an
                            average of 180 placements per year. The program focuses on matching
                            students with employers for three four-month work terms. The list of
                            companies ranges from local Winnipeg-based start-ups to international
                            corporations.
                        </Typography>
                    </Container>
                </div>
                <div id="companies" className={classes.heroContent}>
                    <Typography
                        component="h4"
                        variant="h4"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        Click the following companies to see which WICS members have worked there!
                    </Typography>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {revalidatedCompanies.map(company => (
                                <Grid key={company.id} xs={12} sm={6} md={4} spacing={2}>
                                    <CoopCard company={company} members={revalidatedMembers} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const companies: Company[] = await getAllCompanies();
    const members: Member[] = await getAllMembers();

    return {
        props: {
            companies,
            members
        },
        revalidate: 60
    };
};

export default Coop;
