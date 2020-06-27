import { FlashCard } from './flash-card.model';

export class SpacedRepetition {
    public prevLevel: number;
    constructor(
        public flashCard: FlashCard,
    ) {}
} 