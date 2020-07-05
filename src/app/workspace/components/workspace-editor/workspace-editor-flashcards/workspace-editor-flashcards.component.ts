import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashCard } from 'src/app/models/flash-card.model';

@Component({
  selector: 'app-workspace-editor-flashcards',
  templateUrl: './workspace-editor-flashcards.component.html',
  styleUrls: ['./workspace-editor-flashcards.component.scss'],
})
export class WorkspaceEditorFlashcardsComponent implements OnInit {
  @Input() flashCards: FlashCard[];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
}
