import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoadingController } from '@ionic/angular';
import { DatabaseService } from './database.service';
import { Endereco } from '../interfaces/endereco.interface';
import { TipoImovel } from '../interfaces/tipo-imovel.interface';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService implements Resolve<TipoImovel[]> {

  constructor(
    private databaseService: DatabaseService,
    private loadingController: LoadingController,
  ) { }

  async resolve(): Promise<TipoImovel[]> {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Iniciando formulário',
      backdropDismiss: true,
      translucent: true,
    });
    loading.present();
    const result = await this.getTiposImoveis();
    loading.dismiss();
    return result;
  }

  async showLoading() {

  }

  async getListaEnderecos(): Promise<Endereco[]> {
    const sql = 'SELECT * FROM enderecos';
    const result = await this.databaseService.executeSql(sql);
    const enderecos: Endereco[] = this.fillEnderecos(result.rows);
    this.databaseService.databasereturn();
    return enderecos;
  }

  private fillEnderecos(rows: any): Endereco[] {
    const enderecos: Endereco[] = [];
    for (let i = 0; i < rows.length; i++) {
      const endereco: Endereco = rows.item(i);
      enderecos.push(endereco);
    }
    return enderecos;
  }

  async getTiposImoveis(): Promise<TipoImovel[]> {
    const sql = 'SELECT * FROM tiposImoveis';
    const result = await this.databaseService.executeSql(sql);
    const tiposImovel = await this.fillImoveis(result.rows);
    return tiposImovel;
  }

  private fillImoveis(rows: any): TipoImovel[] {
    const tiposImoveis: TipoImovel[] = [];
    for (let i = 0; i < rows.length; i++) {
      const tipoImovel: TipoImovel = rows.item(i);
      tiposImoveis.push(tipoImovel);
    }
    return tiposImoveis;
  }

  postEndereco(endereco: Endereco) {
    const sql = 'INSERT INTO enderecos (cep,pais,logradouro,complemento,bairro,numero,cidade,uf,ramoAtividade,classe,tipoImovelId,descricao,data,dataInicio,dataTermino) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const data = Object.values(endereco);
    return this.databaseService.executeSql(sql, data);
  }

  async getEnderecoById(id: number) {
    const sql = 'SELECT * FROM enderecos WHERE id = ?';
    const data = [id];
    const result = await this.databaseService.executeSql(sql, data);
    const rows = result.rows;
    let endereco: Endereco = {};
    if (rows && rows.length > 0) {
      endereco = rows.item(0);
    }
    return endereco;
  }

  putEndereco(endereco: Endereco, enderecoId: number) {
    const sql = `UPDATE enderecos SET cep = ?,pais = ?,logradouro = ?,complemento = ?,bairro = ?,numero = ?,cidade = ?,uf = ?,ramoAtividade = ?,classe = ?,tipoImovelId = ?,descricao = ?,data = ?,dataInicio = ?,dataTermino = ? WHERE id = ${enderecoId}`;
    const data = Object.values(endereco);
    return this.databaseService.executeSql(sql, data);
  }

  deleteEndereco(enderecoId: number) {
    const sql = 'DELETE FROM enderecos WHERE id = ?';
    const data = [enderecoId];
    return this.databaseService.executeSql(sql, data);
  }

}
