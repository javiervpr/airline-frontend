import { environment } from "src/environments/environment";

export const builEndpoint = (endpoint:string) => `${environment.baseUrl}${endpoint}`
