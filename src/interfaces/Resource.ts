export type ResourceType =
    | "courseTechTree"
    | "learnToCode"
    | "codingCamps"
    | "freeOnlineCourses"
    | "uofmResources";
export const resourceTypes: ResourceType[] = [
    "courseTechTree",
    "learnToCode",
    "codingCamps",
    "freeOnlineCourses",
    "uofmResources"
];
export const resourceTypeLabels: { [key in ResourceType]: string } = {
    courseTechTree: "CS Course Tech Tree",
    learnToCode: "Learn to Code",
    codingCamps: "Coding Camps",
    freeOnlineCourses: "Free Online Courses",
    uofmResources: "U of M Resources"
};

export interface Resource {
    id: string;
    name: string;
    title: string;
    description: string;
    types: ResourceType[];
    link: string;
    image: string;
}
