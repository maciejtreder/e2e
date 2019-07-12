import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

export class LoaderInterceptorService implements HttpInterceptor {

  constructor(private loaderService:LoaderService) {}

  private static onGoingRequestsCount = 0;
  private static isRequestOnGoing = false;

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    LoaderInterceptorService.onGoingRequestsCount++;
    this.emitValues();
    return next.handle(request).pipe(tap((val) => {
      if (val.type === HttpEventType.Response) {
        LoaderInterceptorService.onGoingRequestsCount--;
        this.emitValues();
      }
    }));
  }

  private emitValues(): void {
    if(LoaderInterceptorService.onGoingRequestsCount > 0 && LoaderInterceptorService.isRequestOnGoing) 
      return;

    LoaderInterceptorService.isRequestOnGoing = ! LoaderInterceptorService.isRequestOnGoing;
    this.loaderService.broadcast(LoaderInterceptorService.isRequestOnGoing);
  }
}
