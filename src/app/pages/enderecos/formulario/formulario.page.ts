import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  public formularioEndereco: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
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
    });
  }

  async salvarFormulario() {
    console.log(this.formularioEndereco.value);
  }

  inputTouched(inputName: string): boolean {
    return this.formularioEndereco.get(inputName).touched;
  }

  inputRequired(inputName: string): boolean {
    return this.formularioEndereco.get(inputName).errors &&
      this.formularioEndereco.get(inputName).errors.required;
  }

  inputMaxLength(inputName: string): boolean {
    const input = this.formularioEndereco.get(inputName);
    return input.errors && input.errors.maxLength; d
  }

  inputMinLength(inputName: string): boolean {
    const input = this.formularioEndereco.get(inputName);
    return input.errors && input.errors.minLength;
  }

  public formularioIncompleto(): boolean {
    return !this.formularioEndereco.valid;
  }

}
