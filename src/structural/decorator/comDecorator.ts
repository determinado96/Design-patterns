interface Coffee {
  getDescription(): string;
  getCost(): number;
}

class SimpleCoffee implements Coffee {
  getDescription(): string {
    return 'Café';
  }

  getCost(): number {
    return 5;
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  getDescription(): string {
    return this.coffee.getDescription();
  }

  getCost(): number {
    return this.coffee.getCost();
  }
}

class MilkDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.coffee.getDescription() + ', Leite';
  }

  getCost(): number {
    return this.coffee.getCost() + 2;
  }
}

class SugarDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.coffee.getDescription() + ', Açúcar';
  }

  getCost(): number {
    return this.coffee.getCost() + 1;
  }
}

// Uso

let coffee: Coffee = new SimpleCoffee();

coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.getDescription());
console.log(coffee.getCost());
