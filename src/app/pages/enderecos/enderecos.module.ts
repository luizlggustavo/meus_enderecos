import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { EnderecosRoutingModule } from './enderecos.routing';
import { FormularioPage } from './formulario/formulario.page';
import { ListaEnderecosPage } from './lista-enderecos/lista-enderecos.page';
import { ComponentsModule } from '../../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    EnderecosRoutingModule,
  ],
  declarations: [
    FormularioPage,
    ListaEnderecosPage,
  ]
})
export class MeusEnderecosPageModule { }
