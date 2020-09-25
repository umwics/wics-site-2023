import { Button, Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useSnackbar } from "notistack";
import { useState } from "react";
import AddEventDialog from "../../../components/admin/AddEventDialog";
import EventList from "../../../components/admin/EventList";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { Event, hasPermission, User } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import { getAllEvents, useEvents } from "../../../lib/db";
import { storeImages } from "../../../lib/storage";

interface Props {
    events: Event[];
    auth: AuthContextInstance;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    addEvent: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(4)
    }
}));

const Events: NextPage<Props> = ({ events, auth }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const confirm = useConfirm();

    const [editEvent, setEditEvent] = useState<Event | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { data: revalidatedEvents } = useEvents({ initialData: events });

    const addEvent = async (
        event: Event,
        images: { file: File | null; url: string }[],
        progressCallback?: (progress: number) => any
    ) => {
        const { id, ...data } = event;
        const editing = !!id;

        const uploadImages = images.map(image => image.file).filter((file): file is File => !!file);
        const oldImagesUrls = images.filter(image => !image.file).map(image => image.url);
        const newImageUrls = await storeImages(uploadImages, "events", progressCallback);
        const imageUrls = [...oldImagesUrls, ...newImageUrls];

        if (editing) {
            const response = await fetch(`/api/${process.env.apiVersion}/events/${id}`, {
                method: "PATCH",
                headers: {
                    token: (await auth?.getUserToken()) as string
                },
                body: JSON.stringify({ ...data, images: imageUrls })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Updated Event", { variant: "success" });
            } else enqueueSnackbar("Failed to Update Event", { variant: "error" });
        } else {
            const response = await fetch(`/api/${process.env.apiVersion}/events`, {
                method: "POST",
                headers: {
                    token: (await auth?.getUserToken()) as string
                },
                body: JSON.stringify({ ...data, images: imageUrls })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Created Event", { variant: "success" });
            } else enqueueSnackbar("Failed to Create Event", { variant: "error" });
        }
    };

    const editVisibleEvent = async (event: Event) => {
        setEditEvent({ ...event });
        handleClickOpen();
    };

    const deleteVisibleEvent = async (event: Event) => {
        confirm &&
            confirm({
                description: "This event will permanently be deleted.",
                confirmText: "Delete"
            })
                .then(async () => {
                    const response = await fetch(
                        `/api/${process.env.apiVersion}/events/${event.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                token: (await auth?.getUserToken()) as string
                            }
                        }
                    );

                    if (response.ok) {
                        enqueueSnackbar("Successfully Deleted Event", { variant: "success" });
                    } else enqueueSnackbar("Failed to Delete Event", { variant: "error" });
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
        setEditEvent(undefined);
    };

    return (
        <AdminLayout title="Events">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Events List
                    </Typography>
                    <EventList
                        events={revalidatedEvents}
                        editEvent={editVisibleEvent}
                        deleteEvent={deleteVisibleEvent}
                    />
                    <AddEventDialog
                        open={addDialogOpen}
                        initialValues={editEvent}
                        addEvent={addEvent}
                        handleClose={handleClose}
                    />
                    {auth?.user && hasPermission(auth?.user, "write") && (
                        <div className={classes.addEvent}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                Add Event
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const events: Event[] = await getAllEvents();
    return { props: { events }, revalidate: 60 };
};

export default withAuth(Events, {
    allowedAccess: (user: User | null) => !!user && hasPermission(user, "read")
});
