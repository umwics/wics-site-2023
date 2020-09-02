import { User } from "../interfaces";
import { firestore } from "./firebaseAdmin";

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
