import { Component, OnInit, Input } from '@angular/core';
import { SpacedRepetition } from 'src/app/shared/models/spaced-repetition.model';

@Component({
  selector: 'app-spaced-repetition-stats-detail',
  templateUrl: './spaced-repetition-stats-detail.component.html',
  styleUrls: ['./spaced-repetition-stats-detail.component.scss'],
})
export class SpacedRepetitionStatsDetailComponent implements OnInit {
  @Input() flashCardRepetitions: SpacedRepetition[];

  constructor() {}

  ngOnInit(): void {}
}
