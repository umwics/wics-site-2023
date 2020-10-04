import { Slide, useScrollTrigger } from "@material-ui/core";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function HideOnScroll({ children }: any) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
export default HideOnScroll;
