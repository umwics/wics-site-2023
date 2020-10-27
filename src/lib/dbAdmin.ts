import { AuditLog, Carousel, Company, Event, Member, Resource, User } from "../interfaces";
import { auth, firestore } from "./firebaseAdmin";

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
        const { id, ...data } = user;

        await firestore
            .collection("users")
            .doc(id)
            .set({ ...data }, { merge: true });

        const newUser = <User>{ id, ...data };

        return newUser;
    }

    return null;
};

export const deleteUser = async (id: string): Promise<boolean> => {
    if (auth) {
        const deletePromise = auth
            .deleteUser(id)
            .then(() => deleteDocument("users", id))
            .catch(() => false);
        return await deletePromise;
    }

    return false;
};

export const updateUser = async (
    uid: string,
    partialUser: Partial<User>
): Promise<Partial<User> | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...newValues } = partialUser;
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

export const updateMembers = async (
    partialMembers: (Partial<Member> & { id: string })[]
): Promise<Partial<Member>[] | null> => {
    if (firestore) {
        const batch = firestore.batch();

        for (const partialMember of partialMembers) {
            const { id, ...newValues } = partialMember;

            const memberRef = firestore.collection("members").doc(id);
            batch.update(memberRef, newValues);
        }

        return await batch
            .commit()
            .then(() => partialMembers)
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

export const createEvent = async (event: Event): Promise<Event | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = event;
        const doc = await firestore.collection("events").add({ ...data });

        const newEvent = <Event>{ id: doc.id, ...data };

        return newEvent;
    }

    return null;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
    return await deleteDocument("events", id);
};

export const updateEvent = async (
    uid: string,
    partialEvent: Partial<Event>
): Promise<Partial<Event> | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...newValues } = partialEvent;

        return await firestore
            .collection("events")
            .doc(uid)
            .update(newValues)
            .then(() => newValues)
            .catch(() => null);
    }

    return null;
};

export const createResource = async (resource: Resource): Promise<Resource | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = resource;
        const doc = await firestore.collection("resources").add({ ...data });

        const newResource = <Resource>{ id: doc.id, ...data };

        return newResource;
    }

    return null;
};

export const deleteResource = async (id: string): Promise<boolean> => {
    return await deleteDocument("resources", id);
};

export const updateResource = async (
    uid: string,
    partialResource: Partial<Resource>
): Promise<Partial<Resource> | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...newValues } = partialResource;

        return await firestore
            .collection("resources")
            .doc(uid)
            .update(newValues)
            .then(() => newValues)
            .catch(() => null);
    }

    return null;
};

export const createCarousel = async (carousel: Carousel): Promise<Carousel | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = carousel;
        const doc = await firestore.collection("carousels").add({ ...data });

        const newCarousel = <Carousel>{ id: doc.id, ...data };

        return newCarousel;
    }

    return null;
};

export const deleteCarousel = async (id: string): Promise<boolean> => {
    return await deleteDocument("carousels", id);
};

export const updateCarousel = async (
    uid: string,
    partialCarousel: Partial<Carousel>
): Promise<Partial<Carousel> | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...newValues } = partialCarousel;

        return await firestore
            .collection("carousels")
            .doc(uid)
            .update(newValues)
            .then(() => newValues)
            .catch(() => null);
    }

    return null;
};

export const createAuditLog = async (auditLog: AuditLog): Promise<AuditLog | null> => {
    if (firestore) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = auditLog;
        const doc = await firestore.collection("auditlogs").add({ ...data });

        const newAuditLog = <AuditLog>{ id: doc.id, ...data };

        return newAuditLog;
    }

    return null;
};
