import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import AddMemberDialog from "../../../components/AddMemberDialog";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import MemberList from "../../../components/MemberList";
import { Member } from "../../../interfaces";
import { createMember, deleteMember, getAllMembers, updateMember } from "../../../lib/db";

interface Props {
    members: Member[];
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

    const [visibleMembers, setVisibleMembers] = useState([...members]);
    const [editMember, setEditMember] = useState<Member | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const addMember = async (
        member: Member,
        image?: File,
        progressCallback?: (progress: number) => any
    ) => {
        const { id, ...data } = member;
        const editing = !!id;

        if (editing) {
            const editedMember = await updateMember(id, data, image, progressCallback);
            setVisibleMembers([
                {
                    ...member,
                    ...editedMember
                },
                ...visibleMembers.filter(checkMember => checkMember.id !== member.id)
            ]);
        } else {
            const newMember = await createMember(member, image, progressCallback);
            if (newMember) {
                setVisibleMembers([newMember, ...visibleMembers]);
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
                    setVisibleMembers(
                        visibleMembers.filter(checkMember => checkMember.id !== member.id)
                    );
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
                        members={visibleMembers}
                        editMember={editVisibleMember}
                        deleteMember={deleteVisibleMember}
                    />
                    <AddMemberDialog
                        className={classes.addMember}
                        open={addDialogOpen}
                        initialValues={editMember}
                        addMember={addMember}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                    />
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const members: Member[] = await getAllMembers();
    return { props: { members }, revalidate: 60 };
};

export default Members;
