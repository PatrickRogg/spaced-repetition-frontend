import { SuperMemoItem } from 'supermemo';

export class FlashCard implements SuperMemoItem {
  public id: number;
  public flashCardDeckId: number;
  public question: string;
  public nextRepetition: any;
  public createdOn: Date;
  public answer: string;
  public interval: number;
  public repetition: number;
  public efactor: number;

  constructor() {}

  public static createFLashCardWith(): FlashCard {
    return new FlashCard();
  }
}

export class SpacedRepetitionFlashCard extends FlashCard {
  public topicName: string;
  public flashCardDeckName: string;
}