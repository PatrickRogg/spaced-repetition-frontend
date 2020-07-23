export class FlashCard {
  public id: number;
  public flashCardDeckId: number;
  public question: string;
  public level: number;
  public lastWrongAnswer: Date;
  public nextRepetition: Date;
  public createdOn: Date;
  public answer: string;

  constructor() {}

  public static createFLashCardWith(): FlashCard {
    return new FlashCard();
  }
}

export class SpacedRepetitionFlashCard extends FlashCard {
  public topicName: string;
  public flashCardDeckName: string;
}

export class FlashCardBuilder {
  private flashCard: FlashCard;

  constructor() {
    this.flashCard = new FlashCard();
  }

  public id(id: number): FlashCardBuilder {
    this.flashCard.id = id;
    return this;
  }

  public flashCardDeckId(flashCardDeckId: number): FlashCardBuilder {
    this.flashCard.flashCardDeckId = flashCardDeckId;
    return this;
  }

  public question(question: string): FlashCardBuilder {
    this.flashCard.question = question;
    return this;
  }

  public answer(answer: string): FlashCardBuilder {
    this.flashCard.answer = answer;
    return this;
  }

  public level(level: number): FlashCardBuilder {
    this.flashCard.level = level;
    return this;
  }

  public lastWrongAnswer(lastWrongAnswer: Date): FlashCardBuilder {
    this.flashCard.lastWrongAnswer = lastWrongAnswer;
    return this;
  }

  public nextRepetition(nextRepetition: Date): FlashCardBuilder {
    this.flashCard.nextRepetition = nextRepetition;
    return this;
  }

  public createdOn(createdOn: Date): FlashCardBuilder {
    this.flashCard.createdOn = createdOn;
    return this;
  }

  public reset(): void {
    this.flashCard = new FlashCard();
  }

  public build(): FlashCard {
    const res = this.flashCard;
    this.reset();
    return res;
  }
}
