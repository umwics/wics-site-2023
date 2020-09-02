import { Button, Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import AddCompanyDialog from "../../../components/AddCompanyDialog";
import CompanyList from "../../../components/CompanyList";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { Company, Member } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import {
    createCompany,
    deleteCompany,
    getAllCompanies,
    getAllMembers,
    updateCompany
} from "../../../lib/db";

interface Props {
    companies: Company[];
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
    addCompany: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(4)
    }
}));

const Companies: NextPage<Props> = ({ companies, members }: Props) => {
    const classes = useStyles();
    const confirm = useConfirm();

    const [editCompany, setEditCompany] = useState<Company | undefined>(undefined);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { data, mutate } = useSWR<{ companies: Company[] }>(
        `/api/${process.env.apiVersion}/companies`,
        {
            initialData: { companies }
        }
    );

    const revalidatedCompanies = (data && data.companies) || [];

    const addCompany = async (
        company: Company,
        image?: File,
        progressCallback?: (progress: number) => any
    ) => {
        const { id, ...data } = company;
        const editing = !!id;

        if (editing) {
            const editedCompany = await updateCompany(id, data, image, progressCallback);
            const newCompany = {
                ...company,
                ...editedCompany
            };
            mutate({
                companies: [
                    newCompany,
                    ...revalidatedCompanies.filter(checkCompany => checkCompany.id !== company.id)
                ]
            });
        } else {
            const newCompany = await createCompany(company, image, progressCallback);
            if (newCompany) {
                mutate({ companies: [newCompany, ...revalidatedCompanies] });
            }
        }
    };

    const editVisibleCompany = async (company: Company) => {
        setEditCompany({ ...company });
        handleClickOpen();
    };

    const deleteVisibleCompany = async (company: Company) => {
        confirm &&
            confirm({
                description: "This company will permanently be deleted.",
                confirmText: "Delete"
            })
                .then(async () => {
                    await deleteCompany(company.id);
                    mutate({
                        companies: revalidatedCompanies.filter(
                            checkCompany => checkCompany.id !== company.id
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
        setEditCompany(undefined);
    };

    return (
        <AdminLayout title="Companies">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Companies List
                    </Typography>
                    <CompanyList
                        companies={revalidatedCompanies}
                        members={members}
                        editCompany={editVisibleCompany}
                        deleteCompany={deleteVisibleCompany}
                    />
                    <AddCompanyDialog
                        open={addDialogOpen}
                        members={members}
                        initialValues={editCompany}
                        addCompany={addCompany}
                        handleClose={handleClose}
                    />
                    <div className={classes.addCompany}>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Add Company
                        </Button>
                    </div>
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const companies: Company[] = await getAllCompanies();
    const members: Member[] = await getAllMembers();

    return {
        props: {
            companies,
            members
        },
        revalidate: 60
    };
};

export default withAuth(Companies, {
    allowedAccess: () => true
});
