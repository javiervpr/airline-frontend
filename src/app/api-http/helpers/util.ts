import { environment } from "src/environments/environment"

export const buildEndpoint = (endpoint: string) => {
    return `${environment.apirUrl}${endpoint}`

}