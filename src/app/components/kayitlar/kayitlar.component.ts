import { Kayit3 } from './../../models/kayit3';

import { Kayitt } from '../../models/kayitt';
import { Kayit } from './../../models/kayit';
import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {
  kayitlar: any;
  masa2: any;
  csinif: any;
  secKayit: Kayit = new Kayit();
  secKayitt: Kayitt = new Kayitt();
  secKayit3: Kayit3 = new Kayit3();
  sonuc: Sonuc = new Sonuc();




  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.secKayit.key = null;
    this.KayitListelee();
    this.secKayitt.key = null;
    this.KayitListele3();
    this.secKayit3.key = null;
  }
  KayitListele3() {
    this.fbServis.KayitListele3().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.csinif = data;
    });

  }
  KayitDuzenle3(kayit3: Kayit3) {
    Object.assign(this.secKayit3, kayit3);
  }
  KayitSil3(kayit3: Kayit3) {
    this.fbServis.KayitSil3(kayit3.key).then(() => {
      this.sonuc.islem3 = true;
      this.sonuc.mesaj3 = "Kayıt Silindi";
    });
  }
  Kaydet3() {
    var tarih3 = new Date();
    this.secKayit3.duzTarih3 = tarih3.getTime().toString();

    if (this.secKayit3.key == null) {
      this.secKayit3.kayTarih3 = tarih3.getTime().toString();
      this.fbServis.KayitEkle3(this.secKayit3).then(() => {
        this.sonuc.islem3 = true;
        this.sonuc.mesaj3 = "Kayıt Eklendi";
      });
    }
    else {
      this.fbServis.KayitDuzenle3(this.secKayit3).then(() => {
        this.sonuc.islem3 = true;
        this.sonuc.mesaj3 = "Kayıt Düzenlendi";
      });
    }
  }
  Vazgec3() {
    this.secKayit3 = new Kayit3();
    this.secKayit3.key = null;
  }
  KayitListele() {
    this.fbServis.KayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data;
    });

  }
  KayitDuzenle(kayit: Kayit) {
    Object.assign(this.secKayit, kayit);
  }
  KayitSil(kayit: Kayit) {
    this.fbServis.KayitSil(kayit.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
    });
  }
  Kaydet() {
    var tarih = new Date();
    this.secKayit.duzTarih = tarih.getTime().toString();

    if (this.secKayit.key == null) {
      this.secKayit.kayTarih = tarih.getTime().toString();
      this.fbServis.KayitEkle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      });
    }
    else {
      this.fbServis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Düzenlendi";
      });
    }
  }
  
  TamamlaIptal(k: Kayit, islem: boolean) {
    var tarih = new Date();
    k.duzTarih = tarih.getTime().toString();
    k.islem = islem;
    this.fbServis.KayitDuzenle(k).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Güncellendi";
    });

  }
  TamamlaIptall(e: Kayitt, islemm: boolean) {
    var tarihh = new Date();
    e.duzTarihh = tarihh.getTime().toString();
    e.islemm = islemm;
    this.fbServis.KayitDuzenlee(e).then(d => {
      this.sonuc.islemm = true;
      this.sonuc.mesajj = "Kayıt Güncellendi";
    });

  }
  TamamlaIptal3(b: Kayit3, islem3: boolean) {
    var tarih3 = new Date();
    b.duzTarih3 = tarih3.getTime().toString();
    b.islem3 = islem3;
    this.fbServis.KayitDuzenle3(b).then(d => {
      this.sonuc.islem3 = true;
      this.sonuc.mesaj3 = "Kayıt Güncellendi";
    });

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
    this.secKayit = new Kayit();
    this.secKayit.key = null;
  }
  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }

}
