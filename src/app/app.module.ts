import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IterativeMethodsComponent } from './iterative-methods/iterative-methods.component';
import { DoolittleComponent } from './doolittle/doolittle.component';
import { CholeskyComponent } from './cholesky/cholesky.component';
import { GaussComponent } from './gauss/gauss.component';
import { GaussJordanComponent } from './gauss-jordan/gauss-jordan.component';
import { CroutComponent } from './crout/crout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    IterativeMethodsComponent,
    DoolittleComponent,
    CholeskyComponent,
    GaussComponent,
    GaussJordanComponent,
    CroutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
