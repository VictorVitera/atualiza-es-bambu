import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Importação necessária para o ngModel
import { IonicModule } from '@ionic/angular'; // Importação do módulo Ionic
import { DadosClientePage } from './dados-cliente.page';

describe('DadosClientePage', () => {
  let component: DadosClientePage;
  let fixture: ComponentFixture<DadosClientePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadosClientePage],
      imports: [
        FormsModule, // Necessário para o ngModel
        IonicModule.forRoot() // Necessário para componentes do Ionic
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DadosClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Teste atualizado para verificar se o tipo de cliente é setado corretamente via select
  it('should update tipoCliente on select change', () => {
    const event = { target: { value: 'pessoaJuridica' } }; // Simula evento de mudança no select
    component.onTipoClienteChange(event); // Chama o método com o evento simulado
    expect(component.clienteData.tipoCliente).toEqual('pessoaJuridica'); // Verifica a mudança
  });
});
