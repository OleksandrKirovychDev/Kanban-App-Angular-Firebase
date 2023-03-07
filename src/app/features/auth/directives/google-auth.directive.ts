import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';

@Directive({
  selector: '[appGoogleAuth]',
})
export class GoogleAuthDirective {
  constructor(private afAuth: AngularFireAuth) {}

  @HostListener('click')
  public onClick() {
    this.afAuth.signInWithPopup(new firebase.GoogleAuthProvider());
  }
}
