import axios from "axios";

export const service = axios.create({
    baseURL: import.meta.env.DEV ? '/api' : "http://api.hanling.space"
})

export interface Response<T> {
    data: T
    code: number
}

export type Result<T> = Promise<Response<T>>