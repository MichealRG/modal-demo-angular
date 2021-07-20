import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTemplatesComponent } from './navigation-templates.component';

describe('NavigationTemplatesComponent', () => {
  let component: NavigationTemplatesComponent;
  let fixture: ComponentFixture<NavigationTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
