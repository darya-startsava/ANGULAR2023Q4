export interface AppState {
    signUp: SignUpState;
    signIn: SignInState;
    profile: ProfileState;
    groups: GroupsState;
    people: PeopleState;
}

export interface SignUpState {
    data: SignUpDataState | null;
    status: StatusState;
    error: ErrorState;
}

export interface SignUpDataState {
    email?: string | null;
    name?: string | null;
    password?: string | null;
}

export interface SignInState {
    data: SignInDataState | null;
    status: StatusState;
    error: ErrorState;
}

export interface SignInDataState {
    email?: string | null;
    password?: string | null;
}

export interface ProfileState {
    data: ProfileDataState | null;
    status: StatusState;
    error: ErrorType | null;
}

export interface ProfileDataState {
    uid?: string | null;
    email?: string | null;
    name?: string | null;
    createdAt?: string | null;
}

export interface GroupsState {
    data: GroupsDataState[];
    status: StatusState;
    error: ErrorType | null;
    countdownTimestamp: number;
    createGroupStatus: StatusState;
    createGroupError: ErrorType | null;
    deleteGroupStatus: StatusState;
}

export interface GroupsDataState {
    id: string;
    name: string;
    createdAt: string;
    createdBy: string;
}

export interface PeopleState {
    data: PeopleDataState[];
    status: StatusState;
    error: ErrorType | null;
    countdownTimestamp: number;
    createConversationStatus: StatusState;
    createConversationError: ErrorType | null;
}

export interface PeopleDataState {
    name: string;
    uid: string;
    conversationID: string | null;
}

export enum StatusState {
    Init = 'Init',
    Loading = 'Loading',
    Success = 'Success',
    Failed = 'Failed'
}

export interface ErrorState {
    type: ErrorType | null;
    message: string;
}

export enum ErrorType {
    InvalidFormDataException = 'InvalidFormDataException',
    PrimaryDuplicationException = 'PrimaryDuplicationException',
    NotFoundException = 'NotFoundException',
    InvalidTokenException = 'InvalidTokenException',
    InvalidIDException = 'InvalidIDException',
    InvalidUserDataException = 'InvalidUserDataException'
}
