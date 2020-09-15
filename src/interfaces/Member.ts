export interface MemberLink {
    title: string;
    link: string;
}

export type MemberPosition =
    | "exec"
    | "management"
    | "websiteCommittee"
    | "activeMember"
    | "pastExec"
    | "alumni";
export const memberPositions: MemberPosition[] = [
    "exec",
    "management",
    "websiteCommittee",
    "activeMember",
    "pastExec",
    "alumni"
];
export const memberPositionLabels: { [key in MemberPosition]: string } = {
    exec: "Exec",
    management: "Management",
    websiteCommittee: "Website Committee",
    activeMember: "Active Member",
    pastExec: "Past Exec",
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
