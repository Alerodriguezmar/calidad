import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPhotosComponent } from './show-photos.component';

describe('ShowPhotosComponent', () => {
  let component: ShowPhotosComponent;
  let fixture: ComponentFixture<ShowPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
