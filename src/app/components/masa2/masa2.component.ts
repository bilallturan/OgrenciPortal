import { Kayitt } from '../../models/kayitt';
import { FbServisService } from '../../services/fbServis.service';
import { Sonuc } from '../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masa2',
  templateUrl: './masa2.component.html',
  styleUrls: ['./masa2.component.scss']
})
export class Masa2Component implements OnInit {

  masa2: any;
  secKayitt: Kayitt = new Kayitt();
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.KayitListelee();
    this.secKayitt.key = null;
  }
  KayitListelee() {
    this.fbServis.KayitListelee().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.masa2 = data;
    });

  }
  KayitDuzenlee(kayitt: Kayitt) {
    Object.assign(this.secKayitt, kayitt);
  }
  KayitSill(kayitt: Kayitt) {
    this.fbServis.KayitSill(kayitt.key).then(() => {
      this.sonuc.islemm = true;
      this.sonuc.mesajj = "Kayıt Silindi";
    });
  }
  Kaydett() {
    var tarihh = new Date();
    this.secKayitt.duzTarihh = tarihh.getTime().toString();

    if (this.secKayitt.key == null) {
      this.secKayitt.kayTarihh = tarihh.getTime().toString();
      this.fbServis.KayitEklee(this.secKayitt).then(() => {
        this.sonuc.islemm = true;
        this.sonuc.mesajj = "Kayıt Eklendi";
      });
    }
    else {
      this.fbServis.KayitDuzenlee(this.secKayitt).then(() => {
        this.sonuc.islemm = true;
        this.sonuc.mesajj = "Kayıt Düzenlendi";
      });
    }
  }
  Vazgec() {
    this.secKayitt = new Kayitt();
    this.secKayitt.key = null;
  }
  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }

}
