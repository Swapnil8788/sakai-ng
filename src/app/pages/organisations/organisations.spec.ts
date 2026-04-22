import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Organisations } from './organisations';

describe('Organisations', () => {
  let component: Organisations;
  let fixture: ComponentFixture<Organisations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Organisations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Organisations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
