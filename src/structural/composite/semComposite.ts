class File {
  constructor(public name: string) { }

  open() {
    console.log(`Abrindo arquivo ${this.name}`);
  }
}

class Folder {
  constructor(
    public name: string,
    public items: any[],
  ) { }

  open() {
    console.log(`Abrindo pasta ${this.name}`);

    // Necessidade de verificar o tipo de cada item para abrir corretamente
    for (const item of this.items) {
      if (item instanceof File) {
        item.open();
      } else if (item instanceof Folder) {
        item.open();
      }
    }
  }
}

// uso
const file1 = new File('a.txt');
const file2 = new File('b.txt');

const folder = new Folder('docs', [file1, file2]);
folder.open();
