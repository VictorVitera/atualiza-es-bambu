import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  fullName: string = '';
  phone: string = '';
  cpf: string = '';
  company: string = '';
  cauregistro: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  notificationPreferences: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  handleRegister() {
    console.log('Iniciando validação...');

    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (!this.isValidCPF(this.cpf)) {
      alert('CPF inválido');
      return;
    }

    if (!this.isValidPhone(this.phone)) {
      alert('Telefone inválido');
      return;
    }

    console.log('Validações concluídas com sucesso!');
    this.router.navigate(['/login']);
  }

  // Função para formatar CPF
  formatCPF(event: any) {
    let cpf = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    console.log('Formatando CPF:', cpf);

    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11); // Limita o CPF a 11 dígitos
    }

    // Formatação
    if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
    if (cpf.length > 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    if (cpf.length > 9) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

    this.cpf = cpf.trim(); // Atualiza o modelo sem espaços em branco
    event.target.value = this.cpf; // Atualiza o valor no campo de entrada
    console.log('CPF formatado:', this.cpf);
  }

  // Função para validar CPF
  isValidCPF(cpf: string): boolean {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos e não é uma sequência repetida
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      console.log('CPF inválido por comprimento ou sequência repetida');
      return false;
    }

    let sum = 0;
    let rest: number;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;

    if (rest !== parseInt(cpf.substring(9, 10))) {
      console.log('Primeiro dígito verificador inválido');
      return false;
    }

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;

    if (rest !== parseInt(cpf.substring(10, 11))) {
      console.log('Segundo dígito verificador inválido');
      return false;
    }

    console.log('CPF é válido:', cpf);
    return true;
  }

  // Função para formatar Telefone
  formatPhone(event: any) {
    let phone = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    console.log('Formatando telefone:', phone);

    if (phone.length > 15) {
      phone = phone.substring(0, 15); // Limita o telefone a 15 caracteres
    }

    // Formatação
    if (phone.length > 0) phone = phone.replace(/^(\d{2})(\d)/, '($1) $2');
    if (phone.length > 6) phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
    this.phone = phone; // Atualiza o modelo
    event.target.value = phone; // Atualiza o valor no campo de entrada
    console.log('Telefone formatado:', this.phone);
  }

  // Função para validar telefone
  isValidPhone(phone: string): boolean {
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato (xx) xxxxx-xxxx
    const isValid = phonePattern.test(phone);
    console.log('Telefone válido:', isValid);
    return isValid;
  }
}
