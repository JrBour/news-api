import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRouterModule } from "./app.router";


import { CrudService } from "./services/crud/crud.service";

import { HomePageComponent } from './routes/home-page/home-page.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { RegisterPageComponent } from './routes/register-page/register-page.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';
import { SearchFormComponent } from './shared/search-form/search-form.component';
import { PostComponent } from './shared/post/post.component';
import { BookmarksPageComponent } from './routes/bookmarks-page/bookmarks-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavBarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SearchFormComponent,
    PostComponent,
    BookmarksPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(AppRouterModule, { onSameUrlNavigation: 'reload' }),
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
