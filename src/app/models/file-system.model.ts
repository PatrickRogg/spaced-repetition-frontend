export class FileSystem {
  constructor(public fileSystemElements: FileSystemElement[]) {}
}

export class FileSystemElement {
  constructor(public id: string, public name: string) {}
}

export class File extends FileSystemElement {
  public content: string;
  public flashCardIds: number[];

  constructor(public id: string, public name: string) {
    super(id, name);
    this.content = ``;
    this.flashCardIds = [];
  }
}

export class Folder extends FileSystemElement {
  constructor(
    public id: string,
    public name: string,
    public children: FileSystemElement[]
  ) {
    super(id, name);
    this.children = []
  }
}
