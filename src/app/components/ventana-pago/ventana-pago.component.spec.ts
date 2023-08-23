import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaPagoComponent } from './ventana-pago.component';

describe('VentanaPagoComponent', () => {
  let component: VentanaPagoComponent;
  let fixture: ComponentFixture<VentanaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
