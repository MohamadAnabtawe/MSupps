import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /* takes an http request (req) and an http handler (next) */
  /* retuns an observable with type of HttpEvent (of type any) */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // specify the error
      catchError(error => {
        /* check the type of the error */
        // check if the error is type of 401 unauthrized
        if (error.status === 401) {
          return throwError('Email or Password is wrong, try again!');
        }
        if (error instanceof HttpErrorResponse) {
          /*  the error is coming from our API (because it's an HTTP error)*/
          /* get the error from the header Application-Error header we created in our API*/
          const applicationError = error.headers.get('Application-Error');
          /* if there is an error message (500) in the header we retutn throw error which is type of observable */
          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }
          /* check if the error is a server error */
          const serverError = error.error;
          let modalStateErrors = '';
          // if it's a modal state error it goning to be a type of object, anything else will leave inside serverError variable
          if (serverError && typeof serverError === 'object') {
            // loop inside the object key
            for (const key in serverError) {
              if (serverError[key]) {
                // build the modal state errors in separate lines
                modalStateErrors += serverError[key] + '\n';
              }
            }
          }
          //
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

/* we have to add the interceptor we created to the arry of angular interceptors */
export const ErrorInterceptorProvider = {
  // provide the HTTP_INTERCEPTORS which is a token that represnts the array of http interceptors thaat are registered
  provide: HTTP_INTERCEPTORS,
  // the class we are using
  useClass: ErrorInterceptor,
  // we don't want this to replace the existing interceptors, we want this interceptor to be added, so we spicefy the multi value as true
  multi: true
};
