import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToolBarComponent } from './user-tool-bar.component';

describe('UserToolBarComponent', () => {
  let component: UserToolBarComponent;
  let fixture: ComponentFixture<UserToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserToolBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
