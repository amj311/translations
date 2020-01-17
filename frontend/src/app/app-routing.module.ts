import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { PlayComponent } from './components/play/play.component';
import { HostComponent } from './components/host/host.component';


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'play', component: PlayComponent },
  { path: 'host', component: HostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
