export class UpdateFlashCard {
    constructor(
        public question: string,
        public answer: string,
        public level: number,
        public lastWrongAnswer: Date,
    ) {}
}