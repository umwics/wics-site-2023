import { Avatar, Button, Container, Grid, Link as MuiLink, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PersonAdd } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import PasswordInput from "../components/inputs/PasswordInput";
import TextInput from "../components/inputs/TextInput";
import ContentsLayout from "../components/layouts/AdminLayout";
import LoginButtons from "../components/LoginButtons";
import { useAuth } from "../lib/auth";
import { registerSchema } from "../lib/validators";

export interface RegisterFields {
    username: string;
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
    login: {
        marginTop: theme.spacing(2)
    }
}));

const initialValues: RegisterFields = {
    username: "",
    email: "",
    password: ""
};

const Register: NextPage = () => {
    const router = useRouter();
    const classes = useStyles();
    const auth = useAuth();

    const handleRegister = () => {
        router.push("/admin");
    };

    return (
        <ContentsLayout title="Register">
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAdd />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Formik
                        validateOnChange={true}
                        validateOnBlur={false}
                        validationSchema={registerSchema}
                        initialValues={initialValues}
                        onSubmit={async (data: RegisterFields, { setSubmitting }) => {
                            setSubmitting(true);
                            // handle submit

                            await auth.createEmailPasswordUser(data);
                            handleRegister();

                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextInput
                                            autoComplete="username"
                                            name="username"
                                            id="username"
                                            label="Username"
                                            fullWidth
                                            autoFocus
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextInput
                                            autoComplete="email"
                                            name="email"
                                            id="email"
                                            label="Email Address"
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PasswordInput
                                            name="password"
                                            id="password"
                                            label="Password"
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
                                    Register
                                </Button>
                                <LoginButtons handleLogin={handleRegister} />
                            </Form>
                        )}
                    </Formik>
                    <Grid container spacing={2} className={classes.login} justify="flex-end">
                        <Grid item>
                            <Link href="/login" passHref>
                                <MuiLink component="a" color="inherit" variant="body2">
                                    Already have an account? Login
                                </MuiLink>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </ContentsLayout>
    );
};

export default Register;
