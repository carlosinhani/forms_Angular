import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
     private formBuilder: FormBuilder,
     private http: HttpClient
     ) { }

  ngOnInit() {

    // this.formulario = new FormGroup({
    //    nome: new FormControl(null),
    //    email: new FormControl(null),
    // });

    this.formulario = this.formBuilder.group({
        nome: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]]
    });
  }
  onSubmit(){
    console.log(this.formulario);

    this.http.post('https://httpbin.org/post',
       JSON.stringify(this.formulario.value))
      .subscribe(dados => { console.log(dados);

        //reseta o form
        // this.formulario.reset();
        // this.resetar();
      },
      (error: any) => alert('erro'));
  }

  resetar(){
    this.formulario.reset();
  }

}
