import { Company, Member, User } from "../interfaces";
import { firestore } from "./firebaseAdmin";

export const deleteDocument = async (collection: string, id: string): Promise<boolean> => {
    if (firestore) {
        return firestore
            .collection(collection)
            .doc(id)
            .delete()
            .then(() => true)
            .catch(() => false);
    }

    return false;
};

export const createUser = async (user: User): Promise<User | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, token, ...data } = user;

        await firestore
            .collection("users")
            .doc(id)
            .set({ ...data }, { merge: true });

        const newUser = <User>{ id, ...data };

        return newUser;
    }

    return null;
};

export const updateUser = async (
    uid: string,
    partialUser: Partial<User>
): Promise<Partial<User> | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, token, ...newValues } = partialUser;
        return firestore
            .collection("users")
            .doc(uid)
            .update(newValues)
            .then(() => newValues)
            .catch(() => null);
    }

    return null;
};

export const createMember = async (member: Member): Promise<Member | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = member;
        const doc = await firestore.collection("members").add({ ...data });

        const newMember = <Member>{ id: doc.id, ...data };

        return newMember;
    }

    return null;
};

export const deleteMember = async (id: string): Promise<boolean> => {
    return await deleteDocument("members", id);
};

export const updateMember = async (
    uid: string,
    partialMember: Partial<Member>
): Promise<Partial<Member> | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...newValues } = partialMember;

        return await firestore
            .collection("members")
            .doc(uid)
            .update(newValues)
            .then(() => newValues)
            .catch(() => null);
    }

    return null;
};

export const createCompany = async (company: Company): Promise<Company | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = company;
        const doc = await firestore.collection("companies").add({ ...data });

        const newCompany = <Company>{ id: doc.id, ...data };

        return newCompany;
    }

    return null;
};

export const deleteCompany = async (id: string): Promise<boolean> => {
    return await deleteDocument("companies", id);
};

export const updateCompany = async (
    uid: string,
    partialCompany: Partial<Company>
): Promise<Partial<Company> | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...newValues } = partialCompany;

        return await firestore
            .collection("companies")
            .doc(uid)
            .update(newValues)
            .then(() => newValues)
            .catch(() => null);
    }

    return null;
};
