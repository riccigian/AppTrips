import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'trip-score-badge',
  templateUrl: './score-badge.component.html',
  styleUrls: ['./score-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripScoreBadgeComponent implements OnChanges {
  @Input() rating: number;
  @Input() nrOfRatings: number;
  @Input() co2: number;

  public tier: string;

  private score: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating'] || changes['nrOfRatings'] || changes['co2']) {
      this.score = this.calculateScore(this.rating, this.co2, this.nrOfRatings);
      this.tier = this.determineTier(this.score);
    }
  }

  private calculateScore(
    rating: number,
    co2: number,
    nrOfRatings: number
  ): number {
    if (nrOfRatings === 0) {
      console.warn('Number of ratings is zero, returning score as 0');
      return 0;
    }
    return (rating * co2) / nrOfRatings;
  }

  private determineTier(score: number): string {
    if (score > 10) {
      return 'awesome';
    } else if (score > 5) {
      return 'good';
    } else {
      return 'average';
    }
  }
}
