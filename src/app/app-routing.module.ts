import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoute: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
