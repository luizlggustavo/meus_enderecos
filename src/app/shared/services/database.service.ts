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
      console.log(error);
    }
  }

  async createDataBase() {
    const sqlCreateDataBase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDataBase);
    this.buildTiposImoveisDataBase();
    return result ? true : false;
  }

  async buildTiposImoveisDataBase() {
    const sqlCreateTable = `CREATE TABLE IF NOT EXISTS tiposImoveis (id integer primary key AUTOINCREMENT,descricao TEXT)`;
    const resultTable = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateTable);
    const database = await this.sqlitePorter.exportDbToJson(this.db);
    if (!database.data.inserts.tiposImoveis || database.data.inserts.tiposImoveis && database.data.inserts.tiposImoveis.length === 0) {
      const sqlInsertPrivado = `INSERT INTO tiposImoveis (descricao) VALUES ('Privado') `;
      await this.executeSql(sqlInsertPrivado);
      const sqlInsertPublico = `INSERT INTO tiposImoveis (descricao) VALUES ('Publico') `;
      await this.executeSql(sqlInsertPublico);
    }
    return resultTable;
  }

  async databasereturn() {
    const data1 = await this.sqlitePorter.exportDbToJson(this.db);
    console.log('data1 :', data1);
  }

  getCreateTable(): string {
    const sqls = [];
    sqls.push(
      `CREATE TABLE IF NOT EXISTS enderecos (id integer primary key AUTOINCREMENT,cep TEXT,pais TEXT,logradouro TEXT,complemento TEXT,bairro TEXT,numero INTEGER,cidade TEXT,uf TEXT,ramoAtividade TEXT,classe TEXT,tipoImovelId INTEGER,descricao TEXT,data TEXT,dataInicio TEXT,dataTermino TEXT)`,
    );
    return sqls.join('\n');
  }

  executeSql(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }

}
