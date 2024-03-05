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

export interface GroupMessagesResponse {
    Count: number;
    Items: Array<GroupMessageItem>;
}

export interface GroupMessageItem {
    autorID: SInterface;
    message: SInterface;
    createdAt: SInterface;
}
