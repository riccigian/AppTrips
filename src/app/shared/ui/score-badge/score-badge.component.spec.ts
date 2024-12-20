import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TripScoreBadgeComponent } from '.';

describe('TripScoreBadgeComponent', () => {
  let comp: TripScoreBadgeComponent;
  let fixture: ComponentFixture<TripScoreBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TripScoreBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripScoreBadgeComponent);
    comp = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  it('should have the average tier', () => {
    comp.rating = 5;
    comp.co2 = 2;
    comp.nrOfRatings = 5;
    const changes: SimpleChanges = {
      rating: new SimpleChange(null, comp.rating, false),
      co2: new SimpleChange(null, comp.co2, false),
      nrOfRatings: new SimpleChange(null, comp.nrOfRatings, false),
    };
    comp.ngOnChanges(changes);
    expect(comp.tier).toBe('average');
  });

  it('should have the good tier', () => {
    comp.rating = 15;
    comp.co2 = 2;
    comp.nrOfRatings = 5;
    const changes: SimpleChanges = {
      rating: new SimpleChange(null, comp.rating, false),
      co2: new SimpleChange(null, comp.co2, false),
      nrOfRatings: new SimpleChange(null, comp.nrOfRatings, false),
    };
    comp.ngOnChanges(changes);
    expect(comp.tier).toBe('good');
  });

  it('should have the awesome tier', () => {
    comp.rating = 50;
    comp.co2 = 2;
    comp.nrOfRatings = 5;
    const changes: SimpleChanges = {
      rating: new SimpleChange(null, comp.rating, false),
      co2: new SimpleChange(null, comp.co2, false),
      nrOfRatings: new SimpleChange(null, comp.nrOfRatings, false),
    };
    comp.ngOnChanges(changes);
    expect(comp.tier).toBe('awesome');
  });

  it('should warn when number of ratings is zero', () => {
    jest.spyOn(console, 'warn');
    comp.rating = 5;
    comp.co2 = 2;
    comp.nrOfRatings = 0;
    const changes: SimpleChanges = {
      rating: new SimpleChange(null, comp.rating, false),
      co2: new SimpleChange(null, comp.co2, false),
      nrOfRatings: new SimpleChange(null, comp.nrOfRatings, false),
    };
    comp.ngOnChanges(changes);
    expect(console.warn).toHaveBeenCalledWith(
      'Number of ratings is zero, returning score as 0'
    );
    expect(comp.tier).toBe('average');
  });
});
