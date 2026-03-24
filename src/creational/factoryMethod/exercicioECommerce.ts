// 1. O Produto declara a interface, que é comum a todos os objetos que podem ser produzidos pelo criador e suas subclasses.
interface Payment {
  processPayment(): void;
  generateReceipt(): void;
}

// 2. Produtos Concretos são implementações diferentes da interface do produto.
class CartaoDeCredito implements Payment {
  private parcelas: number;
  private limite: number;

  constructor(parcelas: number = 1, limite: number = 5000) {
    this.parcelas = parcelas;
    this.limite = limite;
  }

  processPayment() {
    if (!this.validateCard()) {
      throw new Error('Cartão inválido ou limite insuficiente.');
    }
    const juros = this.calculateInterest();
    console.log(
      `Pagamento processado no Cartão de Crédito em ${this.parcelas}x. Juros aplicados: R$${juros.toFixed(2)}.`,
    );
  }

  private validateCard(): boolean {
    return this.limite > 0;
  }

  private calculateInterest(): number {
    return this.parcelas > 1 ? this.parcelas * 2.5 : 0;
  }

  generateReceipt() {
    console.log(
      `Recibo Cartão: ${this.parcelas} parcelas. Total com juros: R$${(100 + this.calculateInterest()).toFixed(2)}`,
    );
  }
}

class Pix implements Payment {
  private chavePix: string;

  constructor(chavePix: string = '123e4567-e89b-12d3-a456-426614174000') {
    this.chavePix = chavePix;
  }

  processPayment() {
    if (!this.validatePix()) {
      throw new Error('Chave Pix inválida.');
    }
    console.log(
      `Transferência PIX realizada com sucesso para a chave ${this.chavePix}.`,
    );
  }

  private validatePix(): boolean {
    // Validação simplificada
    return this.chavePix.length > 0;
  }

  generateReceipt() {
    console.log(
      `Recibo PIX gerado. Chave: ${this.chavePix}, Timestamp: ${new Date().toISOString()}`,
    );
  }
}

class BoletoBancario implements Payment {
  private dataVencimento: Date;

  constructor(
    dataVencimento: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ) {
    this.dataVencimento = dataVencimento;
  }

  processPayment() {
    if (!this.validateDueDate()) {
      throw new Error('Boleto com data de vencimento inválida.');
    }
    console.log(
      `Boleto registrado no banco. Vencimento: ${this.dataVencimento.toLocaleDateString()}`,
    );
  }

  private validateDueDate(): boolean {
    return this.dataVencimento > new Date();
  }

  generateReceipt() {
    console.log(
      `Recibo Boleto gerado. Linha digitável: 00190.00009 12345.678901 23456.789012 1 12340000010000`,
    );
  }
}

class CarteiraDigital implements Payment {
  private provider: string;

  constructor(provider: string = 'Google Pay') {
    this.provider = provider;
  }

  processPayment() {
    if (!this.authenticate()) {
      throw new Error('Falha na autenticação da carteira digital.');
    }
    console.log(
      `Pagamento processado via Carteira Digital (${this.provider}).`,
    );
  }

  private authenticate(): boolean {
    // Simula autenticação
    return true;
  }

  generateReceipt() {
    console.log(
      `Recibo gerado para Carteira Digital (${this.provider}). ID da transação: ${Math.floor(Math.random() * 1000000)}`,
    );
  }
}

// 3. A classe Criador declara o método fábrica que retorna novos objetos produto.
abstract class PaymentFactory {
  protected payment: Payment;

  constructor() {
    this.payment = this.createPayment();
  }

  protected abstract createPayment(): Payment;

  processPayment() {
    // polimorfismo por sobrescrita (o método que será executado é decidido em tempo de execução, baseado no objeto real).
    this.payment.processPayment();
  }

  generateReceipt() {
    // polimorfismo por sobrescrita (o método que será executado é decidido em tempo de execução, baseado no objeto real).
    this.payment.generateReceipt();
  }
}

// 4. Criadores Concretos sobrescrevem o método fábrica base para retornar um tipo diferente de produto.
class CartaoDeCreditoFactory extends PaymentFactory {
  constructor(
    private parcelas: number = 1,
    private limite: number = 5000,
  ) {
    super();
  }

  protected createPayment(): Payment {
    return new CartaoDeCredito(this.parcelas, this.limite);
  }
}

class PixFactory extends PaymentFactory {
  constructor(
    private chavePix: string = '123e4567-e89b-12d3-a456-426614174000',
  ) {
    super();
  }

  protected createPayment(): Payment {
    return new Pix(this.chavePix);
  }
}

class BoletoBancarioFactory extends PaymentFactory {
  constructor(
    private dataVencimento: Date = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ),
  ) {
    super();
  }

  protected createPayment(): Payment {
    return new BoletoBancario(this.dataVencimento);
  }
}

class CarteiraDigitalFactory extends PaymentFactory {
  constructor(private provider: string = 'Google Pay') {
    super();
  }

  protected createPayment(): Payment {
    return new CarteiraDigital(this.provider);
  }
}

// 4. Orquestrador
class PaymentFactoryProducer {
  private static factories: Record<string, PaymentFactory> = {
    credit_card: new CartaoDeCreditoFactory(),
    pix: new PixFactory(),
    boleto: new BoletoBancarioFactory(),
    wallet: new CarteiraDigitalFactory(),
  };

  static createFactory(type: string): PaymentFactory {
    const factory = this.factories[type];
    if (!factory) throw new Error(`Tipo de pagamento "${type}" inválido.`);
    return factory;
  }

  static registerFactory(type: string, factory: PaymentFactory) {
    this.factories[type] = factory;
  }
}

const cartao = PaymentFactoryProducer.createFactory('credit_card');
cartao.processPayment();
cartao.generateReceipt();

const pix = PaymentFactoryProducer.createFactory('pix');
pix.processPayment();
pix.generateReceipt();

const boleto = PaymentFactoryProducer.createFactory('boleto');
boleto.processPayment();
boleto.generateReceipt();

const carteira = PaymentFactoryProducer.createFactory('wallet');
carteira.processPayment();
carteira.generateReceipt();
