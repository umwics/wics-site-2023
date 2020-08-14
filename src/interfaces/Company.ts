import { Member } from "./Member";

export interface CompanyMember {
    member: Member;
    term: string;
    tools: string[];
}

export interface Comapny {
    id: string;
    name: string;
    displayName: string;
    description: string;
    email: string;
    links: string;
    image: string;
    members: CompanyMember[];
}
