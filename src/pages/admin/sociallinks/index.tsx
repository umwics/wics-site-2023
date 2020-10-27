import { Button, Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useSnackbar } from "notistack";
import { useState } from "react";
import AddSocialLinkDialog from "../../../components/admin/forms/AddSocialLinkDialog";
import SocialLinkList from "../../../components/admin/views/SocialLinkList";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { hasPermission, TreeLink, User } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import { getAllSocialLinks, useSocialLinks } from "../../../lib/db";

interface Props {
    socialLinks: TreeLink[];
    auth: AuthContextInstance;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    addSocialLink: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(4)
    }
}));

const SocialLinks: NextPage<Props> = ({ socialLinks, auth }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const confirm = useConfirm();

    const [editSocialLink, setEditSocialLink] = useState<TreeLink | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { data: revalidatedSocialLinks } = useSocialLinks({ initialData: socialLinks });

    const addSocialLink = async (socialLink: TreeLink) => {
        const { id, ...data } = socialLink;
        const editing = !!id;

        if (editing) {
            const response = await fetch(`/api/${process.env.apiVersion}/sociallinks/${id}`, {
                method: "PATCH",
                headers: {
                    token: (await auth.getUserToken()) as string
                },
                body: JSON.stringify({ ...data })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Updated Link", { variant: "success" });
            } else enqueueSnackbar("Failed to Update Link", { variant: "error" });
        } else {
            const response = await fetch(`/api/${process.env.apiVersion}/sociallinks`, {
                method: "POST",
                headers: {
                    token: (await auth.getUserToken()) as string
                },
                body: JSON.stringify({ ...data })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Created Link", { variant: "success" });
            } else enqueueSnackbar("Failed to Create Link", { variant: "error" });
        }
    };

    const editVisibleSocialLink = async (socialLink: TreeLink) => {
        setEditSocialLink({ ...socialLink });
        handleClickOpen();
    };

    const deleteVisibleSocialLink = async (socialLink: TreeLink) => {
        confirm({
            description: "This link will permanently be deleted.",
            confirmText: "Delete"
        })
            .then(async () => {
                const response = await fetch(
                    `/api/${process.env.apiVersion}/sociallinks/${socialLink.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            token: (await auth.getUserToken()) as string
                        }
                    }
                );

                if (response.ok) {
                    enqueueSnackbar("Successfully Deleted Link", { variant: "success" });
                } else enqueueSnackbar("Failed to Delete Link", { variant: "error" });
            })
            .catch(() => {
                // pass
            });
    };

    const handleClickOpen = () => {
        setAddDialogOpen(true);
    };

    const handleClose = () => {
        setAddDialogOpen(false);
        setEditSocialLink(undefined);
    };

    return (
        <AdminLayout title="Social Links">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Social Links List
                    </Typography>
                    <SocialLinkList
                        socialLinks={revalidatedSocialLinks}
                        editSocialLink={editVisibleSocialLink}
                        deleteSocialLink={deleteVisibleSocialLink}
                    />
                    <AddSocialLinkDialog
                        open={addDialogOpen}
                        initialValues={editSocialLink}
                        addSocialLink={addSocialLink}
                        handleClose={handleClose}
                    />
                    {auth.user && hasPermission(auth.user, "write") && (
                        <div className={classes.addSocialLink}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                Add Link
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const socialLinks: TreeLink[] = await getAllSocialLinks();
    return { props: { socialLinks }, revalidate: 60 };
};

export default withAuth(SocialLinks, {
    allowedAccess: (user: User | null) => !!user && hasPermission(user, "read")
});
