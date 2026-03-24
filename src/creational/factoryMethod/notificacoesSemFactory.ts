class EmailNotification {
  send(message: string) {
    console.log('Enviando EMAIL:', message);
  }
}

class SMSNotification {
  send(message: string) {
    console.log('Enviando SMS:', message);
  }
}

class NotificationService {
  send(type: string, message: string) {
    if (type === 'email') {
      const notification = new EmailNotification();
      notification.send(message);
    }

    if (type === 'sms') {
      const notification = new SMSNotification();
      notification.send(message);
    }
  }
}
