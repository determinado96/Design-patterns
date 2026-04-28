// Implementação: como eu faço isso (TVs)
class TV {
  ligar() {}
}

class SamsungTV extends TV {
  ligar() {
    console.log("Ligando TV Samsung");
  }
}

class LgTV extends TV {
  ligar() {
    console.log("Ligando TV LG");
  }
}

// Abstração: o que eu quero fazer (controle remoto)
class ControleRemoto {
  constructor(tv) {
    // Composição: o controle remoto tem uma TV
    this.tv = tv;
  }

  ligar() {
    this.tv.ligar();
  }
}

class ControleAvancado extends ControleRemoto {
  netflix() {
    console.log("Abrindo Netflix");
  }
}

const samsung = new SamsungTV();
const lg = new LgTV();

const controle1 = new ControleRemoto(samsung);
controle1.ligar(); 
// Ligando TV Samsung

const controle2 = new ControleAvancado(lg);
controle2.ligar(); 
// Ligando TV LG

controle2.netflix();
// Abrindo Netflix