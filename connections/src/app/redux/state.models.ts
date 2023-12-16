export interface AppState {
    signUp: SignUpState;
    signIn: SignInState;
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
    NotFoundException = 'NotFoundException'
}

export interface SignInResponse {
    token: string;
    uid: string;
}
