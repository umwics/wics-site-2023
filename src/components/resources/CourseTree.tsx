import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useTreeStyles = makeStyles((_theme: Theme) => ({
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
    heroButtons: {
        marginTop: _theme.spacing(4)
    }
}));

const CourseTree: React.FC = () => {
    const classes = useTreeStyles();

    return (
        <div id="tree">
            <iframe
                width="1200"
                height="1500"
                src="https://juliek1217.github.io/2020/10/25/courses/"
                name="test"
                id="test"
                frameBorder="0"
                scrolling="yes"
                align="left"
            ></iframe>
        </div>
    );
};

export default CourseTree;
