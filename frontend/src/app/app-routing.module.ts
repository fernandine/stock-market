import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'stock' },
{ path: 'stock', component: ChartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
