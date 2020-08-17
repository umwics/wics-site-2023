import { Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";

type Props = TransitionProps & { children?: React.ReactElement<any, any> };

const TransitionSlide = React.forwardRef((props: Props, ref: React.Ref<unknown>) => {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default TransitionSlide;
