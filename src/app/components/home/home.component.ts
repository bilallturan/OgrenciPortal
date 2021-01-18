import { Kayit3 } from './../../models/kayit3';
import { Kayit } from './../../models/kayit';
import { Kayitt } from '../../models/kayitt';
import { FbServisService } from '../../services/fbServis.service';
import { Sonuc } from '../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  kayitlar: any;
  masa2: any;
  kayit: any;
  csinif: any;
  secKayit3: Kayit3 = new Kayit3();
  secKayitt: Kayitt = new Kayitt();
  secKayit: Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  detay: boolean = false;
  detayy: boolean = false;
  detay3: boolean = false;
  silme: boolean = false;
  ekleduzenle: boolean = false;

  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.KayitListelee();
    this.secKayitt.key = null;
    this.KayitListele();
    this.secKayit.key = null;
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
  Kaydett() {
    var tarih = new Date();
    this.secKayitt.duzTarihh = tarih.getTime().toString();

    if (this.secKayitt.key == null) {
      this.secKayitt.kayTarihh = tarih.getTime().toString();
      this.secKayitt.duzTarihh = tarih.getTime().toString();
      this.secKayitt.islemm = false;
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

  KayitSill(kayitt: Kayitt) {
    this.fbServis.KayitSill(kayitt.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
    });
  }

  Vazgecc() {
    this.secKayitt = new Kayitt();
    this.secKayitt.key = null;
  }
  Sil() {

    this.fbServis.KayitSil(this.secKayit.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
      this.silme = false;
    });
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
    var tarih = new Date();
    e.duzTarihh = tarih.getTime().toString();
    e.islemm = islemm;
    this.fbServis.KayitDuzenlee(e).then(d => {
      this.sonuc.islemm = true;
      this.sonuc.mesajj = "Kayıt Güncellendi";
    });

  }

  KayitSec(k: Kayit) {
    Object.assign(this.secKayit, k);

  }
  KayitSecc(e: Kayitt) {
    Object.assign(this.secKayitt, e);

  }
  KayitSec3(k: Kayit3) {
    Object.assign(this.secKayit3, k);

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
  KayitDuzenlee(kayitt: Kayitt) {
    Object.assign(this.secKayitt, kayitt);
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
      this.secKayit.duzTarih = tarih.getTime().toString();
      this.secKayit.islem = false;
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
