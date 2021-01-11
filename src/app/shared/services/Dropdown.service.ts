import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EstadoBr } from '../models/estado-br';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

constructor(
  private http: HttpClient
) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCargos(){
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ];
  }

  getTecnologias(){
    return [
      { nome: 'angular', desc: 'Angular'},
      { nome: 'react', desc: 'React'},
      { nome: 'javascript', desc: 'JavaScript'},
      { nome: 'java', desc: 'Java'},
    ];
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não'},
    ];
  }
}
