export interface MemberLink {
    title: string;
    link: string;
}

export interface Member {
    id: string;
    name: string;
    displayName: string;
    title: string;
    email: string;
    description: string;
    facts: string[];
    links: MemberLink[];
    image: string;
}
