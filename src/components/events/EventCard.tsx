// import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Card,
    CardActionArea,
    CardMedia,
    // Link as MuiLink,
    GridListTileBar

} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import { Event } from "../../interfaces";


interface Props {
    event: Event;
}

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden'
        },
        card: {
            height: "100%",
            display: "flex",
            flexDirection: "column"
        },
        cardMedia: {
            paddingTop: "80%"
        },
        cardContent: {
            flexGrow: 1
        },
        title: {
            fontSize: "20px",
            fontWeight: 550
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0% rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 50%)'
        },
    }),
);


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
                    <GridListTileBar 
                        title={event.name} 
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        ></GridListTileBar>
                </CardActionArea>
            </Link>
            
        </Card>
    );
};

export default EventCard;