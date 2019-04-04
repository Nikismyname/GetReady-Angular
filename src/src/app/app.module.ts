import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Module Declarations
import { CommonModule } from "./common/common.module";
import { GlobalModule } from "./global/global.module";
import { CrudModule } from "./crud/crud.module"; 

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects"; 
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { Crud, CrudObs } from "./services/crud";
import { QuestionSheetService } from "./services/question-sheet-service";
import { QuestionService } from "./services/question-service"
import { ReorderService } from "./services/reorder-service";
import { RoutePaths } from "./utilities/route-paths";
import { TrackingService } from "./services/tracking.service";
import { UserService } from "./services/user-service";
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';

import { AppComponent } from './app.component';
import { PersonalSheetComponent } from "./components/personal-sheet/personal-sheet.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    PersonalSheetComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,

    CommonModule,
    GlobalModule,
    CrudModule,

    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: "Get Ready App",
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ], 
  providers: [
    Crud,
    CrudObs,
    QuestionSheetService,
    QuestionService,
    ReorderService,
    RoutePaths,
    TrackingService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
