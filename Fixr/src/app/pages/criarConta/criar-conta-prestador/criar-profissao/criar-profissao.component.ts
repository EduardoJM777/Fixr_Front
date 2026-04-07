import {  Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-profissao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './criar-profissao.component.html',
  styleUrl: './criar-profissao.component.css'
})
export class CriarProfissaoComponent {

  constructor(private router: Router, private http: HttpClient){}

  desc: string="desc";
  nomeProf: string="nomeProf";



}
