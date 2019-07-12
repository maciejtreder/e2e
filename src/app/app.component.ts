import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';

  public isLoading$: Observable<boolean> = this.loader.getOnGoingRequests();

  constructor(private loader: LoaderService) {}
}
