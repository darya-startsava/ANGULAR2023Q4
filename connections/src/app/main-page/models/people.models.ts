export interface PeopleResponse {
    Count: number;
    Items: Array<PeopleItems>;
}

export interface PeopleItems {
    name: SInterface;
    uid: SInterface;
}

export interface SInterface {
    S: string;
}
