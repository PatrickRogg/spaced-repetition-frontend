export class CreateFlashCardRequest {
  constructor(
    public question: string,
    public answer: string,
    public topicId: number
  ) {}
}
