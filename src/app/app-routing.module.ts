import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'meus-enderecos', pathMatch: 'full' },
  { path: 'meus-enderecos', loadChildren: () => import('./pages/enderecos/enderecos.module').then(m => m.MeusEnderecosPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
