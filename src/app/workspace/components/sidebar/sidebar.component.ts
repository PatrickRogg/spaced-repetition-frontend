import { Component, OnInit } from '@angular/core';
import { Folder, File } from 'src/app/models/file-system.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  topLevelFolder: Folder[] = [
    new Folder(`1`, `Cloud Computing`, [
      new File(`2`, `1. Vorlesgung`),
      new File(`3`, `2. Vorlesgung`),
      new File(`4`, `3. Vorlesgung`),
      new File(`5`, `4. Vorlesgung`),
    ]),
    new Folder(`1`, `ML`, [
      new Folder(`1`, `1. Vorlesgung`, [new File(`1`, `Second Level nesting`)]),
      new File(`1`, `2. Vorlesgung`),
      new File(`1`, `3. Vorlesgung`),
      new File(`1`, `4. Vorlesgung`),
    ]),
    new Folder(`1`, `Cloud Computing`, [
      new File(`1`, `1. Vorlesgung`),
      new File(`1`, `2. Vorlesgung`),
      new File(`1`, `3. Vorlesgung`),
      new File(`1`, `4. Vorlesgung`),
    ]),
    new Folder(`1`, `ML`, [
      new Folder(`1`, `1. Vorlesgung`, [new File(`1`, `Second Level nesting`)]),
      new File(`1`, `2. Vorlesgung`),
      new File(`1`, `3. Vorlesgung`),
      new File(`1`, `4. Vorlesgung`),
    ]),
    new Folder(`1`, `Cloud Computing`, [
      new File(`1`, `1. Vorlesgung`),
      new File(`1`, `2. Vorlesgung`),
      new File(`1`, `3. Vorlesgung`),
      new File(`1`, `4. Vorlesgung`),
    ]),
    new Folder(`1`, `ML`, [
      new Folder(`1`, `1. Vorlesgung`, [new File(`1`, `Second Level nesting`)]),
      new File(`1`, `2. Vorlesgung`),
      new File(`1`, `3. Vorlesgung`),
      new File(`1`, `4. Vorlesgung`),
    ]),
    new Folder(`1`, `Cloud Computing`, [
      new File(`1`, `1. Vorlesgung`),
      new File(`1`, `2. Vorlesgung`),
      new File(`1`, `3. Vorlesgung`),
      new File(`1`, `4. Vorlesgung`),
    ]),
    new Folder(`1`, `ML`, [
      new Folder(`1`, `1. Vorlesgung`, [new File(`1`, `Second Level nesting`)]),
      new File(`1`, `2. Vorlesgung`),
      new File(`1`, `3. Vorlesgung`),
      new File(`1`, `4. Vorlesgung`),
    ]),
  ];

  constructor() {}

  ngOnInit(): void {}
}
