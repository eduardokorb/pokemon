import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GenerationComponent } from './generation/generation.component';


const routes: Routes = [
  {path:'', component: AppComponent},
  {path:'generation', component: GenerationComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
