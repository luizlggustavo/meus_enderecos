import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../shared/components/components.module';
import { ListaEnderecosPage } from './lista-enderecos/lista-enderecos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListaEnderecosPage
      }
    ])
  ],
  declarations: [ListaEnderecosPage]
})
export class MeusEnderecosPageModule {}
