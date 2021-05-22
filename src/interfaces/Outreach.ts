export interface OutreachLink {
    title: string;
    link: string;
}

export type outreachPosition =
    | "forSchools"
    | "forVolunteers"
export const outreachPositions: outreachPosition[] = [
    "forSchools",
    "forVolunteers"
];

export const outreachPositionLabels: { [key in outreachPosition]: string } = {
    forSchools: "For Schools",
    forVolunteers: "For Volunteers"
};
