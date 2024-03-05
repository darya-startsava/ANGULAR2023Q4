export interface ConversationsListResponse {
    Count: number;
    Items: Array<ConversationItem>;
}

export interface ConversationItem {
    id: SInterface;
    companionID: SInterface;
}

export interface SInterface {
    S: string;
}

export interface CreateConversationResponse {
    conversationID: string;
}
