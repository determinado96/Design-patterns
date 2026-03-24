// 1. O Produto declara a interface, que é comum a todos os objetos que podem ser produzidos pelo criador e suas subclasses.
interface Notification {
  send(message: string): void;
}

// 2. Produtos Concretos são implementações diferentes da interface do produto.
class EmailNotification implements Notification {
  send(message: string): void {
    console.log('Sending EMAIL:', message);
  }
}

class SMSNotification implements Notification {
  send(message: string): void {
    console.log('Sending SMS:', message);
  }
}

// 3. A classe Criador declara o método fábrica que retorna novos objetos produto.
abstract class NotificationFactory {
  // Força as subclasses implementarem o método createNotification.
  abstract createNotification(): Notification;

  send(message: string) {
    const notification = this.createNotification();
    // polimorfismo por sobrescrita (o método que será executado é decidido em tempo de execução, baseado no objeto real).
    notification.send(message);
  }
}

// 4. Criadores Concretos sobrescrevem o método fábrica base para retornar um tipo diferente de produto.
// IMPORTANTE: no factory method precisamos especificar as fábricas concretas para trocar o produto.
class EmailNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new EmailNotification(); // cria produto específico
  }
}

class SMSNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new SMSNotification(); // cria produto específico
  }
}

// this -> EmailNotificationFactory (em tempo de execução)
const factory = new EmailNotificationFactory();
// procura send na subclasse -> não encontra -> acessa prototype -> encontra send na classe pai
factory.send('Hello!');
