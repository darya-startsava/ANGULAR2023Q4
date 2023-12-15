export interface AppState {
    signUp: SignUpState;
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
    PrimaryDuplicationException = 'PrimaryDuplicationException'
}
