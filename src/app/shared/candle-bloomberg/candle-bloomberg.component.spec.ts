import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleBloombergComponent } from './candle-bloomberg.component';

describe('CandleBloombergComponent', () => {
  let component: CandleBloombergComponent;
  let fixture: ComponentFixture<CandleBloombergComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandleBloombergComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandleBloombergComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
