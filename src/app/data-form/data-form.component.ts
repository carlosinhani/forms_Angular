import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DropdownService } from './../shared/services/Dropdown.service';
import { EstadoBr } from './../shared/models/estado-br';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { BaseFormComponent } from './../shared/base-form/base-form.component';

import { empty, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  // formulario: FormGroup;
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];
  // estados: EstadoBr[];


  constructor(
     private formBuilder: FormBuilder,
     private http: HttpClient,
     private dropdownService: DropdownService,
     private cepService: ConsultaCepService,
     private verificaEmailService: VerificaEmailService
     ) {
       super();
      }


  ngOnInit() {

    // this.verificaEmailService.verificarEmail('email@email.com').subscribe();

    this.estados = this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();

    // this.dropdownService.getEstadosBr() .subscribe(dados =>
    //   {this.estados = dados;
    //   console.log(dados);});

    //   this.formulario = new FormGroup({
    //    nome: new FormControl(null),
    //    email: new FormControl(null),

    //    endereco: new FormGroup({
    //      cep: new FormControl(null)
    //    })
    // });

    this.formulario = this.formBuilder.group({
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
        email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
        confirmarEmail: [null, [FormValidations.equalsTo('email')]],

        endereco: this.formBuilder.group({
          cep: [null, [Validators.required, FormValidations.cepValidator]],
          numero: [null, Validators.required],
          complemento: [null],
          rua:[null, Validators.required],
          bairro: [null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required]
        }),
        cargo: [null],
        tecnologias: [null],
        newsletter: ['s'],
        termos: [null, Validators.pattern('true')],
        frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
        : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {} );
  }

  buildFrameworks(){

    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

    //  this.formBuilder.array([
    //    new FormControl(false), angular
    //    new FormControl(false), react
    //    new FormControl(false), vue
    //    new FormControl(false)  sencha
    //  ]);
  }

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null)
      .filter(v => v !== null)
    });

    console.log(valueSubmit);

    this.http
    .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
    .subscribe(
      dados => {
        console.log(dados);
      // reseta o form
      // this.formulario.reset();
      // this.resetar();
      },
      (error: any) => alert('erro')
    );
  }


  consultaCEP(){
    const cep = this.formulario.get('endereco.cep').value;

      if (cep != "null" && cep !== '') {
       this.cepService.consultaCEP(cep)
       .subscribe(dados => this.populaDadosForm(dados));
     }
  }

  populaDadosForm(dados){
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
     });
    //  console.log(form);
  }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarCargo(){
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? ( obj1.nome === obj2.nome && obj1.nivel === obj2.nivel ) : obj1 === obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(['angular', 'react', 'javascript'])
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true} : null));
  }



}
