import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcercaComponent } from './edit-acerca.component';

describe('EditAcercaComponent', () => {
  let component: EditAcercaComponent;
  let fixture: ComponentFixture<EditAcercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAcercaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAcercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
