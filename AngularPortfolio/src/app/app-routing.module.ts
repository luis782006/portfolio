import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgCircleProgressModule.forRoot({})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
