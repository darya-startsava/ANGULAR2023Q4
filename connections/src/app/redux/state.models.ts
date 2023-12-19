export interface AppState {
    signUp: SignUpState;
    signIn: SignInState;
    profile: ProfileState;
    groups: GroupsState;
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
}

export interface GroupsDataState {
    id: string;
    name: string;
    createdAt: string;
    createdBy: string;
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
