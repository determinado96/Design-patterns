interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string): void {
    console.log('Enviando EMAIL:', message);
  }
}

class SMSNotification implements Notification {
  send(message: string): void {
    console.log('Enviando SMS:', message);
  }
}

// Função fábrica responsável por criar o tipo correto de notificação
function createNotification(type: string): Notification {
  // Observação:
  // Poderia ser utilizado um objeto (map) para evitar vários if/else.

  if (type === 'email') {
    return new EmailNotification();
  }

  if (type === 'sms') {
    return new SMSNotification();
  }

  // Caso o tipo não exista, lança erro
  throw new Error('Tipo de notificação inválido');
}

// Cria uma notificação do tipo desejado
const notification = createNotification('email');

// Envia a mensagem
notification.send('Hello!');
