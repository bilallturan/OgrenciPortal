import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Kayit3 } from './../../models/kayit3';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csinif',
  templateUrl: './csinif.component.html',
  styleUrls: ['./csinif.component.scss']
})
export class CsinifComponent implements OnInit {

  csinif: any;
  secKayit3: Kayit3 = new Kayit3();
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
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
  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }

}
