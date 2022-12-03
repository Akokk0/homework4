export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    code: string,
    verify: number
}

export interface AddUser {
    name: string,
    email: string,
    password: string,
}

export interface EditUser {
    id: number,
    name: string,
    email: string,
    password: string,
    verify: number
}
