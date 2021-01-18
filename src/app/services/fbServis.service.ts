import { Kayit3 } from './../models/kayit3';
import { Kayitt } from './../models/kayitt';
import { Kayit } from './../models/kayit';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FbServisService {

  private dbKayit = '/Kayitlar';
  kayitRef: AngularFireList<Kayit> = null;
  private dbKayitt = '/Masa2';
  kayittRef: AngularFireList<Kayitt> = null;
  private dbKayit3 = '/csınıf';
  kayit3Ref: AngularFireList<Kayit3> = null;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.kayittRef = db.list(this.dbKayitt);
    this.kayit3Ref = db.list(this.dbKayit3);
  }

  /* kayıtlar firebase servis başlangıç  */

  KayitListele() {
    return this.kayitRef;
  }
  KayitEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit);
  }

  KayitDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit);
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }
  /* kayıtlar firebase servis bitiş  */


  /* masalar firebase servis başlangıç  */
  KayitListelee() {
    return this.kayittRef;
  }
  KayitEklee(kayitt: Kayitt) {
    return this.kayittRef.push(kayitt);
  }
  KayitDuzenlee(kayitt: Kayitt) {
    return this.kayittRef.update(kayitt.key, kayitt);
  }
  KayitSill(key: string) {
    return this.kayittRef.remove(key);
  }
  
  /* masalar firebase servis bitiş  */
  /* masalar firebase servis başlangıç  */
  KayitListele3() {
    return this.kayit3Ref;
  }
  KayitEkle3(kayit3: Kayit3) {
    return this.kayit3Ref.push(kayit3);
  }
  KayitDuzenle3(kayit3: Kayit3) {
    return this.kayittRef.update(kayit3.key, kayit3);
  }
  KayitSil3(key: string) {
    return this.kayit3Ref.remove(key);
  }
  
  /* masalar firebase servis bitiş  */

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }

}
