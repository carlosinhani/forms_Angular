import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EstadoBr } from '../models/estado-br';
import { Cidade } from '../models/cidades';

import { map } from 'rxjs/operators';


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

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map ((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );
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
      { nome: 'html', desc: 'HTML'},
      { nome: 'php', desc: 'PHP'},
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
