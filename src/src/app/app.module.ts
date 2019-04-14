//ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Module Declarations 
import { CrudModule } from "./crud/crud.module";  
import { AuthenticationModule } from "./authentication/authentication.module";

//NGRX 
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects"; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
 
//SERVICES
// import { QuestionSheetService } from "./services/question-sheet-service";
// import { QuestionService } from "./services/question-service"
// import { ReorderService } from "./services/reorder-service";
// import { RoutePaths } from "./services/route-paths";
// import { UserService } from "./services/user-service";
// import { AdminService } from "./services/admin-service";

//INTERCEPTORS
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
   
//COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
 
import { ToastrModule } from "ngx-toastr";
import { ShouldDisplayQuestionDirective } from './directives/should-display-question.directive';
  
@NgModule({
  declarations: [
    AppComponent,
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
    // QuestionSheetService,
    // QuestionService,
    // AdminService,
    // UserService,
    // ReorderService,
    // RoutePaths,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
