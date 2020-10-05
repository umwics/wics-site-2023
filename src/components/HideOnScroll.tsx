import { Slide, useScrollTrigger } from "@material-ui/core";
import React from "react";

interface Props {
    children: React.ReactElement;
    window?: () => Window;
}

const HideOnScroll: React.FC<Props> = ({ children, window }: Props) => {
    const trigger = useScrollTrigger({ target: window ? window() : undefined, threshold: 100 });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

export default HideOnScroll;
