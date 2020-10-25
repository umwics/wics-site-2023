import { Button, Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import AddMemberDialog from "../../../components/admin/forms/AddMemberDialog";
import MemberList from "../../../components/admin/views/MemberList";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { hasPermission, Member, User } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import { getAllMembers, useMembers } from "../../../lib/db";
import { storeImage } from "../../../lib/storage";

interface Props {
    members: Member[];
    auth: AuthContextInstance;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    addMember: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(4)
    }
}));

const Members: NextPage<Props> = ({ members, auth }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const confirm = useConfirm();

    const [editMember, setEditMember] = useState<Member | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { data: revalidatedMembers, mutate } = useMembers({ initialData: members });

    const addMember = async (member: Member, progressCallback?: (progress: number) => any) => {
        const { id, ...data } = member;
        const editing = !!id;

        const imageUrl =
            typeof member.image !== "string"
                ? await storeImage((member.image as any)?.file, "members", progressCallback)
                : member.image;

        if (editing) {
            const response = await fetch(`/api/${process.env.apiVersion}/members/${id}`, {
                method: "PATCH",
                headers: {
                    token: (await auth.getUserToken()) as string
                },
                body: JSON.stringify({ ...data, image: imageUrl })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Updated Member", { variant: "success" });
            } else enqueueSnackbar("Failed to Update Member", { variant: "error" });
        } else {
            const response = await fetch(`/api/${process.env.apiVersion}/members`, {
                method: "POST",
                headers: {
                    token: (await auth.getUserToken()) as string
                },
                body: JSON.stringify({ ...data, image: imageUrl })
            });
            if (response.ok) {
                enqueueSnackbar("Successfully Created Member", { variant: "success" });
            } else enqueueSnackbar("Failed to Create Member", { variant: "error" });
        }
    };

    const onDragEnd = async (result: DropResult, _provided: ResponderProvided) => {
        const { source, destination } = result;

        // dropped outside the list or dropped in different lists
        if (
            !destination ||
            source.droppableId !== destination.droppableId ||
            source.index === destination.index
        )
            return;

        const reordered = [...revalidatedMembers];
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);
        const ranked = reordered.map((member, idx) => ({ id: member.id, rank: idx }));

        mutate(reordered);
        const response = await fetch(`/api/${process.env.apiVersion}/members`, {
            method: "PATCH",
            headers: {
                token: (await auth.getUserToken()) as string
            },
            body: JSON.stringify({
                members: ranked
            })
        });

        if (response.ok) {
            // Do not display update message since reordering is fairly common
            // enqueueSnackbar("Successfully Updated Member", { variant: "success" });
        } else enqueueSnackbar("Failed to Update Member", { variant: "error" });
    };

    const editVisibleMember = async (member: Member) => {
        setEditMember({ ...member });
        handleClickOpen();
    };

    const deleteVisibleMember = async (member: Member) => {
        confirm({
            description: "This member will permanently be deleted.",
            confirmText: "Delete"
        })
            .then(async () => {
                const response = await fetch(
                    `/api/${process.env.apiVersion}/members/${member.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            token: (await auth.getUserToken()) as string
                        }
                    }
                );

                if (response.ok) {
                    enqueueSnackbar("Successfully Deleted Member", { variant: "success" });
                } else enqueueSnackbar("Failed to Delete Member", { variant: "error" });
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
        setEditMember(undefined);
    };

    return (
        <AdminLayout title="Members">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Members List
                    </Typography>
                    <MemberList
                        members={revalidatedMembers}
                        editMember={editVisibleMember}
                        onDragEnd={onDragEnd}
                        deleteMember={deleteVisibleMember}
                    />
                    <AddMemberDialog
                        open={addDialogOpen}
                        initialValues={editMember}
                        addMember={addMember}
                        handleClose={handleClose}
                    />
                    {auth.user && hasPermission(auth.user, "write") && (
                        <div className={classes.addMember}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                Add Member
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const members: Member[] = await getAllMembers();
    return { props: { members }, revalidate: 60 };
};

export default withAuth(Members, {
    allowedAccess: (user: User | null) => !!user && hasPermission(user, "read")
});
