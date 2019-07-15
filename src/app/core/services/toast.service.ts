import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private _snackbar: MatSnackBar) { }

  public make(arg: string | Error, action: string = null, duration = 3000): MatSnackBarRef<SimpleSnackBar> {
    return this._snackbar.open((arg instanceof Error) ? arg.message : arg, action, { duration });
  }
}
