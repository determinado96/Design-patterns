// === Interfaces de produtos ===
interface Button {
  render(): void;
  click(): void;
}

interface TextBox {
  render(): void;
  setText(text: string): void;
}

interface Slider {
  render(): void;
  setValue(value: number): void;
}

// === Fábrica abstrata (cria vários produtos) ===
interface UIFactory {
  createButton(): Button;
  createTextBox(): TextBox;
  createSlider(): Slider;
}

// === Produtos concretos – Light Theme ===
class LightButton implements Button {
  constructor(private color = "white", private size = "medium") {}
  render() { console.log(`Light Button - Cor: ${this.color}, Tamanho: ${this.size}`); }
  click() { console.log("Botão claro clicado"); }
}

class LightTextBox implements TextBox {
  private text = "";
  constructor(private color = "white", private width = 200) {}
  render() { console.log(`Light TextBox - Cor: ${this.color}, Largura: ${this.width}px`); }
  setText(text: string) { this.text = text; console.log(`Texto atualizado: ${this.text}`); }
}

class LightSlider implements Slider {
  private value = 0;
  constructor(private color = "lightgray", private max = 100) {}
  render() { console.log(`Light Slider - Cor: ${this.color}, Max: ${this.max}`); }
  setValue(value: number) { this.value = value; console.log(`Valor do slider: ${this.value}`); }
}

// === Produtos concretos – Dark Theme ===
class DarkButton implements Button {
  constructor(private color = "black", private size = "medium") {}
  render() { console.log(`Dark Button - Cor: ${this.color}, Tamanho: ${this.size}`); }
  click() { console.log("Botão escuro clicado"); }
}

class DarkTextBox implements TextBox {
  private text = "";
  constructor(private color = "black", private width = 200) {}
  render() { console.log(`Dark TextBox - Cor: ${this.color}, Largura: ${this.width}px`); }
  setText(text: string) { this.text = text; console.log(`Texto atualizado: ${this.text}`); }
}

class DarkSlider implements Slider {
  private value = 0;
  constructor(private color = "darkgray", private max = 100) {}
  render() { console.log(`Dark Slider - Cor: ${this.color}, Max: ${this.max}`); }
  setValue(value: number) { this.value = value; console.log(`Valor do slider: ${this.value}`); }
}

// === Fábricas concretas ===
class LightThemeFactory implements UIFactory {
  createButton(): Button { return new LightButton(); }
  createTextBox(): TextBox { return new LightTextBox(); }
  createSlider(): Slider { return new LightSlider(); }
}

class DarkThemeFactory implements UIFactory {
  createButton(): Button { return new DarkButton(); }
  createTextBox(): TextBox { return new DarkTextBox(); }
  createSlider(): Slider { return new DarkSlider(); }
}

// === Cliente ===
function renderUI(factory: UIFactory) {
  const button = factory.createButton();
  const textBox = factory.createTextBox();
  const slider = factory.createSlider();

  button.render();
  button.click();

  textBox.render();
  textBox.setText("Olá mundo");

  slider.render();
  slider.setValue(75);
}

// === Uso ===
const theme: "light" | "dark" = "dark";
const factory = theme === "light" ? new LightThemeFactory() : new DarkThemeFactory();

renderUI(factory);