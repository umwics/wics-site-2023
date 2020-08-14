import { Avatar, Button, Container, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import AdminLayout from "../components/layouts/AdminLayout";
import LoginButtons from "../components/LoginButtons";
import { useAuth } from "../lib/auth";

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

const validationSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required()
});

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
        <AdminLayout title="Register">
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Formik
                        validateOnChange={true}
                        validateOnBlur={false}
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={async (data: RegisterFields, { setSubmitting }) => {
                            setSubmitting(true);
                            // handle submit

                            await auth?.createEmailPasswordUser(data);
                            handleRegister();

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
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            autoComplete="email"
                                            name="email"
                                            id="email"
                                            label="Email Address"
                                            fullWidth
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
                                            type="password"
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
                            <Link
                                component="button"
                                color="inherit"
                                variant="body2"
                                onClick={() => router.push("/login")}
                            >
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </AdminLayout>
    );
};

export default Register;
