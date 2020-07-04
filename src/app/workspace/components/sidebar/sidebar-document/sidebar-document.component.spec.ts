import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDocumentComponent } from './sidebar-document.component';

describe('SidebarDocumentComponent', () => {
  let component: SidebarDocumentComponent;
  let fixture: ComponentFixture<SidebarDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
