import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { Company, Event, Member, User } from "../interfaces";
import firebase, { firestore } from "./firebase";

export interface GetAllQueryParams {
    limit?: number | null;
    orderBy?: string | null;
    where?: { fieldPath?: string; opStr: firebase.firestore.WhereFilterOp; value: any } | null;
}

export interface CollectionHookOptions<T = any> {
    initialData?: T;
}

export const buildQuery = (
    collection: string,
    { limit = null, orderBy = null, where = null }: GetAllQueryParams = {}
): firebase.firestore.Query<firebase.firestore.DocumentData> | undefined => {
    if (firestore) {
        let query: firebase.firestore.Query<firebase.firestore.DocumentData> = firestore.collection(
            collection
        );
        if (where)
            query = query.where(
                where.fieldPath || firebase.firestore.FieldPath.documentId(),
                where.opStr,
                where.value
            );
        if (limit) query = query.limit(limit);
        if (orderBy) query = query.orderBy(orderBy);

        return query;
    }

    return undefined;
};

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
    queryProps: GetAllQueryParams = {}
): Promise<T[]> => {
    const query = buildQuery(collection, queryProps);

    if (query) {
        const snapshot = await query.get();
        return snapshot.docs.map(doc => <T>(<unknown>{ id: doc.id, ...doc.data() }));
    }

    return [];
};

export const useDocument = <T>(
    collection: string,
    id: string,
    options: CollectionHookOptions = {}
): [T, boolean, Error | undefined] => {
    const query = firestore?.collection(collection).doc(id);
    const [data, loading, errors] = useDocumentData<T>(query, { idField: "id" });

    return [data || options.initialData || [], loading, errors];
};

export const useCollection = <T>(
    collection: string,
    options: GetAllQueryParams & CollectionHookOptions = {}
): [T[], boolean, Error | undefined] => {
    const query = buildQuery(collection, options);
    const [data, loading, errors] = useCollectionData<T>(query, { idField: "id" });

    return [data || options.initialData || [], loading, errors];
};

export const getUser = async (id: string): Promise<User | null> => {
    return await getDocument("users", id);
};

export const getAllUsers = async (queryProps: GetAllQueryParams = {}): Promise<User[]> => {
    return await getAllDocuments("users", queryProps);
};

export const useUsers = (
    options: GetAllQueryParams & CollectionHookOptions = {}
): [User[], boolean, Error | undefined] => {
    return useCollection("users", options);
};

export const getMember = async (id: string): Promise<Member | null> => {
    return await getDocument("members", id);
};

export const getAllMembers = async (queryProps: GetAllQueryParams = {}): Promise<Member[]> => {
    return await getAllDocuments("members", queryProps);
};

export const useMembers = (
    options: GetAllQueryParams & CollectionHookOptions = {}
): [Member[], boolean, Error | undefined] => {
    return useCollection("members", { orderBy: "rank", ...options });
};

export const getCompany = async (id: string): Promise<Company | null> => {
    return await getDocument("companies", id);
};

export const getAllCompanies = async (queryProps: GetAllQueryParams = {}): Promise<Company[]> => {
    return await getAllDocuments<Company>("companies", queryProps);
};

export const useCompanies = (
    options: GetAllQueryParams & CollectionHookOptions = {}
): [Company[], boolean, Error | undefined] => {
    return useCollection("companies", options);
};

export const getEvent = async (id: string): Promise<Event | null> => {
    return await getDocument("events", id);
};

export const getAllEvents = async (queryProps: GetAllQueryParams = {}): Promise<Event[]> => {
    return await getAllDocuments<Event>("events", queryProps);
};

export const useEvents = (
    options: GetAllQueryParams & CollectionHookOptions = {}
): [Event[], boolean, Error | undefined] => {
    return useCollection("events", options);
};
