import { Topic } from './topic.model';

export class FlashCardDeckWithTopic {
  constructor(public name: string, public topics: Topic[]) {}
}
