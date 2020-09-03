import { Company, Member, User } from "../interfaces";
import firebase, { firestore } from "./firebase";

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

export const getUser = async (id: string): Promise<User | null> => {
    return await getDocument("users", id);
};

export const getAllUsers = async (queryProps: GetAllQueryParams = {}): Promise<User[]> => {
    return await getAllDocuments("users", queryProps);
};

export const getMember = async (id: string): Promise<Member | null> => {
    return await getDocument("members", id);
};

export const getAllMembers = async (queryProps: GetAllQueryParams = {}): Promise<Member[]> => {
    return await getAllDocuments("members", queryProps);
};

export const getCompany = async (id: string): Promise<Company | null> => {
    return await getDocument("companies", id);
};

export const getAllCompanies = async (queryProps: GetAllQueryParams = {}): Promise<Company[]> => {
    return await getAllDocuments<Company>("companies", queryProps);
};
