import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private onGoingRequest$: Subject<boolean> = new BehaviorSubject(false);
  constructor() { }


  public getOnGoingRequests(): Observable<boolean> {
    return this.onGoingRequest$;
  }

  public broadcast(value: boolean): void {
    this.onGoingRequest$.next(value);
  }
}
