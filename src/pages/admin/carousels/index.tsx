import { Button, Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useSnackbar } from "notistack";
import { useState } from "react";
import AddCarouselDialog from "../../../components/admin/forms/AddCarouselDialog";
import CarouselList from "../../../components/admin/views/CarouselList";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { Carousel, hasPermission, User } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import { getAllCarousels, useCarousels } from "../../../lib/db";
import { storeImages } from "../../../lib/storage";

interface Props {
    carousels: Carousel[];
    auth: AuthContextInstance;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    addCarousel: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(4)
    }
}));

const Carousels: NextPage<Props> = ({ carousels, auth }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const confirm = useConfirm();

    const [editCarousel, setEditCarousel] = useState<Carousel | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { data: revalidatedCarousels } = useCarousels({ initialData: carousels });

    const addCarousel = async (
        carousel: Carousel,
        progressCallback?: (progress: number) => any
    ) => {
        const { id, ...data } = carousel;
        const editing = !!id;

        const uploadImages = carousel.slides
            .map(slide => (slide.image as any)?.file)
            .filter((file): file is File => !!file);
        const newImageUrls = await storeImages(uploadImages, "carousels", progressCallback);

        let uploadedIdx = 0;
        for (let i = 0; i < carousel.slides.length; i++) {
            if (typeof data.slides[i].image !== "string") {
                data.slides[i].image = newImageUrls[uploadedIdx] || "";
                uploadedIdx++;
            }
        }

        if (editing) {
            const response = await fetch(`/api/${process.env.apiVersion}/carousels/${id}`, {
                method: "PATCH",
                headers: {
                    token: (await auth.getUserToken()) as string
                },
                body: JSON.stringify({ ...data })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Updated Carousel", { variant: "success" });
            } else enqueueSnackbar("Failed to Update Carousel", { variant: "error" });
        } else {
            const response = await fetch(`/api/${process.env.apiVersion}/carousels`, {
                method: "POST",
                headers: {
                    token: (await auth.getUserToken()) as string
                },
                body: JSON.stringify({ ...data })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Created Carousel", { variant: "success" });
            } else enqueueSnackbar("Failed to Create Carousel", { variant: "error" });
        }
    };

    const editVisibleCarousel = async (carousel: Carousel) => {
        setEditCarousel({ ...carousel });
        handleClickOpen();
    };

    const deleteVisibleCarousel = async (carousel: Carousel) => {
        confirm({
            description: "This carousel will permanently be deleted.",
            confirmText: "Delete"
        })
            .then(async () => {
                const response = await fetch(
                    `/api/${process.env.apiVersion}/carousels/${carousel.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            token: (await auth.getUserToken()) as string
                        }
                    }
                );

                if (response.ok) {
                    enqueueSnackbar("Successfully Deleted Carousel", { variant: "success" });
                } else enqueueSnackbar("Failed to Delete Carousel", { variant: "error" });
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
        setEditCarousel(undefined);
    };

    return (
        <AdminLayout title="Carousels">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Carousels List
                    </Typography>
                    <CarouselList
                        carousels={revalidatedCarousels}
                        editCarousel={editVisibleCarousel}
                        deleteCarousel={deleteVisibleCarousel}
                    />
                    <AddCarouselDialog
                        open={addDialogOpen}
                        initialValues={editCarousel}
                        addCarousel={addCarousel}
                        handleClose={handleClose}
                    />
                    {auth.user && hasPermission(auth.user, "write") && (
                        <div className={classes.addCarousel}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                Add Carousel
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const carousels: Carousel[] = await getAllCarousels();

    return { props: { carousels }, revalidate: 60 };
};

export default withAuth(Carousels, {
    allowedAccess: (user: User | null) => !!user && hasPermission(user, "read")
});
