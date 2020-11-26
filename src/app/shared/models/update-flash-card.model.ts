export class UpdateFlashCard {
  constructor(
    public question: string,
    public answer: string,
    public interval: number,
    public repetition: number,
    public efactor: number,
    public nextRepetition: string,
  ) {}
}
