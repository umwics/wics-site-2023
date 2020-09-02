import {
    Avatar,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Person, Visibility, VisibilityOff } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ContentsLayout from "../components/layouts/AdminLayout";
import LoginButtons from "../components/LoginButtons";
import { useAuth } from "../lib/auth";
import { loginSchema } from "../lib/validators";

export interface LoginFields {
    email: string;
    password: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    register: {
        marginTop: theme.spacing(2)
    }
}));

const initialValues: LoginFields = {
    email: "",
    password: ""
};

const Login: NextPage = () => {
    const router = useRouter();
    const classes = useStyles();
    const auth = useAuth();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = () => {
        router.push("/admin");
    };

    return (
        <ContentsLayout title="Login">
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Person />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Formik
                        validateOnChange={true}
                        validateOnBlur={false}
                        validationSchema={loginSchema}
                        initialValues={initialValues}
                        onSubmit={async (data: LoginFields, { setSubmitting }) => {
                            setSubmitting(true);
                            // handle submit

                            await auth?.signinWithEmailPassword(data);
                            handleLogin();

                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            autoComplete="email"
                                            name="email"
                                            id="email"
                                            label="Email Address"
                                            fullWidth
                                            autoFocus
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            autoComplete="current-password"
                                            name="password"
                                            id="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() =>
                                                                setShowPassword(!showPassword)
                                                            }
                                                            onMouseDown={(
                                                                event: React.MouseEvent<
                                                                    HTMLButtonElement
                                                                >
                                                            ) => event.preventDefault()}
                                                            edge="end"
                                                        >
                                                            {showPassword ? (
                                                                <Visibility />
                                                            ) : (
                                                                <VisibilityOff />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={isSubmitting}
                                    fullWidth
                                >
                                    Login
                                </Button>
                                <LoginButtons handleLogin={handleLogin} />
                            </Form>
                        )}
                    </Formik>
                    <Grid container spacing={2} className={classes.register} justify="flex-end">
                        <Grid item>
                            <Link href="/register" passHref>
                                <MuiLink component="a" color="inherit" variant="body2">
                                    Don&apos;t have an account? Register
                                </MuiLink>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </ContentsLayout>
    );
};

export default Login;
