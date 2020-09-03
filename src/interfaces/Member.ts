export interface MemberLink {
    title: string;
    link: string;
}

export type MemberPosition =
    | "exec"
    | "pastExec"
    | "management"
    | "websiteCommittee"
    | "activeMember"
    | "alumni";
export const memberPositions: MemberPosition[] = [
    "exec",
    "pastExec",
    "management",
    "websiteCommittee",
    "activeMember",
    "alumni"
];
export const memberPositionLabels: { [key in MemberPosition]: string } = {
    exec: "Exec",
    pastExec: "Past Exec",
    management: "Management",
    websiteCommittee: "Website Committee",
    activeMember: "Active Member",
    alumni: "Alumni"
};

export interface Member {
    id: string;
    name: string;
    displayName: string;
    title: string;
    email: string;
    description: string;
    facts: string[];
    links: MemberLink[];
    positions: MemberPosition[];
    image: string;
}
