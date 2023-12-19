export interface GroupsListResponse {
    Count: number;
    Items: Array<GroupItems>;
}

export interface GroupItems {
    id: SInterface;
    name: SInterface;
    createdAt: SInterface;
    createdBy: SInterface;
}

export interface SInterface {
    S: string;
}

export interface CreateGroupResponse {
    groupID: string;
}
