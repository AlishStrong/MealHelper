import { NgModule } from '@angular/core';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { firebaseApiKey } from 'src/environments/firebase-apikey';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { ProductsModule } from './modules/products/products.module';
import { ProfileModule } from './modules/profile/profile.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { LoginComponent } from './shared/components/login/login.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

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
    AngularFireAuthModule,
    ReactiveFormsModule,
    ProfileModule
  ],
  providers: [
    { provide: FirebaseOptionsToken, useValue: {...environment.firebaseConfig, ...firebaseApiKey} },
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent],
  exports: [NavbarComponent]
})
export class AppModule { }
