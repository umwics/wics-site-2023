import { useEffect, useState } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { Carousel, Company, Event, Member, Resource, User } from "../interfaces";
import firebase, { firestore } from "./firebase";

export interface GetAllQueryParams {
    limit?: number;
    orderBy?: string;
    where?: { fieldPath?: string; opStr: firebase.firestore.WhereFilterOp; value: any };
    startAt?: number;
    endAt?: number;
    startAfter?: number;
    endBefore?: number;
}

export interface CollectionHookOptions<T = any> {
    initialData?: T;
}

export interface CollectionHookInterface<T = any> {
    data: T;
    mutate: (data?: any) => void;
    loading: boolean;
    errors: Error | undefined;
}

export const buildQuery = (
    collection: string,
    { limit, orderBy, where, startAt, endAt, startAfter, endBefore }: GetAllQueryParams = {}
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
        if (startAt) query = query.startAt(startAt);
        if (endAt) query = query.endAt(endAt);
        if (startAfter) query = query.startAfter(startAfter);
        if (endBefore) query = query.endBefore(endBefore);

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
    id?: string,
    { initialData }: CollectionHookOptions = {}
): CollectionHookInterface<T> => {
    const query = id ? firestore?.collection(collection).doc(id) : undefined;
    const [firebaseData, loading, errors] = useDocumentData<T>(query, { idField: "id" });

    const [data, setData] = useState<T>(initialData);

    useEffect(() => {
        if (!loading && firebaseData) setData(firebaseData);
    }, [firebaseData]);

    return { data, mutate: (data: T) => setData(data), loading, errors };
};

export const useCollection = <T>(
    collection: string,
    {
        initialData,
        limit,
        orderBy,
        where,
        startAt,
        endAt,
        startAfter,
        endBefore
    }: GetAllQueryParams & CollectionHookOptions = {}
): CollectionHookInterface<T[]> => {
    const query = buildQuery(collection, {
        limit,
        orderBy,
        where,
        startAt,
        endAt,
        startAfter,
        endBefore
    });
    const [firebaseData, loading, errors] = useCollectionData<T>(query, { idField: "id" });

    const [data, setData] = useState<T[]>([...initialData]);

    useEffect(() => {
        if (!loading && firebaseData) setData(firebaseData);
    }, [firebaseData]);

    return { data: data || [], mutate: (data: T[]) => setData(data), loading, errors };
};

export const getUser = async (id: string): Promise<User | null> => {
    return await getDocument("users", id);
};

export const getAllUsers = async (queryProps: GetAllQueryParams = {}): Promise<User[]> => {
    return await getAllDocuments("users", queryProps);
};

export const useUser = (
    id?: string,
    options: CollectionHookOptions = {}
): CollectionHookInterface<User> => {
    return useDocument("users", id, options);
};

export const useUsers = (
    options: GetAllQueryParams & CollectionHookOptions = {}
): CollectionHookInterface<User[]> => {
    return useCollection("users", options);
};

export const getMember = async (id: string): Promise<Member | null> => {
    return await getDocument("members", id);
};

export const getAllMembers = async (queryProps: GetAllQueryParams = {}): Promise<Member[]> => {
    return await getAllDocuments("members", { orderBy: "rank", ...queryProps });
};

export const useMembers = (
    options: GetAllQueryParams & CollectionHookOptions = {}
): CollectionHookInterface<Member[]> => {
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
): CollectionHookInterface<Company[]> => {
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
): CollectionHookInterface<Event[]> => {
    return useCollection("events", options);
};

export const getResource = async (id: string): Promise<Resource | null> => {
    return await getDocument("resources", id);
};

export const getAllResources = async (queryProps: GetAllQueryParams = {}): Promise<Resource[]> => {
    return await getAllDocuments<Resource>("resources", queryProps);
};

export const useResources = (
    options: GetAllQueryParams & CollectionHookOptions = {}
): CollectionHookInterface<Resource[]> => {
    return useCollection("resources", options);
};

export const getCarousel = async (id: string): Promise<Carousel | null> => {
    return await getDocument("carousels", id);
};

export const getAllCarousels = async (queryProps: GetAllQueryParams = {}): Promise<Carousel[]> => {
    return await getAllDocuments<Carousel>("carousels", queryProps);
};

export const useCarousels = (
    options: GetAllQueryParams & CollectionHookOptions = {}
): CollectionHookInterface<Carousel[]> => {
    return useCollection("carousels", options);
};
