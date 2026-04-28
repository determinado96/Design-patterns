interface TVControle {
  ligar(): void;
}

class ControleSamsung implements TVControle {
  ligar(): void {
    console.log("Ligando TV Samsung");
  }
}

class ControleLg implements TVControle {
  ligar(): void {
    console.log("Ligando TV LG");
  }
}

class ControleAvancadoSamsung implements TVControle {
  ligar(): void {
    console.log("Ligando TV Samsung");
  }

  netflix(): void {
    console.log("Abrindo Netflix na Samsung");
  }
}

class ControleAvancadoLg implements TVControle {
  ligar(): void {
    console.log("Ligando TV LG");
  }

  netflix(): void {
    console.log("Abrindo Netflix na LG");
  }
}
