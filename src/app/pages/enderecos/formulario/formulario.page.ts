import { Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Endereco } from '../../../shared/interfaces/endereco.interface';
import { TipoImovel } from '../../../shared/interfaces/tipo-imovel.interface';
import { EnderecoService } from '../../../shared/services/endereco.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  public enderecoId: number;
  public tiposImoveis: TipoImovel[];
  public formularioEndereco: FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private toastController: ToastController,
  ) {
  }

  ngOnInit() {
    this.iniciarFormulario();
    this.iniciarTiposImoveis();
    this.setDataFormulario();
  }

  setDataFormulario() {
    this.route.params.subscribe(param => {
      if (param) {
        this.enderecoId = param.id;
        this.getEnderecoById(param.id);
      }
    });
  }

  getEnderecoById(enderecoId: number) {
    this.enderecoService.getEnderecoById(enderecoId)
      .then((endereco: Endereco) => this.setValuesFormulario(endereco));
  }

  setValuesFormulario(endereco: Endereco) {
    this.formularioEndereco.patchValue(endereco);
    this.formularioEndereco.get('tipoImovel').patchValue(endereco.tipoImovelId);
  }

  private iniciarTiposImoveis() {
    this.route.data.subscribe(routeData => {
      this.setTiposImoveis(routeData.tiposImoveis);
    });
  }

  private setTiposImoveis(tiposImoveis: TipoImovel[]) {
    this.tiposImoveis = tiposImoveis;
  }

  private iniciarFormulario() {
    this.formularioEndereco = this.formBuilder.group({
      cep: ['', [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8)
      ]],
      pais: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      logradouro: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      complemento: ['', [
        Validators.maxLength(25)
      ]],
      bairro: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      numero: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      cidade: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      uf: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      ramoAtividade: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      classe: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      tipoImovel: ['', [
        Validators.required,
      ]],
      descricao: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      data: ['', [
        Validators.required,
      ]],
      dataInicio: ['', [
        Validators.required,
      ]],
      dataTermino: ['', [
        Validators.required,
      ]],
    });
  }

  salvarEditar() {
    const endereco: Endereco = this.formularioEndereco.value;
    if (this.enderecoId) {
      this.editarFormulario(endereco);
    } else {
      this.salvarFormulario(endereco);
    }
  }

  public salvarFormulario(endereco: Endereco) {
    try {
      this.enderecoService.postEndereco(endereco).then(() => {
        this.presentToast('Salvo com sucesso');
        this.location.back();
      });
    } catch (err) {
      this.presentToast('Erro ao salvar endereço');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    await toast.present();
  }

  public editarFormulario(endereco: Endereco) {
    try {
      this.enderecoService.putEndereco(endereco, this.enderecoId).then(() => {
        this.presentToast('Editado com sucesso');
        this.location.back();
      });
    } catch (err) {
      this.presentToast('Erro ao editar endereço');
    }
  }

  public inputTouched(inputName: string): boolean {
    if (this.formularioEndereco.get(inputName)) {
      return this.formularioEndereco.get(inputName).touched;
    }
  }

  public inputRequired(inputName: string): boolean {
    return this.formularioEndereco.get(inputName).errors &&
      this.formularioEndereco.get(inputName).errors.required;
  }

  public inputMaxLength(inputName: string): boolean {
    const input = this.formularioEndereco.get(inputName);
    return input.errors && input.errors.maxLength;
  }

  public inputMinLength(inputName: string): boolean {
    const input = this.formularioEndereco.get(inputName);
    return input.errors && input.errors.minLength;
  }

  public formularioIncompleto(): boolean {
    return !this.formularioEndereco.valid;
  }

  get logradouro() {
    return this.formularioEndereco.get('logradouro').value;
  }

  get numero() {
    return this.formularioEndereco.get('numero').value;
  }

  get complemento() {
    return this.formularioEndereco.get('complemento').value;
  }

  showDeleteIcon(): boolean {
    if (this.formularioEndereco.get('id')) {
      return true;
    } else {
      return false;
    }
  }

  showLabelEndereco(): boolean {
    return this.logradouro && this.numero && this.complemento;
  }

  labelEndereco(): string {
    return `${this.logradouro}${', ' + this.numero}${' - ' + this.complemento}`;
  }

  removerEndereco() {
    try {
      this.enderecoService.deleteEndereco(this.enderecoId).then(() => {
        this.presentToast('Removido com sucesso');
        this.location.back();
      });
    } catch (err) {
      this.presentToast('Erro ao remover endereço');
    }

  }

  cancelar() {
    this.location.back();
  }

}
