import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Link as MuiLink,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import BackToTop from "../../components/BackToTop";
import ContentsLayout from "../../components/layouts/ContentsLayout";
import { Event, EventType, eventTypeLabels, eventTypes } from "../../interfaces";
import { getAllEvents } from "../../lib/db";

interface SectionProps {
    className?: string;
    type: EventType;
    events: Event[];
}

interface CalendarProps {
    className?: string;
    largeSrc: string;
    smallSrc: string;
}

interface Props {
    events: Event[];
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8)
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

const useCalendarStyles = makeStyles((_theme: Theme) => ({
    calendar: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    calendarSmall: {
        display: "none",
        "@media (min-width:800px)": {
            display: "none"
        },
        "@media (max-width:800px)": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 30,
            marginBottom: 30
        }
    },
    calendarLarge: {
        display: "none",
        "@media (min-width:800px)": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 30,
            marginBottom: 30
        },
        "@media (max-width:800px)": {
            display: "none"
        }
    }
}));

const Calendar: React.FC<CalendarProps> = ({ className, largeSrc, smallSrc }: CalendarProps) => {
    const classes = useCalendarStyles();

    return (
        <div className={className} id="calendar">
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
                Calendar
            </Typography>
            <div className={classes.calendarLarge}>
                <iframe
                    src={largeSrc}
                    width="800"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
            </div>

            <div className={classes.calendarSmall}>
                <iframe
                    src={smallSrc}
                    width="80%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
            </div>
        </div>
    );
};

const Section: React.FC<SectionProps> = ({ className, type, events }: SectionProps) => {
    const classes = useStyles();

    return (
        <div className={className} id={type}>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
                {eventTypeLabels[type]}
            </Typography>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {events.map(item => (
                        <Grid item key={item.name} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <Link href="/events/[id]" as={`/events/${item.id}`} passHref>
                                    <CardActionArea component="a">
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={item.images[0]}
                                            title={item.name}
                                        />
                                    </CardActionArea>
                                </Link>
                                <CardContent className={classes.cardContent}>
                                    <Link href="/events/[id]" as={`/events/${item.id}`} passHref>
                                        <MuiLink
                                            component="a"
                                            gutterBottom
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            {item.name}
                                        </MuiLink>
                                    </Link>
                                    <Typography>{item.term}</Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        {new Date(item.date).toDateString()}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        <FontAwesomeIcon icon={faMapMarker} /> {item.location}
                                    </Typography>
                                    <Typography paragraph variant="body2">
                                        {item.description}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        color="textSecondary"
                                        variant="subtitle2"
                                    >
                                        {item.photoCredits.join(" ")}
                                    </Typography>
                                </CardContent>
                            </Card>
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
        eventBuckets[event.type].push(event);
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
                                            color="secondary"
                                            href={`#${type}`}
                                        >
                                            {eventTypeLabels[type]}
                                        </Button>
                                    </Grid>
                                ))}
                                <Grid item>
                                    <Button variant="contained" color="secondary" href="#calendar">
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
                    largeSrc="https://calendar.google.com/calendar/b/1/embed?showTitle=0&amp;showCalendars=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=uofmwics%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FWinnipeg"
                    smallSrc="https://calendar.google.com/calendar/b/1/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=uofmwics%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FWinnipeg"
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
