export type ResourceType =
    | "learnToCode"
    | "codingCamps"
    | "freeOnlineCourses"
    | "libraries"
    | "onlineEditors"
    | "uofmResources";
export const resourceTypes: ResourceType[] = [
    "learnToCode",
    "codingCamps",
    "freeOnlineCourses",
    "libraries",
    "onlineEditors",
    "uofmResources"
];
export const resourceTypeLabels: { [key in ResourceType]: string } = {
    learnToCode: "Learn to Code",
    codingCamps: "Coding Camps",
    freeOnlineCourses: "Free Online Courses",
    libraries: "Libraries",
    onlineEditors: "Online Editors",
    uofmResources: "UofM Resources"
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
