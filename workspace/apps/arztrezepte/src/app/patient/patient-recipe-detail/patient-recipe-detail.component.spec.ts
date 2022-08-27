import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecipeDetailComponent } from './patient-recipe-detail.component';

describe('PatientRecipeDetailComponent', () => {
  let component: PatientRecipeDetailComponent;
  let fixture: ComponentFixture<PatientRecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientRecipeDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
