import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iraildemo2Component } from './iraildemo2.component';

describe('Iraildemo2Component', () => {
  let component: Iraildemo2Component;
  let fixture: ComponentFixture<Iraildemo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iraildemo2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Iraildemo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
