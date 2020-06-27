export class FlashCardDeckOverview {
    constructor(
        public id: number,
        public name: string,
        public totalFlashCards: number,
        public todoFlashCards: number,
    ) {}
}