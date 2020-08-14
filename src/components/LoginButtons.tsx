import { Button, Grid, makeStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Github from "@material-ui/icons/GitHub";
import React from "react";
import { useAuth } from "../lib/auth";
import Google from "./icons/Google";

interface Props {
    handleLogin?: () => any;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(2)
    },
    google: {
        color: theme.palette.getContrastText(grey[50]),
        backgroundColor: grey[50],
        "&:hover": {
            backgroundColor: grey[200]
        }
    },
    github: {
        color: theme.palette.getContrastText(grey[900]),
        backgroundColor: grey[900],
        "&:hover": {
            backgroundColor: grey[800]
        }
    }
}));

const LoginButtons: React.FC<Props> = ({ handleLogin }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} sm={6}>
                <Button
                    onClick={async () => {
                        await auth?.signinWithGoogle();
                        handleLogin && handleLogin();
                    }}
                    variant="contained"
                    className={classes.google}
                    startIcon={<Google />}
                    fullWidth
                >
                    Sign in with Google
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    onClick={async () => {
                        await auth?.signinWithGitHub();
                        handleLogin && handleLogin();
                    }}
                    variant="contained"
                    className={classes.github}
                    startIcon={<Github />}
                    fullWidth
                >
                    Sign in with Github
                </Button>
            </Grid>
        </Grid>
    );
};

export default LoginButtons;
