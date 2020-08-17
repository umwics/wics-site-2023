import { Member, User } from "../interfaces";
import { firestore } from "./firebase";
import { storeImage } from "./storage";

export interface GetAllQueryParams {
    limit?: number | null;
    orderBy?: string | null;
}

export const getUser = async (id: string): Promise<User | null> => {
    if (firestore) {
        const doc = await firestore.collection("users").doc(id).get();

        if (!doc.exists) return null;

        return <User>{ id: doc.id, ...doc.data() };
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

        if (!doc.exists) return null;

        return <Member>{ id: doc.id, ...doc.data() };
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

export const createMember = async (
    member: Member,
    image?: File,
    progressCallback?: (progress: number) => any
): Promise<Member | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = member;
        const doc = await firestore.collection("members").add({ ...data });

        if (image) {
            const newValues = await updateMember(doc.id, {}, image, progressCallback);
            data.image = newValues && newValues.image ? newValues.image : data.image;
        }

        const newMember = <Member>{ id: doc.id, ...data };

        return newMember;
    }

    return null;
};

export const deleteMember = async (id: string): Promise<void> => {
    return firestore?.collection("members").doc(id).delete();
};

export const updateMember = async (
    id: string,
    newValues: Partial<Member>,
    image?: File,
    progressCallback?: (progress: number) => any
): Promise<Partial<Member> | null> => {
    if (firestore) {
        if (image) {
            const imageUrl = await storeImage(image, "members", id, progressCallback);
            newValues = {
                ...newValues,
                ...(imageUrl && {
                    image: imageUrl
                })
            };
        }

        return await firestore
            .collection("members")
            .doc(id)
            .update(newValues)
            .then(() => newValues)
            .catch(() => null);
    }

    return null;
};
