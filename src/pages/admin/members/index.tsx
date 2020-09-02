import { Button, Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import AddMemberDialog from "../../../components/AddMemberDialog";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import MemberList from "../../../components/MemberList";
import { Member } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import { createMember, deleteMember, getAllMembers, updateMember } from "../../../lib/db";

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

const Members: NextPage<Props> = ({ members }: Props) => {
    const classes = useStyles();
    const confirm = useConfirm();

    const [editMember, setEditMember] = useState<Member | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { data, mutate } = useSWR<{ members: Member[] }>(
        `/api/${process.env.apiVersion}/members`,
        {
            initialData: { members }
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
            const editedMember = await updateMember(id, data, image, progressCallback);
            mutate({
                members: [
                    {
                        ...member,
                        ...editedMember
                    },
                    ...revalidatedMembers.filter(checkMember => checkMember.id !== member.id)
                ]
            });
        } else {
            const newMember = await createMember(member, image, progressCallback);
            if (newMember) {
                mutate({ members: [newMember, ...revalidatedMembers] });
            }
        }
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
                    await deleteMember(member.id);
                    mutate({
                        members: revalidatedMembers.filter(
                            checkMember => checkMember.id !== member.id
                        )
                    });
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
                    <Typography component="h1" variant="h5">
                        Members List
                    </Typography>
                    <MemberList
                        members={revalidatedMembers}
                        editMember={editVisibleMember}
                        deleteMember={deleteVisibleMember}
                    />
                    <AddMemberDialog
                        open={addDialogOpen}
                        initialValues={editMember}
                        addMember={addMember}
                        handleClose={handleClose}
                    />
                    <div className={classes.addMember}>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Add Member
                        </Button>
                    </div>
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
    allowedAccess: () => true
});
