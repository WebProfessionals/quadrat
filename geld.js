class Geld {

  constructor(initialWert, options) {
    options = options || {};
    this.waehrung = options.waehrung || 'Franken';
    this.kommastelle = options.kommastelle || 2;
    this.waehrungskuerzel = options.waehrungskuerzel || 'CHF';
    this.value = initialWert || 0;
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.waehrungskuerzel + ' ' + this.runden();
  }

  /**
   * Zieht vom Geldbetrag den Wert von wert ab
   * @param wert Number oder Geld
   * @returns {geld}
   */
  subtrahieren(wert) {
    this.value -= wert;
    return this;
  }

  /**
   * Addiert zum Geldbetrag den Wert von wert dazu
   * @param wert
   * @returns {geld}
   */
  addieren(wert) {
    this.value += wert;
    return this;
  }

  /**
   * Runden auf den 5er
   */
  runden() {
    return Math.round(this.value * 20) / 20;
  }
}


let spesen = new Geld();

let lohn = new Geld(13.99, {waehrung:'MonopolyFranken'});


console.log(spesen);
console.log('müsste 13.6 geben ', spesen.runden());


console.log('müsste 14 geben ', lohn.runden());

console.log(spesen);