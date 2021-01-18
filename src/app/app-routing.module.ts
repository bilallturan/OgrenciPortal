import { CsinifComponent } from './components/csinif/csinif.component';

import { Masa2Component } from './components/masa2/masa2.component';
import { LoginComponent } from './components/login/login.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';



const redirectLogin = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [

  { path: '', component: HomeComponent },


  { path: 'kayitlar',
    component:
      KayitlarComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
  }
  }
  ,

  { path: 'login', component: LoginComponent },

  { path: 'masa2',
    component:
      Masa2Component,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
  }
  }
  ,
  { path: 'csinif',
    component:
      CsinifComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
  }
  }
  ,



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
