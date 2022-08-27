import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientToolbarService {
  private _hasBacklink$ = new BehaviorSubject<boolean>(false);

  public get hasBacklink$() {
    return this._hasBacklink$.asObservable();
  }

  public setBacklinkState(link: boolean) {
    this._hasBacklink$.next(link);
  }
}
