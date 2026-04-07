interface PaymentProcessor {
  pay(amount: number): void;
}

// Serviço externo (legado)
// Nome diferente
// Unidade diferente
class LegacyPaymentService {
  makePayment(valueInCents: number): void {
    console.log(`Pagamento realizado: ${valueInCents} centavos`);
  }
}

class PaymentAdapter implements PaymentProcessor {
  private service: LegacyPaymentService;

  constructor(service: LegacyPaymentService) {
    this.service = service;
  }

  pay(amount: number): void {
    // adaptação de formato
    const valueInCents = amount * 100;
    // tradução de método
    this.service.makePayment(valueInCents);
  }
}

class Checkout {
  constructor(private processor: PaymentProcessor) {}

  finishPurchase(amount: number) {
    this.processor.pay(amount);
  }
}

const legacyService = new LegacyPaymentService();
const adapter = new PaymentAdapter(legacyService);

const checkout = new Checkout(adapter);

checkout.finishPurchase(50);
