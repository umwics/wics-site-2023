import { Button, Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import useSWR from "swr";
import AddMemberDialog from "../../../components/admin/AddMemberDialog";
import MemberList from "../../../components/admin/MemberList";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { hasPermission, Member, User } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import { getAllMembers } from "../../../lib/db";
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
    const { data, mutate } = useSWR<{ members: Member[] }>(
        `/api/${process.env.apiVersion}/members`,
        {
            initialData: { members },
            revalidateOnMount: true
        }
    );

    const revalidatedMembers = (data && data.members) || [];

    const addMember = async (
        member: Member,
        image?: File,
        progressCallback?: (progress: number) => any
    ) => {
        const { id, ...data } = member;
        const editing = !!id;

        if (editing) {
            const imageUrl = image
                ? await storeImage(image, "members", progressCallback)
                : member.image;
            const response = await fetch(`/api/${process.env.apiVersion}/members/${id}`, {
                method: "PATCH",
                headers: {
                    token: (await auth?.getUserToken()) as string
                },
                body: JSON.stringify({ ...data, image: imageUrl })
            });
            if (response.ok) {
                const editedMember = await response.json();
                const newMember = {
                    ...member,
                    ...editedMember
                };
                mutate({
                    members: [
                        newMember,
                        ...revalidatedMembers.filter(checkMember => checkMember.id !== member.id)
                    ]
                });
                enqueueSnackbar("Successfully Updated Member", { variant: "success" });
            } else enqueueSnackbar("Failed to Update Member", { variant: "error" });
        } else {
            const imageUrl = image
                ? await storeImage(image, "members", progressCallback)
                : member.image;
            const response = await fetch(`/api/${process.env.apiVersion}/members`, {
                method: "POST",
                headers: {
                    token: (await auth?.getUserToken()) as string
                },
                body: JSON.stringify({ ...data, image: imageUrl })
            });
            if (response.ok) {
                const newMember = await response.json();
                if (newMember) mutate({ members: [newMember, ...revalidatedMembers] });
                enqueueSnackbar("Successfully Created Member", { variant: "success" });
            } else enqueueSnackbar("Failed to Create Member", { variant: "error" });
        }
    };

    const onDragEnd = (_result: DropResult, _provided: ResponderProvided) => {
        //
    };

    const editVisibleMember = async (member: Member) => {
        setEditMember({ ...member });
        handleClickOpen();
    };

    const deleteVisibleMember = async (member: Member) => {
        confirm &&
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
                                token: (await auth?.getUserToken()) as string
                            }
                        }
                    );

                    if (response.ok) {
                        mutate({
                            members: revalidatedMembers.filter(
                                checkMember => checkMember.id !== member.id
                            )
                        });
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
                    {auth?.user && hasPermission(auth?.user, "write") && (
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
