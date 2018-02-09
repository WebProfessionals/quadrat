var assert = require('chai').assert;
var expect = require('chai').expect;
var Point3D = require('./Math3d').Point3D;
var Triangle3D = require('./Math3d').Triangle3D;
var M3d = require('./Math3d').M3d;

var rnd = (v) => {
  return Math.round(v * 1e6) / 1e6;
}
describe('Math3D', function () {
  describe('Point3D', function () {

    it('sollte xx berechnen ', function () {
      var rnd = (v) => {
        return Math.round(v * 1e3) / 1e3;
      }
      let neigung = -20;
      let A, B, C,t ;
      for (Ax = 0; Ax < 30.1;Ax=Ax+0.1){
      A = new Point3D([10, 0, Ax]).rotate([0, neigung, 0], true);
      B = new Point3D([10, 0, 30]).rotate([0, neigung, 0], true).rotate([0, 0, 120], true);
      C = new Point3D([10, 0, 30]).rotate([0, neigung, 0], true).rotate([0, 0, 240], true);
      t = new Triangle3D(A, B, C);

      let R = 66;
      // z ist der Radius vom center U
      z = Math.sqrt((R ** 2) - (B.distance(t.U) ** 2))
      XX = new Point3D([0, 0, -z]).rotate(t.orientation).translate(t.U.coordinates());


      w= XX.getAngles(B);

      //console.log(XX);
      console.log('h',rnd(Ax), '   xx',XX ,w)
      }

      expect(rnd(t.U.distance(XX))).equal(rnd(z));
      expect(rnd(t.B.distance(XX))).equal(rnd(t.C.distance(XX)));
      expect(rnd(t.A.distance(XX))).equal(rnd(t.B.distance(XX)));
    });

    it('Sollte Punkt U mit gleichem Abstand zu allen Ecken haben C', function () {
      let A = new Point3D([5, 0, 0]).rotate([0, 0, 0], true);
      let B = new Point3D([5, 0, 0]).rotate([0, 0, 0], true).rotate([0, 0, 120], true);
      let C = new Point3D([5, 0, 10]).rotate([0, 0, 0], true).rotate([0, 0, 240], true);

      let t = new Triangle3D(A, B, C);

      expect(rnd(t.B.distance(t.U))).equal(rnd(t.C.distance(t.U)));
      expect(rnd(t.A.distance(t.U))).equal(rnd(t.B.distance(t.U)));
    });

    it('Sollte Punkt U mit gleichem Abstand zu allen Ecken haben B', function () {
      let A = new Point3D([5, 0, 0]).rotate([0, 0, 0], true);
      let B = new Point3D([5, 0, 10]).rotate([0, 0, 0], true).rotate([0, 0, 120], true);
      let C = new Point3D([5, 0, 0]).rotate([0, 0, 0], true).rotate([0, 0, 240], true);

      let t = new Triangle3D(A, B, C);

      expect(rnd(t.B.distance(t.U))).equal(rnd(t.C.distance(t.U)));
      expect(rnd(t.A.distance(t.U))).equal(rnd(t.B.distance(t.U)));
    });
    it('Sollte Punkt U mit gleichem Abstand zu allen Ecken haben A', function () {
      let A = new Point3D([5, 0, 10]).rotate([0, 10, 0], true);
      let B = new Point3D([5, 0, 0]).rotate([0, 10, 0], true).rotate([0, 0, 120], true);
      let C = new Point3D([5, 0, 0]).rotate([0, 10, 0], true).rotate([0, 0, 240], true);

      let t = new Triangle3D(A, B, C);

      expect(rnd(t.B.distance(t.U))).equal(rnd(t.C.distance(t.U)));
      expect(rnd(t.A.distance(t.U))).equal(rnd(t.B.distance(t.U)));
    });

    it('should Dreieck_ mit A0,0,0 haben', function () {
      let A = new Point3D([100, 0, 0]).rotate([0, 0, 0], true);
      let B = new Point3D([100, 0, 0]).rotate([0, 0, 0], true).rotate([0, 0, 120], true);
      let C = new Point3D([100, 0, 10]).rotate([0, 0, 0], true).rotate([0, 0, 240], true);

      let t = new Triangle3D(A, B, C);
      console.log(t.orientation);

    });
    it('sollte Schwerpunkt S eines 3ecks liefern', function () {
      let A = new Point3D([100, 0, 0]).rotate([0, 0, 0], true);
      let B = new Point3D([100, 0, 0]).rotate([0, 0, 0], true).rotate([0, 0, 120], true);
      let C = new Point3D([100, 0, 0]).rotate([0, 0, 0], true).rotate([0, 0, 240], true);

      let t = new Triangle3D(A, B, C);

      expect(t.S.coordinates()).to.deep.equal([-7.105427357601002e-15, 9.473903143468002e-15, 0]);
    });

    it('sollte die Werte eines Punktes als Array [x,y,z] zurückgeben', function () {
      let p = new Point3D([2, 2, 2]);
      expect(p.coordinates()).to.deep.equal([2, 2, 2]);
    });

    it('sollte den Winkel aus 2 Punkten [x,y,z] in rad erzeugen p.z', function () {
      let p1 = new Point3D([0, 0, 0]);
      let p2 = new Point3D([0, 0, 4]);
      let angles = p1.getAngles(p2);
      expect(angles).to.deep.equal([1.5707963267948966, 1.5707963267948966, 0]);

    });

    it('sollte NEGATIV den Winkel aus 2 Punkten [x,y,z] in rad erzeugen p.z', function () {
      let p1 = new Point3D([0, 0, 0]);
      let p2 = new Point3D([0, 0, 4]);
      let angles = p2.getAngles(p1);
      expect(angles).to.deep.equal([-1.5707963267948966, -1.5707963267948966, 0]);

    });

    it('sollte den Winkel aus 2 Punkten [x,y,z] in rad erzeugen p.y', function () {
      let p1 = new Point3D([0, 0, 0]);
      let p2 = new Point3D([0, 4, 0]);
      let angles = p1.getAngles(p2);
      expect(angles).to.deep.equal([0, 0, 1.5707963267948966]);

    });

    it('sollte NEGATIV den Winkel aus 2 Punkten [x,y,z] in rad erzeugen p.y', function () {
      let p1 = new Point3D([0, 0, 0]);
      let p2 = new Point3D([0, 4, 0]);
      let angles = p2.getAngles(p1);
      expect(angles).to.deep.equal([3.141592653589793, 0, -1.5707963267948966]);

    });


    it('sollte den Winkel aus 2 Punkten [x,y,z] in rad erzeugen p.x', function () {
      let p1 = new Point3D([0, 0, 0]);
      let p2 = new Point3D([4, 0, 0]);
      let angles = p1.getAngles(p2);
      expect(angles).to.deep.equal([0, 0, 0]);

    });

    it('sollte NEGATIV  den Winkel aus 2 Punkten [x,y,z] in rad erzeugen p.x', function () {
      let p1 = new Point3D([0, 0, 0]);
      let p2 = new Point3D([4, 0, 0]);
      let angles = p2.getAngles(p1);
      expect(angles).to.deep.equal([0, 3.141592653589793, 3.141592653589793]);

    });


    it('Punkt auf Z hat bei x und y 90°', function () {
      let p0 = new Point3D([0, 0, 0]);
      let p1 = new Point3D([0, 0, 1]);

      let angles = p0.getAngles(p1);

      expect(angles).to.deep.equal([1.5707963267948966, 1.5707963267948966, 0]);


    });



    it('sollte den Mittelpunkt von 2 Punkten erzeugen', function () {
      let p1 = new Point3D([0, 0, 0]);
      let p2 = new Point3D([1, 1, 1]);
      let p3 = p1.midpoint(p2);

      expect(p3.x).to.equal(0.5);
      expect(p3.y).to.equal(0.5);
      expect(p3.z).to.equal(0.5);
    });
    it('sollte die Distanz von 2 Punkten rechnen', function () {
      let p1 = new Point3D([0, 0, 0]);
      let p2 = new Point3D([1, 1, 1]);

      expect(p1.distance(p2)).to.equal(1.7320508075688772);
      expect(p2.distance(p1)).to.equal(1.7320508075688772);
      p2.translate([0, 0, -1]);


      expect(p1.distance(p2)).to.equal(1.4142135623730951);
      expect(p2.distance(p1)).to.equal(1.4142135623730951);

    });

    it('sollte einen Punkt ohne initiale Werte auf 0,0,0 erzeugen', function () {
      let p = new Point3D();
      expect(p.x).to.equal(0);
      expect(p.y).to.equal(0);
      expect(p.z).to.equal(0);
    });

    it('sollte einen Punkt mit initialen Werten erzeugen können', function () {
      let p = new Point3D([1, 2, 3]);
      expect(p.x).to.equal(1);
      expect(p.y).to.equal(2);
      expect(p.z).to.equal(3);
    });

    it('ein punkt kann 3dimensional verschoben werden', function () {
      let p = new Point3D([1, 2, 3]).translate([1, 1, 1]);
      expect(p.x).to.equal(2);
      expect(p.y).to.equal(3);
      expect(p.z).to.equal(4);
    });

    it('ein punkt kann 3dimensional um x gedreht werden', function () {
      let p = new Point3D([1, 1, 1]).rotate([1.5708, 0, 0]);
      expect(p.x).to.equal(1);
      expect(p.y).to.equal(-1.0000036731983575);
      expect(p.z).to.equal(0.9999963267881503);

    });
    it('ein punkt kann 3dimensional um y gedreht werden', function () {
      let p = new Point3D([1, 1, 1]).rotate([0, 1.5708, 0]);
      expect(p.x).to.equal(-1.0000036731983575);
      expect(p.y).to.equal(1);
      expect(p.z).to.equal(0.9999963267881503);
    });
    it('ein punkt kann 3dimensional um z gedreht werden', function () {
      let p = new Point3D([1, 1, 1]).rotate([0, 0, 1.5707963267948966]);
      expect(p.x).to.equal(-1);
      expect(p.y).to.equal(1.0000000000000002);
      expect(p.z).to.equal(1);
    });

    it('ein punkt kann 3dimensional mit Grad anstatt Rad um x gedreht werden', function () {
      let p = new Point3D([1, 1, 1]).rotate([45, 0, 0], true);
      expect(p.x).to.equal(1);
      expect(p.y).to.equal(8.659560562354934e-17);
      expect(p.z).to.equal(1.4142135623730951);

    });
    it('ein punkt kann 3dimensional mit Grad anstatt Rad um y gedreht werden', function () {
      let p = new Point3D([1, 1, 1]).rotate([0, 45, 0], true);
      expect(p.x).to.equal(8.659560562354934e-17);
      expect(p.y).to.equal(1);
      expect(p.z).to.equal(1.4142135623730951);
    });
    it('ein punkt kann 3dimensional mit Grad anstatt Rad um z gedreht werden', function () {
      let p = new Point3D([1, 1, 1]).rotate([0, 0, 45], true);
      expect(p.x).to.equal(8.659560562354934e-17);
      expect(p.y).to.equal(1.4142135623730951);
      expect(p.z).to.equal(1);
    });

    it('ein punkt kann 3dimensional mit Grad anstatt Rad gleichzeitig um alle achsen gedreht werden', function () {
      let p = new Point3D([1, 1, 1]).rotate([45, 45, 45], true);
      expect(p.x).to.equal(-0.20710678118654746);
      expect(p.y).to.equal(-0.2071067811865474);
      expect(p.z).to.equal(1.7071067811865477);
    });

  });
});