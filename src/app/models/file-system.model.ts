export class FileSystemElement {
    constructor() {
    }
}

export class File extends FileSystemElement {
    constructor(
        public id: string,
        public name: string,
    ) {
        super();
    }
}

export class Folder extends FileSystemElement {
    constructor(
        public id: string,
        public name: string,
        public children: FileSystemElement[],
    ) {
        super();
    }
}