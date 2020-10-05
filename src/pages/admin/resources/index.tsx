import { Button, Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useSnackbar } from "notistack";
import { useState } from "react";
import AddResourceDialog from "../../../components/admin/AddResourceDialog";
import ResourceList from "../../../components/admin/ResourceList";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { hasPermission, Resource, User } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import { getAllResources, useResources } from "../../../lib/db";
import { storeImage } from "../../../lib/storage";

interface Props {
    resources: Resource[];
    auth: AuthContextInstance;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    addResource: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(4)
    }
}));

const Resources: NextPage<Props> = ({ resources, auth }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const confirm = useConfirm();

    const [editResource, setEditResource] = useState<Resource | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { data: revalidatedResources } = useResources({ initialData: resources });

    const addResource = async (
        resource: Resource,
        progressCallback?: (progress: number) => any
    ) => {
        const { id, ...data } = resource;
        const editing = !!id;

        const imageUrl =
            typeof resource.image !== "string"
                ? await storeImage((resource.image as any)?.file, "resources", progressCallback)
                : resource.image;

        if (editing) {
            const response = await fetch(`/api/${process.env.apiVersion}/resources/${id}`, {
                method: "PATCH",
                headers: {
                    token: (await auth.getUserToken()) as string
                },
                body: JSON.stringify({ ...data, image: imageUrl })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Updated Resource", { variant: "success" });
            } else enqueueSnackbar("Failed to Update Resource", { variant: "error" });
        } else {
            const response = await fetch(`/api/${process.env.apiVersion}/resources`, {
                method: "POST",
                headers: {
                    token: (await auth.getUserToken()) as string
                },
                body: JSON.stringify({ ...data, image: imageUrl })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Created Resource", { variant: "success" });
            } else enqueueSnackbar("Failed to Create Resource", { variant: "error" });
        }
    };

    const editVisibleResource = async (resource: Resource) => {
        setEditResource({ ...resource });
        handleClickOpen();
    };

    const deleteVisibleResource = async (resource: Resource) => {
        confirm({
            description: "This resource will permanently be deleted.",
            confirmText: "Delete"
        })
            .then(async () => {
                const response = await fetch(
                    `/api/${process.env.apiVersion}/resources/${resource.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            token: (await auth.getUserToken()) as string
                        }
                    }
                );

                if (response.ok) {
                    enqueueSnackbar("Successfully Deleted Resource", { variant: "success" });
                } else enqueueSnackbar("Failed to Delete Resource", { variant: "error" });
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
        setEditResource(undefined);
    };

    return (
        <AdminLayout title="Resources">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Resources List
                    </Typography>
                    <ResourceList
                        resources={revalidatedResources}
                        editResource={editVisibleResource}
                        deleteResource={deleteVisibleResource}
                    />
                    <AddResourceDialog
                        open={addDialogOpen}
                        initialValues={editResource}
                        addResource={addResource}
                        handleClose={handleClose}
                    />
                    {auth.user && hasPermission(auth.user, "write") && (
                        <div className={classes.addResource}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                Add Resource
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const resources: Resource[] = await getAllResources();
    return { props: { resources }, revalidate: 60 };
};

export default withAuth(Resources, {
    allowedAccess: (user: User | null) => !!user && hasPermission(user, "read")
});
