import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _errorMsg$ = new Subject<string>();

  public get errorMsg$() {
    return this._errorMsg$.asObservable();
  }

  public createUser(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => this._errorMsg$.next(err));
  }

  public loginUser(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => this._errorMsg$.next(err));
  }

  public resetPassword(email: string) {
    this.afAuth
      .sendPasswordResetEmail(email)
      .catch((err) => this._errorMsg$.next(err));
  }

  constructor(private afAuth: AngularFireAuth) {}
}
