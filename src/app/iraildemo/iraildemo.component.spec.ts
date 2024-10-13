import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IraildemoComponent } from './iraildemo.component';

describe('IraildemoComponent', () => {
  let component: IraildemoComponent;
  let fixture: ComponentFixture<IraildemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IraildemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IraildemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
