import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Link as MuiLink,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import { Event } from "../../interfaces";

interface Props {
    event: Event;
}

const useStyles = makeStyles((_theme: Theme) => ({
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

const EventCard: React.FC<Props> = ({ event }: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Link href="/events/[id]" as={`/events/${event.id}`} passHref>
                <CardActionArea component="a">
                    <CardMedia
                        className={classes.cardMedia}
                        image={event.images[0]}
                        title={event.name}
                    />
                </CardActionArea>
            </Link>
            <CardContent className={classes.cardContent}>
                <Link href="/events/[id]" as={`/events/${event.id}`} passHref>
                    <MuiLink component="a" gutterBottom color="textPrimary" variant="h4">
                        {event.name}
                    </MuiLink>
                </Link>
                <Typography>{event.term}</Typography>
                <Typography gutterBottom variant="subtitle1">
                    {new Date(event.date).toDateString()}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                    <FontAwesomeIcon icon={faMapMarker} /> {event.location}
                </Typography>
                <Typography paragraph variant="body2">
                    {event.description}
                </Typography>
                <Typography gutterBottom color="textSecondary" variant="subtitle2">
                    {event.photoCredits.join(" ")}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default EventCard;
