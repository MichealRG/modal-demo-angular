import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCompererComponent } from './template-comperer.component';

describe('TemplateCompererComponent', () => {
  let component: TemplateCompererComponent;
  let fixture: ComponentFixture<TemplateCompererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateCompererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCompererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
