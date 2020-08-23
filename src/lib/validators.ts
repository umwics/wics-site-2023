import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required()
});

export const registerSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required()
});

export const addMemberSchema = Yup.object({
    name: Yup.string().required(),
    displayName: Yup.string(),
    title: Yup.string().required(),
    email: Yup.string().email(),
    description: Yup.string(),
    facts: Yup.array().of(Yup.string()),
    links: Yup.array().of(
        Yup.object().shape({
            title: Yup.string(),
            link: Yup.string().url()
        })
    ),
    image: Yup.string()
});

export const addCompanySchema = Yup.object({
    name: Yup.string().required(),
    displayName: Yup.string(),
    email: Yup.string().email(),
    description: Yup.string(),
    links: Yup.array().of(
        Yup.object().shape({
            title: Yup.string(),
            link: Yup.string().url()
        })
    ),
    members: Yup.array().of(
        Yup.object().shape({
            memberId: Yup.string().required(),
            term: Yup.string(),
            tools: Yup.array().of(Yup.string())
        })
    ),
    image: Yup.string()
});
