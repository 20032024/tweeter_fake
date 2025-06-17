import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TweetsComponent } from './tweets/tweets.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';
import { PostresReactionsComponent } from './postres-reactions/postres-reactions.component';
import { ReactionsComponent } from './reactions/reactions.component';
import { PostresCommentsComponent } from './postres-comments/postres-comments.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LandingPageComponent,
    TweetsComponent,
    HomeComponent,
    CategoryListComponent,
    PostresReactionsComponent,
    ReactionsComponent,
    PostresCommentsComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }