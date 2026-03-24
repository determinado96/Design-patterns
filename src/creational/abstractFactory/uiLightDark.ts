// 1. Produtos Abstratos declaram interfaces para um conjunto de produtos distintos mas relacionados que fazem parte de uma família de produtos.
interface IButton {
  render(): void;
  click(): void;
}

interface ITextBox {
  render(): void;
  setText(text: string): void;
}

interface ISlider {
  render(): void;
  setValue(value: number): void;
}

// 2. Produtos Concretos são várias implementações de produtos abstratos, agrupados por variantes.
class LightButton implements IButton {
  constructor(
    private color = 'white',
    private size = 'medium',
  ) {}
  render() {
    console.log(`Light IButton - Cor: ${this.color}, Tamanho: ${this.size}`);
  }
  click() {
    console.log('Botão claro clicado');
  }
}

class LightTextBox implements ITextBox {
  private text = '';
  constructor(
    private color = 'white',
    private width = 200,
  ) {}
  render() {
    console.log(
      `Light ITextBox - Cor: ${this.color}, Largura: ${this.width}px`,
    );
  }
  setText(text: string) {
    this.text = text;
    console.log(`Texto atualizado: ${this.text}`);
  }
}

class LightSlider implements ISlider {
  private value = 0;
  constructor(
    private color = 'lightgray',
    private max = 100,
  ) {}
  render() {
    console.log(`Light ISlider - Cor: ${this.color}, Max: ${this.max}`);
  }
  setValue(value: number) {
    this.value = value;
    console.log(`Valor do slider: ${this.value}`);
  }
}

class DarkButton implements IButton {
  constructor(
    private color = 'black',
    private size = 'medium',
  ) {}
  render() {
    console.log(`Dark IButton - Cor: ${this.color}, Tamanho: ${this.size}`);
  }
  click() {
    console.log('Botão escuro clicado');
  }
}

class DarkTextBox implements ITextBox {
  private text = '';
  constructor(
    private color = 'black',
    private width = 200,
  ) {}
  render() {
    console.log(`Dark ITextBox - Cor: ${this.color}, Largura: ${this.width}px`);
  }
  setText(text: string) {
    this.text = text;
    console.log(`Texto atualizado: ${this.text}`);
  }
}

class DarkSlider implements ISlider {
  private value = 0;
  constructor(
    private color = 'darkgray',
    private max = 100,
  ) {}
  render() {
    console.log(`Dark ISlider - Cor: ${this.color}, Max: ${this.max}`);
  }
  setValue(value: number) {
    this.value = value;
    console.log(`Valor do slider: ${this.value}`);
  }
}

// 3. A interface Fábrica Abstrata declara um conjunto de métodos para criação de cada um dos produtos abstratos.
interface IUIFactory {
  createButton(): IButton;
  createTextBox(): ITextBox;
  createSlider(): ISlider;
}

// 4. Fábricas Concretas implementam métodos de criação fábrica abstratos. Cada fábrica concreta corresponde a uma variante específica de produtos e cria apenas aquelas variantes de produto.
class LightThemeFactory implements IUIFactory {
  createButton(): IButton {
    return new LightButton();
  }
  createTextBox(): ITextBox {
    return new LightTextBox();
  }
  createSlider(): ISlider {
    return new LightSlider();
  }
}

class DarkThemeFactory implements IUIFactory {
  createButton(): IButton {
    return new DarkButton();
  }
  createTextBox(): ITextBox {
    return new DarkTextBox();
  }
  createSlider(): ISlider {
    return new DarkSlider();
  }
}

function renderUI(factory: IUIFactory) {
  const button = factory.createButton();
  const textBox = factory.createTextBox();
  const slider = factory.createSlider();

  button.render();
  button.click();

  textBox.render();
  textBox.setText('Olá mundo');

  slider.render();
  slider.setValue(75);
}

// === Uso ===
const theme: 'light' | 'dark' = 'dark';
const factory =
  theme === 'light' ? new LightThemeFactory() : new DarkThemeFactory();

renderUI(factory);
