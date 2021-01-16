export interface MemberLink {
    title: string;
    link: string;
}

export type MemberPosition =
    | "exec"
    | "management"
    | "websiteCommittee"
    | "hallOfFame"
    | "activeMember"
    | "pastExec"
    | "alumni";
export const memberPositions: MemberPosition[] = [
    "exec",
    "management",
    "websiteCommittee",
    "hallOfFame",
    "activeMember",
    "pastExec",
    "alumni"
];

export type MemberTerm = "fall" | "winter" | "summer";
export const memberTerms: MemberTerm[] = ["fall", "winter", "summer"];

export const memberTermLabels: { [key in MemberTerm]: string } = {
    fall: "Fall",
    winter: "Winter",
    summer: "Summer"
};

export const memberPositionLabels: { [key in MemberPosition]: string } = {
    exec: "Exec",
    management: "Management",
    websiteCommittee: "Website Committee",
    hallOfFame: "WICS Hall of Fame",
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
    terms: MemberTerm[];
    rank: number;
    image: string;
}
