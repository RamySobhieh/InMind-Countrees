import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayPageComponent } from './display-page/display-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'country/:name', component: DisplayPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
