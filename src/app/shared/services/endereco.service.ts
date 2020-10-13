import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { mergeMap, catchError } from 'rxjs/operators';
import { Endereco } from '../interfaces/endereco.interface';
import { TipoImovel } from '../interfaces/tipo-imovel.interface';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService implements Resolve<TipoImovel[]> {

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService,
    private loadingController: LoadingController,
  ) { }

  resolve(): Observable<TipoImovel[]> {
    this.showLoading();
    return this.getTiposImoveis().pipe(catchError(error => {
      this.loadingController.dismiss();
      return error;
    }), mergeMap((tiposImoveis: TipoImovel[]) => {
      this.loadingController.dismiss();
      return of(tiposImoveis);
    }));
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Iniciando Formulário',
      translucent: true,
    });
    loading.present();
  }

  async getListaEnderecos(): Promise<Endereco[]> {
    const sql = 'SELECT * FROM enderecos';
    const result = await this.databaseService.executeSql(sql);
    const enderecos: Endereco[] = this.fillEnderecos(result.rows);
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

  getTiposImoveis(): Observable<TipoImovel[]> {
    return this.http.get<TipoImovel[]>('https://run.mocky.io/v3/60ca72ff-768c-48d0-ac65-2c62f48c7ad4');
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

  putEndereco(endereco: Endereco) {
    const sql = 'UPDATE enderecos SET (cep,pais,logradouro,complemento,bairro,numero,cidade,uf,ramoAtividade,classe,tipoImovelId,descricao,data,dataInicio,dataTermino) = (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) WHERE id = ?';
    const data = Object.values(endereco);
    console.log(sql, data);
    return this.databaseService.executeSql(sql, data);
  }

  deleteEndereco(enderecoId: number) {
    const sql = 'DELETE FROM enderecos WHERE id = ?';
    const data = [enderecoId];
    return this.databaseService.executeSql(sql, data);
  }

}
