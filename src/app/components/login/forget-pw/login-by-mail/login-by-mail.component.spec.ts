import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginByMailComponent } from './login-by-mail.component';

describe('LoginByMailComponent', () => {
  let component: LoginByMailComponent;
  let fixture: ComponentFixture<LoginByMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginByMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginByMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
