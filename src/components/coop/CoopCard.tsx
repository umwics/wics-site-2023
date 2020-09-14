import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme, WithStyles } from "@material-ui/core/styles";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import React from "react";
import Amazon from "./companies/Amazon";
import Blackberry from "./companies/Blackberry";
import Bold from "./companies/Bold";
import D2l from "./companies/D2l";
import Google from "./companies/Google";
import Intouch from "./companies/Intouch";
import Invenia from "./companies/Invenia";
import Iqmetrix from "./companies/Iqmetrix";
import Johnston from "./companies/Johnston";
import ManitobaGoverment from "./companies/ManitobaGoverment";
import ManitobaHydro from "./companies/ManitobaHydro";
import ManitobaHydroInternational from "./companies/ManitobaHydroInternational";
import Masterofcode from "./companies/Masterofcode";
import Payworks from "./companies/Payworks";
import Priceline from "./companies/Priceline";
import Publichealth from "./companies/Publichealth";
import Rbc from "./companies/Rbc";
import Shopify from "./companies/Shopify";
import Ubisoft from "./companies/Ubisoft";
import Varian from "./companies/Varian";
import Wawanesa from "./companies/Wawanesa";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            height: 140,
            width: 100
        },
        control: {
            padding: theme.spacing(2)
        }
    })
);
export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function CoopCard() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={4}>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Intouch />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Amazon />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Blackberry />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Bold />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <D2l />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Google />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Invenia />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Iqmetrix />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Johnston />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <ManitobaGoverment />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <ManitobaHydro />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <ManitobaHydroInternational />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Masterofcode />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Payworks />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Priceline />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Publichealth />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Rbc />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Shopify />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Ubisoft />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Varian />
            </Grid>
            <Grid xs={12} sm={6} md={4} spacing={2}>
                <Wawanesa />
            </Grid>
        </Grid>
    );
}
