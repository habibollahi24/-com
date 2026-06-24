import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayEmailComponent } from './replay-email.component';

describe('ReplayEmailComponent', () => {
  let component: ReplayEmailComponent;
  let fixture: ComponentFixture<ReplayEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplayEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplayEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
