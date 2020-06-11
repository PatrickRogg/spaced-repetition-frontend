import { FlashCard } from './flash-card.model';
import { Topic } from './topic.model';

export class FlashCardDeck {
    public flashCards: FlashCard[];
    public id: number;
    public topics: Topic[];
    constructor(
        public name: string,
        public notes: string,
    ) {}
}