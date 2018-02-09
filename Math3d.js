"use strict";

class M3d {

  /**
   * Negiere die Werte in einem Array
   * @param arr
   * @returns {Uint8Array | number[] | Int32Array | Uint16Array | Uint32Array | Float64Array }
   */
  static negateArray(arr) {
    return arr.map((e) => e * -1)

  };

  /**
   * Berechne die Rotation die nötig ist um alle Punkte auf der Z Achse auf die gleiche höhe zu bringen
   * @param points 3 Punkte um die Rotation zu errechnen
   * @returns {angle[x,y,z]} in rad
   */
  static getRotationToFlatZ(points) {
    // x axis (rot Z)
    let p1 = points[0].clone();
    let p2 = points[1].clone();
    let p3 = points[2].clone();
    let rotation = [0, 0, 0];

    // rotation Y rechnen
    rotation[1] = Math.atan((p1.z - p2.z) / (p1.x - p2.x));
    // rotieren um errechneten Wert
    p1.rotate(rotation);
    p2.rotate(rotation);
    p3.rotate(rotation);
    // rotation X rechnen
    rotation[0] = Math.atan((p1.z - p3.z) / -(p1.y - p3.y));

    return rotation;
  };

  /**
   * Kreisschnittpunkte mit Radius r von 2 Punkten aus
   * @param p1 {Point3D} Punkt 1
   * @param p2 {Point3D} Punkt 2
   * @param r  {Number} Radius
   * @returns {Point3D[i1,i2] | error}
   */
  static intersectionRadius(p1, p2, r) {
    let rotation = this.getRotationToFlatZ([p1, p2, p2]);
    if (r * 2 < p1.distance(p2)) {
      return new Error("radius to short");
    }
    let p1_ = p1.clone();
    let p2_ = p2.clone();
    p1_.rotate(rotation);
    p2_.rotate(rotation);

    let rotation_z = [0, 0, -Math.atan(Math.abs(p1_.y - p2_.y) / Math.abs(p1_.x - p2_.x))];
    p1_.rotate(rotation_z);
    p2_.rotate(rotation_z);
    const c = r;
    const a = p1_.distance(p2_) / 2;
    const b = Math.sqrt(c ** 2 - a ** 2);

    let t1 = p1_.midpoint(p2_).translate([b, 0, 0]);
    let t2 = p2_.midpoint(p2_).translate([-b, 0, 0]);

    t1.rotate(this.negateArray(rotation_z)).rotate(this.negateArray(rotation));
    t2.rotate(this.negateArray(rotation_z)).rotate(this.negateArray(rotation));
    return [t1, t2];

  }
}

/**
 * Dreieck und seine Punkte in 3d
 * https://de.wikipedia.org/wiki/Ausgezeichnete_Punkte_im_Dreieck
 */
class Triangle3D {
  constructor(PointA, PointB, PointC) {

    if (PointA instanceof Point3D) {
      this.A = PointA;
    }

    if (PointB instanceof Point3D) {
      this.B = PointB;
    }

    if (PointC instanceof Point3D) {
      this.C = PointC;
    }

  }

  get a() {
    return this.B.distance(this.C);
  }

  get Ma() {
    return this.B.midpoint(this.C);
  }

  get b() {
    return this.C.distance(this.A);
  }

  get Mb() {
    return this.C.midpoint(this.A);
  }

  get c() {
    return this.A.distance(this.B);
  }

  get Mc() {
    return this.A.midpoint(this.B);
  }

  get alpha() {
    return Math.acos((this.b ** 2 + this.c ** 2 - this.a ** 2) / (2 * this.b * this.c));
  }

  get beta() {
    return Math.acos((this.a ** 2 + this.c ** 2 - this.b ** 2) / (2 * this.a * this.c));
  }

  get gamma() {
    return Math.acos((this.a ** 2 + this.b ** 2 - this.c ** 2) / (2 * this.a * this.b));
  }

// radius von U zu einer beliebigen Ecke
  get rU() {
    return this.b / (2 * Math.sin(this.beta));
  }

  // lage des 3eck im Raum  A-B auf x=0 (A=0,0,0)
  get orientation() {
    let B_ = new Point3D([this.B.x - this.A.x, this.B.y - this.A.y, this.B.z - this.A.z]);
    let C_ = new Point3D([this.C.x - this.A.x, this.C.y - this.A.y, this.C.z - this.A.z]);
    let Mc_ = new Point3D([this.Mc.x - this.A.x, this.Mc.y - this.A.y, this.Mc.z - this.A.z]);

    let Rz = Math.atan2(B_.y, B_.x);
    C_.rotate([0, 0, -Rz]);
    Mc_.rotate([0, 0, -Rz]);
    let Ry = Math.atan2(Mc_.z, Mc_.x);
    C_.rotate([0, -Ry, 0]);
    let Rx = Math.atan2(C_.z, C_.y);
    return [Rx, Ry, Rz];

  }

  get orientationNegative() {
    return this.orientation.map((e) => e * -1)
  }

  get U() {
    let chalb = this.c / 2;
    let l = Math.sqrt((this.rU ** 2) - (chalb ** 2));
    let u_ = new Point3D([chalb, l, 0]);
    let C_ = new Point3D([this.B.x - this.A.x, this.B.y - this.A.y, this.B.z - this.A.z]);


    u_.rotate(this.orientation);
    u_.translate(this.A.coordinates());


    return u_;
  }

