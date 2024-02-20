import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    const cloned = req.clone({
      headers: req.headers.set("Authorization",
        "Bearer " + accessToken)
    });

    return next(cloned);
  } else {
    return next(req);
  }
}
