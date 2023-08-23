import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMailComponent } from './request-mail.component';

describe('RequestMailComponent', () => {
  let component: RequestMailComponent;
  let fixture: ComponentFixture<RequestMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
