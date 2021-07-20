import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationSwitichingTemplatesComponent } from './pagination-switiching-templates.component';

describe('PaginationSwitichingTemplatesComponent', () => {
  let component: PaginationSwitichingTemplatesComponent;
  let fixture: ComponentFixture<PaginationSwitichingTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationSwitichingTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationSwitichingTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
