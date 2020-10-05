export interface TreeLink {
    id: string;
    title: string;
    subheader: string;
    body: string;
    linkName: string;
    linkHref: string;
}

export interface LinkTree {
    links: TreeLink[];
}
