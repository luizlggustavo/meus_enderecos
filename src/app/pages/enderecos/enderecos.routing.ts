import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoService } from '../../shared/services/endereco.service';
import { FormularioPage } from './formulario/formulario.page';
import { ListaEnderecosPage } from './lista-enderecos/lista-enderecos.page';

const routes: Routes = [
    { path: '', redirectTo: 'lista-enderecos', pathMatch: 'full' },
    { path: 'lista-enderecos', component: ListaEnderecosPage },
    { path: 'formulario', component: FormularioPage, resolve: { tiposImoveis: EnderecoService } },
    { path: 'formulario/:id', component: FormularioPage, resolve: { tiposImoveis: EnderecoService } }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class EnderecosRoutingModule { }
