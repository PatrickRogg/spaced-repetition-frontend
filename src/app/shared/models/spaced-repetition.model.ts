import { FlashCard } from 'src/app/shared/models/flash-card.model';

export class SpacedRepetition {
  public prevLevel: number;
  constructor(public flashCard: FlashCard) {}
}
