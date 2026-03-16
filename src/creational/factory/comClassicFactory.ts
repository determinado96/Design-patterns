// === Produto: define a interface para notificações (cria um único produto) ===
interface Notification {
  send(message: string): void;
}

// === Produtos concretos: implementam a interface Notification ===
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

// === Fábrica abstrata: define o "Factory Method" ===
abstract class NotificationFactory {
  // Factory Method: subclasses decidem qual produto concreto instanciar
  abstract createNotification(): Notification;

  // Método utilitário que utiliza o produto criado
  send(message: string) {
    const notification = this.createNotification(); // cria o produto
    notification.send(message); // usa o produto
  }
}

// === Fábricas concretas: implementam o Factory Method ===
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

// === Cliente: utiliza a fábrica abstrata sem conhecer a implementação concreta ===
const factory = new EmailNotificationFactory(); // trocando a fábrica, muda o tipo de notificação
factory.send('Hello!');