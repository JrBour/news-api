import { Routes } from '@angular/router';
import { HomePageComponent } from "./routes/home-page/home-page.component";
import { BookmarksPageComponent } from "./routes/bookmarks-page/bookmarks-page.component";
import { RegisterPageComponent } from "./routes/register-page/register-page.component";
import { LoginPageComponent } from "./routes/login-page/login-page.component";
import { AuthGuard } from "./auth.guard";

export const AppRouterModule: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'bookmarks',
    component: BookmarksPageComponent
  },
];