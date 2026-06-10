// Arquivo e pasta têm o mesmo contrato.
interface Component {
  open(): void;
}

class File implements Component {
  constructor(private name: string) { }

  open(): void {
    console.log(`Abrindo arquivo ${this.name}`);
    
  }
}

class Folder implements Component {
  private children: Component[] = [];

  constructor(private name: string) { }

  add(item: Component) {
    this.children.push(item);
  }

  open(): void {
    console.log(`Abrindo pasta ${this.name}`);

    for (const child of this.children) {
      child.open();
    }
  }
}

// Podemos aninhar infinitamente pastas e arquivos, e o cliente pode tratá-los da mesma forma.
const file1 = new File("a.txt");
const file2 = new File("b.txt");

const folder = new Folder("docs");
folder.add(file1);
folder.add(file2);

const root = new Folder("root");
root.add(folder);

root.open();