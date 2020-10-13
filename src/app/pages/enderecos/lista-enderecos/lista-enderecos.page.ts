import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from '../../../shared/interfaces/endereco.interface';
import { EnderecoService } from '../../../shared/services/endereco.service';

@Component({
  selector: 'app-lista-enderecos',
  templateUrl: 'lista-enderecos.page.html',
  styleUrls: ['lista-enderecos.page.scss'],
})
export class ListaEnderecosPage implements OnInit {
  public enderecos: Endereco[];

  constructor(
    private router: Router,
    private enderecoService: EnderecoService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getListaEnderecos();
  }

  private async getListaEnderecos() {
    this.enderecos = await this.enderecoService.getListaEnderecos();
  }

  labelEndereco(endereco: Endereco): string {
    return endereco ? `${endereco.logradouro}, ${endereco.numero} - ${endereco.uf}` : '';
  }

  refresh(event) {
    this.getListaEnderecos();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  abrirEndereco(enderecoId: number) {
    this.router.navigate([`/enderecos/formulario/${enderecoId}`]);
  }

}