  get S() {
    return new Point3D([(this.A.x + this.B.x + this.C.x) / 3, (this.A.y + this.B.y + this.C.y) / 3, (this.A.z + this.B.z + this.C.z) / 3]);
  }

  rotate(angles, deg) {
    deg = deg || false;
    this.A.rotate(angles, deg);
    this.B.rotate(angles, deg);
    this.C.rotate(angles, deg);
  }

  translate(vector) {
    this.A.translate(vector);
    this.B.translate(vector);
    this.C.translate(vector);
  }
}

class Point3D {
  constructor(p) {
    p = p || [0, 0, 0];
    this.x = p[0];
    this.y = p[1];
    this.z = p[2];
  }

  coordinates() {
    return [this.x, this.y, this.z];
  }

  /**
   * Erzeuge ein neues Point3D mit den identischen Koordinaten
   * @returns {Point3D}
   */
  clone() {
    return new Point3D([this.x, this.y, this.z]);
  }

  /**
   * Erzeuge einen neuen Punkt der genau in der Mitte von diesem Punkt und dem target Punkt liegt
   * @param target
   * @returns {Point3D}
   */
  midpoint(target) {
    return new Point3D([(this.x + target.x) / 2, (this.y + target.y) / 2, (this.z + target.z) / 2]);
  }


  zero(to) {
    return new Point3D([to.x - this.x, to.y - this.y, to.z - this.z])
  }

  /**
   * Alle Winkel zwischen 2 Punkten in Bezug zu this als 0,0,0
   * @param target
   * @returns {*[]}
   */
  getAngles(target) {
    let p = new Point3D([target.x - this.x, target.y - this.y, target.z - this.z]);

    let xAng;
    let yAng;
    let zAng;
     //Z
    zAng = Math.atan2(p.y, p.x);

    //X
    xAng = Math.atan2(p.z, p.y);

    //Y
    yAng = Math.atan2(p.z, p.x);

    return [xAng, yAng, zAng]

  }

  /**
   * Distanz zu einem anderen Punkt
   * @param target {Point3D} der andere Punkt
   */
  distance(target) {
    return (Math.abs(this.x - target.x) ** 2 + Math.abs(this.y - target.y) ** 2 + Math.abs(this.z - target.z) ** 2) ** (1 / 2);
  }

  /**
   * Rotieren eines Punktes um den globalen Nullpunkt in rad
   * @param angles Array [rotX,rotY,rotZ]
   * @param deg boolean Grad anstatt Radiant
   * @returns {Point3D}
   */
  rotate(angles, deg) {
    deg = deg || false;
    this._rotateXaxis(angles[0], deg);
    this._rotateYaxis(angles[1], deg);
    this._rotateZaxis(angles[2], deg);
    return this;
  }

  /**
   * Rotieren eines Punktes um den globalen Nullpunkt in rad
   * @param angles Array [rotX,rotY,rotZ]
   * @param deg boolean Grad anstatt Radiant
   * @returns {Point3D}
   */
  rotateZYX(angles, deg) {
    deg = deg || false;
    this._rotateZaxis(angles[2], deg);
    this._rotateYaxis(angles[1], deg);
    this._rotateXaxis(angles[0], deg);
    return this;
  }

  /**
   * Verschieben eines Punktes in allen 3 Achsen
   * @param distance
   * @returns {Point3D}
   */
  translate(distance) {
    this.x += distance[0];
    this.y += distance[1];
    this.z += distance[2];
    return this;
  }


  _rotateZaxis(deltaAngle, deg) {
    if (deg) {
      deltaAngle = deltaAngle * Math.PI / 180
    }
    if (deltaAngle === 0) {
      return this;
    }
    const newAngle = Math.atan2(this.y, this.x) + deltaAngle;
    const distance = (this.x ** 2 + this.y ** 2) ** (1 / 2);
    this.x = distance * Math.cos(newAngle);
    this.y = distance * Math.sin(newAngle);

    return this;
  }

  _rotateYaxis(deltaAngle, deg) {
    if (deg) {
      deltaAngle = deltaAngle * Math.PI / 180
    }
    if (deltaAngle === 0) {
      return this;
    }

    const newAngle = Math.atan2(this.z, this.x) + deltaAngle;
    const distance = (this.x ** 2 + this.z ** 2) ** (1 / 2);
    this.z = distance * Math.sin(newAngle);
    this.x = distance * Math.cos(newAngle);
    return this;
  }

  _rotateXaxis(deltaAngle, deg) {
    if (deg) {
      deltaAngle = deltaAngle * Math.PI / 180
    }
    if (deltaAngle === 0) {
      return this;
    }
    const newAngle = Math.atan2(this.z, this.y) + deltaAngle;
    const distance = (this.z ** 2 + this.y ** 2) ** (1 / 2);
    this.z = distance * Math.sin(newAngle);
    this.y = distance * Math.cos(newAngle);
    return this;
  }
}

if (module) {
  module.exports.Triangle3D = Triangle3D;
  module.exports.Point3D = Point3D;
  module.exports.M3d = M3d;
}