export interface IUsers {
    id: number,
    email: string,
    name: string,
    password: string,
    address: string,
    phone: string,
    country?: string | undefined,
    city?: string | undefined
}