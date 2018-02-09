"use strict";


let rot;

let p1 = new Point3D([0, 0, 0]);
let p2 = new Point3D([2, 3, 1]);
let p3 = new Point3D([2, 1, 1]);

let p4 = new Point3D([5, 5, 5]);
let p5 = new Point3D([6, 6, 6]);


let points = [p1, p2, p3];
rot = M3d.getRotationToFlatZ(points);

console.log(rot, p1.rotate(rot), p2.rotate(rot), p3.rotate(rot));

rot = M3d.negateArray(rot);
console.log(rot, p1.rotate(rot), p2.rotate(rot), p3.rotate(rot));

console.log(p5.distance(p4));
console.log(p5.midpoint(p4));
console.log(p4.midpoint(p5));
console.log(M3d.intersectionRadius(p4, p5, 1.9));
console.log(M3d.intersectionRadius(p5, p4, 0.8661));
console.log(p5.distance(p5.midpoint(p4)));
