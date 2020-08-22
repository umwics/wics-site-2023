import { Company, Member, User } from "../interfaces";
import firebase, { firestore } from "./firebase";
import { storeImage } from "./storage";

export interface GetAllQueryParams {
    limit?: number | null;
    orderBy?: string | null;
    where?: { fieldPath?: string; opStr: firebase.firestore.WhereFilterOp; value: any } | null;
}

export const getDocument = async <T>(collection: string, id: string): Promise<T | null> => {
    if (firestore) {
        const doc = await firestore.collection(collection).doc(id).get();

        if (!doc.exists) return null;

        return <T>(<unknown>{ id: doc.id, ...doc.data() });
    }

    return null;
};

export const getAllDocuments = async <T>(
    collection: string,
    { limit = null, orderBy = null, where = null }: GetAllQueryParams = {}
): Promise<T[]> => {
    if (firestore) {
        const query = firestore.collection(collection);
        if (where)
            query.where(
                where.fieldPath || firebase.firestore.FieldPath.documentId(),
                where.opStr,
                where.value
            );
        if (limit) query.limit(limit);
        if (orderBy) query.orderBy(orderBy);

        const snapshot = await query.get();
        return snapshot.docs.map(doc => <T>(<unknown>{ id: doc.id, ...doc.data() }));
    }

    return [];
};

export const deleteDocument = async (collection: string, id: string): Promise<void> => {
    return firestore?.collection(collection).doc(id).delete();
};

export const getUser = async (id: string): Promise<User | null> => {
    return await getDocument("users", id);
};

export const getAllUsers = async (queryProps: GetAllQueryParams = {}): Promise<User[]> => {
    return await getAllDocuments("users", queryProps);
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
    return await getDocument("members", id);
};

export const getAllMembers = async (queryProps: GetAllQueryParams = {}): Promise<Member[]> => {
    return await getAllDocuments("members", queryProps);
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
    return await deleteDocument("members", id);
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

export const getCompany = async (id: string): Promise<Company | null> => {
    return await getDocument("companies", id);
};

export const getAllCompanies = async (queryProps: GetAllQueryParams = {}): Promise<Company[]> => {
    return await getAllDocuments<Company>("companies", queryProps);
};

export const createCompany = async (
    company: Company,
    image?: File,
    progressCallback?: (progress: number) => any
): Promise<Company | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = company;
        const doc = await firestore.collection("companies").add({ ...data });

        if (image) {
            const newValues = await updateCompany(doc.id, {}, image, progressCallback);
            data.image = newValues && newValues.image ? newValues.image : data.image;
        }

        const newCompany = <Company>{ id: doc.id, ...data };

        return newCompany;
    }

    return null;
};

export const deleteCompany = async (id: string): Promise<void> => {
    return await deleteDocument("companies", id);
};

export const updateCompany = async (
    id: string,
    newValues: Partial<Company>,
    image?: File,
    progressCallback?: (progress: number) => any
): Promise<Partial<Company> | null> => {
    if (firestore) {
        if (image) {
            const imageUrl = await storeImage(image, "companies", id, progressCallback);
            newValues = {
                ...newValues,
                ...(imageUrl && {
                    image: imageUrl
                })
            };
        }

        return await firestore
            .collection("companies")
            .doc(id)
            .update(newValues)
            .then(() => newValues)
            .catch(() => null);
    }

    return null;
};
