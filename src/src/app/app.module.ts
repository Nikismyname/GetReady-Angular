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
import { AuthenticationModule } from "./authentication/authentication.module";
 
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects"; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";

import { ToastrModule } from "ngx-toastr";
import { ShouldDisplayQuestionDirective } from './directives/should-display-question.directive';

@NgModule({
  declarations: [
    AppComponent,
    PersonalSheetComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    ShouldDisplayQuestionDirective,
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
    AuthenticationModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    // StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name:"GetReady", 
    }),

    ToastrModule.forRoot(),
  ], 
  providers: [
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
