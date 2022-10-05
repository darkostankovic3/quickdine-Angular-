import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    if (this.route.snapshot.params["uuid"] !== undefined)
      localStorage.setItem("uuid", this.route.snapshot.params["uuid"]);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem("token");
    const uuid: string = "242fdcf8-192a-48d3-bac6-021b2fd1fcbd";
    const url: string = location.origin;
    let language: string = localStorage.getItem("language");
    if (!language) language = "en";

    request = request.clone({ url: environment.url + request.url });

    if (token)
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token),
      });

    // if (uuid)
    request = request.clone({
      headers: request.headers.set(
        "uuid",
        "242fdcf8-192a-48d3-bac6-021b2fd1fcbd"
      ),
    });

    // if (url)
    request = request.clone({
      headers: request.headers.set("sub-domain", "http://quickdine.xyz"),
    });

    request = request.clone({
      headers: request.headers.set("language", language),
    });

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json"),
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : "",
          status: error.status,
        };

        if (error.status === 422) {
          if (error.error && error.error.message === "TABLE_ERROR") {
            if (localStorage.getItem("tableObj")) {
              const tableId = JSON.parse(localStorage.getItem("tableObj")).id;
              const locationId = this.route.snapshot.params["locationId"];
            }

            this.toastr.error("The table is already booked.", "Error");
          } else {
            Object.keys(error.error.errors).forEach((key, value) => {
              this.toastr.error(error.error.errors[key][0], "Error");
            });
          }
        }

        if (error.status === 401) {
          if (error.error === "invalid_credentials") {
            localStorage.clear();
            this.router.navigate(["/auth"]);
          }
        }

        if (error.status === 403) {
          this.toastr.error("Sorry, you are not authorised to access", "Error");
          this.router.navigate(["/auth"]);
        }

        //this.errorDialogService.openDialog(data);
        return throwError(error);
      })
    );
  }
}
