export interface CompanyLink {
    title: string;
    link: string;
}

export interface CompanyMember {
    memberId: string;
    term: string;
    tools: string[];
}

export interface Company {
    id: string;
    name: string;
    displayName: string;
    email: string;
    description: string;
    links: CompanyLink[];
    members: CompanyMember[];
    image: string;
}
