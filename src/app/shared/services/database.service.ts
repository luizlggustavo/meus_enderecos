import { Injectable } from '@angular/core';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public db: SQLiteObject;
  public databaseName: string;

  constructor(
    private sqlite: SQLite, private sqlitePorter: SQLitePorter
  ) {
    this.databaseName = 'database.db';
  }

  async openDataBase() {
    try {
      this.db = await this.sqlite.create({ name: this.databaseName, location: 'default' });
      await this.createDataBase();
    } catch (error) {
    }
  }

  async createDataBase() {
    const sqlCreateDataBase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDataBase);
    return result ? true : false;
  }

  async databasereturn() {
    const data1 = await this.sqlitePorter.exportDbToJson(this.db);
  }

  getCreateTable(): string {
    const sqls = [];
    sqls.push(
      `CREATE TABLE IF NOT EXISTS enderecos (id integer primary key AUTOINCREMENT,cep TEXT,pais TEXT,logradouro TEXT,complemento TEXT,bairro TEXT,numero INTEGER,cidade TEXT,uf TEXT,ramoAtividade TEXT,classe TEXT,tipoImovelId INTEGER,descricao TEXT,data TEXT,dataInicio TEXT,dataTermino TEXT)`
    );
    return sqls.join('\n');
  }

  executeSql(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }

}
