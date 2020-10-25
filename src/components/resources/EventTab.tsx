import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { Resource, resourceTypeLabels, resourceTypes } from "../../interfaces";
import CourseTree from "./CourseTree";

interface TabContentProps {
    resource: Resource;
}

interface TabPanelProps {
    resources: Resource[];
    value: string;
}

interface Props {
    resources: Resource[];
}

const useTabPanelStyles = makeStyles((theme: Theme) => ({
    section: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(8)
    }
}));

const useTabContentStyles = makeStyles((_theme: Theme) => ({
    rootcard: {
        maxWidth: 345
    },
    media: {
        height: 140
    }
}));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

const ResourceTabContent: React.FC<TabContentProps> = ({ resource }: TabContentProps) => {
    const classes = useTabContentStyles();

    if (!resource.image)
        return (
            <Grid container item xs={12} sm={4}>
                <Button size="small" color="primary" href={resource.link} target="_blank">
                    {resource.title}
                </Button>
            </Grid>
        );

    return (
        <Grid container item xs={12} sm={4}>
            <Card className={classes.rootcard}>
                <CardActionArea href={resource.link} target="_blank">
                    <CardMedia
                        className={classes.media}
                        image={resource.image}
                        title={resource.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {resource.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {resource.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" href={resource.link} target="_blank">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const ResourceTabPanel: React.FC<TabPanelProps> = ({ resources, value }: TabPanelProps) => {
    const classes = useTabPanelStyles();
    if (value == "1")
        return (
            <TabPanel value={value}>
                <div className={classes.section}>
                    <CourseTree />
                </div>
            </TabPanel>
        );

    return (
        <TabPanel value={value}>
            <div className={classes.section}>
                <Grid container spacing={1}>
                    {resources.map(resource => (
                        <ResourceTabContent key={resource.name} resource={resource} />
                    ))}
                </Grid>
            </div>
        </TabPanel>
    );
};

const LabTabs: React.FC<Props> = ({ resources }: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesLg = useMediaQuery(theme.breakpoints.up("md"));
    const [value, setValue] = React.useState("1");

    const resourceBuckets: { [key: string]: Resource[] } = resourceTypes.reduce(
        (acc, type) => ({ ...acc, [type]: [] }),
        {}
    );
    resources.forEach(resource =>
        resource.types.forEach(type => resourceBuckets[type].push(resource))
    );

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <TabContext value={value}>
                <AppBar position="static">
                    <TabList
                        onChange={(_, value) => handleChange(value)}
                        variant={matchesLg ? "fullWidth" : "scrollable"}
                        aria-label="simple tabs example"
                    >
                        {resourceTypes.map((type, idx) => (
                            <Tab
                                key={idx}
                                label={resourceTypeLabels[type]}
                                value={(idx + 1).toString()}
                            />
                        ))}
                    </TabList>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={parseInt(value) - 1}
                    onChangeIndex={idx => handleChange((idx + 1).toString())}
                    ignoreNativeScroll
                >
                    {Object.entries(resourceBuckets).map(([_resourceType, tabResources], idx) => (
                        <ResourceTabPanel
                            key={idx}
                            resources={tabResources}
                            value={(idx + 1).toString()}
                        />
                    ))}
                </SwipeableViews>
            </TabContext>
        </div>
    );
};
export default LabTabs;
