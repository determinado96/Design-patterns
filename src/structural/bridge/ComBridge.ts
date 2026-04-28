// Implementação: como eu faço isso (TVs)
abstract class TV {
  abstract ligar(): void;
}

class SamsungTV extends TV {
  override ligar(): void {
    console.log("Ligando TV Samsung");
  }
}

class LgTV extends TV {
  override ligar(): void {
    console.log("Ligando TV LG");
  }
}

// Abstração: o que eu quero fazer (controle remoto)
class ControleRemoto {
  protected tv: TV;

  constructor(tv: TV) {
    // Composição: o controle remoto tem uma TV
    this.tv = tv;
  }

  ligar(): void {
    this.tv.ligar();
  }
}

class ControleAvancado extends ControleRemoto {
  netflix(): void {
    console.log("Abrindo Netflix");
  }
}

const samsung: TV = new SamsungTV();
const lg: TV = new LgTV();

const controle1 = new ControleRemoto(samsung);
controle1.ligar();
// Ligando TV Samsung

const controle2 = new ControleAvancado(lg);
controle2.ligar();
// Ligando TV LG

controle2.netflix();
// Abrindo Netflix