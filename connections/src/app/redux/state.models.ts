export interface AppState {
    signUp: SignUpState;
}

export interface SignUpState {
    data: SignUpDataState | null;
    status: StatusState;
}

export interface SignUpDataState {
    email?: string | null;
    name?: string | null;
    password?: string | null;
}

export enum StatusState {
    Init,
    Loading,
    Success,
    Failed
}

export interface ErrorState {
    type: string;
    message: string;
}
