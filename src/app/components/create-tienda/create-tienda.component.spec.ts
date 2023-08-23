import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTiendaComponent } from './create-tienda.component';

describe('CreateTiendaComponent', () => {
  let component: CreateTiendaComponent;
  let fixture: ComponentFixture<CreateTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTiendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
