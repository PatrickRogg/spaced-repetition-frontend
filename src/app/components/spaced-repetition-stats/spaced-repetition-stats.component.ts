import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpacedRepetition } from 'src/app/shared/models/spaced-repetition.model';

@Component({
  selector: 'app-spaced-repetition-stats',
  templateUrl: './spaced-repetition-stats.component.html',
  styleUrls: ['./spaced-repetition-stats.component.scss'],
})
export class SpacedRepetitionStatsComponent implements OnInit {
  flashCardRepetitions: SpacedRepetition[] = [];

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.flashCardRepetitions = this.router.getCurrentNavigation().extras.state.flashCardRepetitions;
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {}

  public getPieChartData(): number[] {
    const data = [0, 0, 0];

    this.flashCardRepetitions.forEach((flashCardRepetition) => {
      if (flashCardRepetition.prevLevel) {
        if (
          flashCardRepetition.prevLevel < flashCardRepetition.flashCard.level
        ) {
          data[0]++;
        } else {
          data[1]++;
        }
      } else {
        data[2]++;
      }
    });

    return data;
  }
}
