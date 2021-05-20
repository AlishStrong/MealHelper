import { NgModule } from '@angular/core';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { firebaseApiKey } from 'src/environments/firebase-apikey';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { ProductsModule } from './modules/products/products.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './shared/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ProductsModule,
    RecipesModule,
    AngularFireModule,
    AngularFireAuthModule
  ],
  providers: [
    { provide: FirebaseOptionsToken, useValue: {...environment.firebaseConfig, ...firebaseApiKey} }
  ],
  bootstrap: [AppComponent],
  exports: [NavbarComponent]
})
export class AppModule { }
