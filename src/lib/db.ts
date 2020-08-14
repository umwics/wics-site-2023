import { User } from "../interfaces";
import { Member } from "../interfaces/Member";
import { firestore } from "./firebase";

export interface GetAllQueryParams {
    limit?: number | null;
    orderBy?: string | null;
}

export const getUser = async (id: string): Promise<User | null> => {
    if (firestore) {
        const doc = await firestore.collection("users").doc(id).get();
        const user = <User>{ id: doc.id, ...doc.data() };

        return user;
    }

    return null;
};

export const getAllUsers = async ({
    limit = null,
    orderBy = null
}: GetAllQueryParams = {}): Promise<User[]> => {
    if (firestore) {
        const query = firestore.collection("users");
        if (limit) query.limit(limit);
        if (orderBy) query.orderBy(orderBy);

        const snapshot = await query.get();
        return snapshot.docs.map(doc => <User>{ id: doc.id, ...doc.data() });
    }

    return [];
};

export const createUser = (user: User): Promise<void> | undefined => {
    const { id, username, ...data } = user;

    return firestore
        ?.collection("users")
        .doc(id)
        .set({ ...(username && { username }), ...data }, { merge: true });
};

export const updateUser = async (id: string, newValues: Partial<User>): Promise<void> => {
    return firestore?.collection("users").doc(id).update(newValues);
};

export const getMember = async (id: string): Promise<Member | null> => {
    if (firestore) {
        const doc = await firestore.collection("members").doc(id).get();
        const member = <Member>{ id: doc.id, ...doc.data() };

        return member;
    }

    return null;
};

export const getAllMembers = async ({
    limit = null,
    orderBy = null
}: GetAllQueryParams = {}): Promise<Member[]> => {
    if (firestore) {
        const query = firestore.collection("members");
        if (limit) query.limit(limit);
        if (orderBy) query.orderBy(orderBy);

        const snapshot = await query.get();
        return snapshot.docs.map(doc => <Member>{ id: doc.id, ...doc.data() });
    }

    return [];
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

export const deleteMember = async (id: string): Promise<void> => {
    return firestore?.collection("members").doc(id).delete();
};

export const updateMember = async (id: string, newValues: Partial<Member>): Promise<void> => {
    return firestore?.collection("members").doc(id).update(newValues);
};
