import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import useSWR from "swr";
import BackToTop from "../../components/BackToTop";
import Calendar from "../../components/events/Calendar";
import EventCard from "../../components/events/EventCard";
import ContentsLayout from "../../components/layouts/ContentsLayout";
import { Event, EventType, eventTypeLabels, eventTypes } from "../../interfaces";
import { getAllEvents } from "../../lib/db";

interface SectionProps {
    className?: string;
    type: EventType;
    events: Event[];
}

interface Props {
    events: Event[];
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
        "& h3": {
            color: "#202124",
            marginBottom: 25,
            fontWeight: 1000,
            textTransform: "uppercase",
            position: "relative",
            fontFamily: "Lato",
            letterSpacing: 1
        }
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    outline: {
        textAlign: "center",
        backgroundColor: "#00bfa5",
        borderRadius: 2,
        height: 4,
        width: 40,
        marginBottom: 25
    },
    centered: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const Section: React.FC<SectionProps> = ({ className, type, events }: SectionProps) => {
    const classes = useStyles();

    return (
        <div id={type} className={className}>
            <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                {eventTypeLabels[type]}
            </Typography>
            <div className={classes.centered}>
                <div className={classes.outline}></div>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {events.map(event => (
                        <Grid item key={event.id} xs={12} sm={6} md={4}>
                            <EventCard event={event} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

const Events: NextPage<Props> = ({ events }: Props) => {
    const classes = useStyles();

    const { data } = useSWR<{ events: Event[] }>(`/api/${process.env.apiVersion}/events`, {
        initialData: { events }
    });

    const revalidatedEvents = (data && data.events) || [];

    const eventBuckets: { [key: string]: Event[] } = eventTypes.reduce(
        (acc, type) => ({ ...acc, [type]: [] }),
        {}
    );
    revalidatedEvents.forEach(event => {
        eventBuckets[event.type]?.push(event);
    });

    return (
        <ContentsLayout title="Events">
            <Container component="main">
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h2"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Events
                        </Typography>
                        <Typography
                            component="h5"
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            We hold a number of events each semester, from social events to learning
                            sessions that you can join in on!
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                {eventTypes.map(type => (
                                    <Grid key={type} item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={`#${type}`}
                                        >
                                            {eventTypeLabels[type]}
                                        </Button>
                                    </Grid>
                                ))}
                                <Grid item>
                                    <Button variant="contained" color="primary" href="#calendar">
                                        Calendar
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>

                {Object.entries(eventBuckets).map(([sectionType, sectionEvents]) => (
                    <Section
                        key={sectionType}
                        className={classes.heroContent}
                        type={sectionType as EventType}
                        events={sectionEvents}
                    />
                ))}

                <Calendar
                    className={classes.heroContent}
                    largeSrc="https://calendar.google.com/calendar/embed?src=jgn1g4ku9fs1pv3pr08t405amo%40group.calendar.google.com&amp;ctz=America%2FWinnipeg"
                    smallSrc="https://calendar.google.com/calendar/embed?src=jgn1g4ku9fs1pv3pr08t405amo%40group.calendar.google.com&amp;ctz=America%2FWinnipeg"
                />
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const events: Event[] = await getAllEvents();
    return { props: { events }, revalidate: 60 };
};

export default Events;
