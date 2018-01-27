"use strict";

/**
 * Berechne die Länge von Seite a
 *
 * @param b int Länge von Seite b
 * @param c int Länge von Seite c
 * @returns int Länge von Seite a
 */
let laengeA = (b, c) => {
  // die länge von a erhalten wir, wenn wir die Wurzel aus c^2 - b^ ziehen.
  return Math.sqrt(c * c - b * b);
};

/**
 * Berechne die Länge von Seite b
 *
 * @param a int Länge von Seite a
 * @param c int Länge von Seite c
 * @returns int Länge von Seite b
 */
let groesseVonB = function (a, c) {
  // die länge von a erhalten wir, wenn wir die Wurzel aus c^2 - b^ ziehen.
  return Math.sqrt(c * c - a * a);
};


window.Pythagoras = {
  getA: laengeA,
  getB: groesseVonB,

  /**
   * Berechne die Länge von Seite c
   *
   * @param a int Länge von Seite a
   * @param b int Länge von Seite b
   * @returns int Länge von Seite c
   */
  getC: (a, b) => Math.sqrt(a * a + b * b)
};
