export type EventType = "mentorMingle" | "otherEvent";
export const eventTypes: EventType[] = ["mentorMingle", "otherEvent"];
export const eventTypeLabels: { [key in EventType]: string } = {
    mentorMingle: "Mentor Mingle",
    otherEvent: "Other Events"
};

export interface Event {
    id: string;
    name: string;
    title: string;
    term: string;
    type: EventType;
    location: string;
    description: string;
    date: string;
    photoCredits: string[];
    images: string[];
}
