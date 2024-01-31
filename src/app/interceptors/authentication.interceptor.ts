import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../environment/environment";

export const authentication: HttpInterceptorFn = (req, next) => {
    req.headers.append('api_key', environment.API_KEY);
    return next(req)
}