import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import BackToTop from "../../components/BackToTop";
import MenmbersCarousel from "../../components/carousel/MembersCarousel";
import ContentsLayout from "../../components/layouts/ContentsLayout";
import { Member, MemberPosition, memberPositionLabels, memberPositions } from "../../interfaces";
import { getAllMembers } from "../../lib/db";

interface SectionProps {
    className?: string;
    type: MemberPosition;
    members: Member[];
}

interface Props {
    members: Member[];
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
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    }
}));

const useCarouselStyles = makeStyles((theme: Theme) => ({
    paperCarousel: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(12),
        textAlign: "center",
        overflow: "hidden"
    },
    titleCarousel: {
        top: "40%",
        marginBottom: 50,
        fontFamily: "Lato",
        position: "absolute",
        textAlign: "center",
        color: "white",
        justifyContent: "center",
        textTransform: "uppercase",
        fontWeight: 700,
        width: "96%",
        "& h1": {
            marginTop: 0,
            marginBottom: 6,
            fontWeight: 700,
            fontFamily: "Lato"
        }
    }
}));

const Section: React.FC<SectionProps> = ({ className, type, members }: SectionProps) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={className} id={type}>
            <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                {memberPositionLabels[type]}
            </Typography>
            <div className={classes.centered}>
                <div className={classes.outline}></div>
            </div>
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4}>
                    {members.map(item => (
                        <Grid item key={item.name} xs={12} sm={6} md={3}>
                            {item.image && (
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={item.image}
                                        title={item.displayName}
                                    />

                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.displayName}
                                        </Typography>
                                        <Typography>{item.title}</Typography>
                                    </CardContent>

                                    <CardActions disableSpacing>
                                        {item.email && (
                                            <IconButton aria-label="email">
                                                <Link href={"mailto:" + item.email}>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </Link>
                                            </IconButton>
                                        )}

                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded
                                            })}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>

                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            {item.links.map(itemlink => (
                                                <Link key={itemlink.title} href={itemlink.link}>
                                                    <Button size="small" color="primary">
                                                        {itemlink.title}
                                                    </Button>
                                                </Link>
                                            ))}
                                            <Typography paragraph variant="body2">
                                                {item.description}
                                            </Typography>

                                            <List component="nav" aria-label="contacts">
                                                {item.facts.map((itemfacts, idx) => (
                                                    <Typography
                                                        key={idx}
                                                        gutterBottom
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                        <ListItem button>
                                                            <ListItemText secondary={itemfacts} />
                                                        </ListItem>
                                                    </Typography>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            )}
                            {!item.image && (
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.displayName}
                                    </Typography>
                                    <Typography>{item.title}</Typography>
                                </CardContent>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

const Members: NextPage<Props> = ({ members }: Props) => {
    const classes = useStyles();

    const { data } = useSWR<{ members: Member[] }>(`/api/${process.env.apiVersion}/members`, {
        initialData: { members }
    });

    const revalidatedMembers = (data && data.members) || [];

    const memberBuckets: { [key: string]: Member[] } = memberPositions.reduce(
        (acc, type) => ({ ...acc, [type]: [] }),
        {}
    );
    revalidatedMembers.forEach(member => {
        member.positions.forEach(position => {
            memberBuckets[position]?.push(member);
        });
    });
    const classesCarousel = useCarouselStyles();

    return (
        <ContentsLayout title="Members">
            <MenmbersCarousel />
            <div className={classesCarousel.titleCarousel}>
                <Typography variant="h1">WICS Members</Typography>

                <p>Meet our members and join the movement today!</p>

                <div className={classes.heroButtons}>
                    <Grid container spacing={1} justify="center">
                        {memberPositions.map(type => (
                            <Grid key={type} item>
                                <Button variant="contained" color="primary" href={`#${type}`}>
                                    {memberPositionLabels[type]}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>

            <Container component="main">
                {Object.entries(memberBuckets).map(([sectionType, sectionMembers]) => (
                    <Section
                        key={sectionType}
                        className={classes.heroContent}
                        type={sectionType as MemberPosition}
                        members={sectionMembers}
                    />
                ))}
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const members: Member[] = await getAllMembers();

    return { props: { members }, revalidate: 60 };
};

export default Members;
