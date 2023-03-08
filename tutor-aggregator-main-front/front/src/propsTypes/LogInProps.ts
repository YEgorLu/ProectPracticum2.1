
export type LogInProps = {
    logged: LogIn,
    changeStatus: (status: LogIn, token?: string) => void
}

export enum LogIn{
    LOGGED_IN = 'LOGGED_IN',
    NOT_LOGGED = 'NOT_LOGGED'
}

