// Geometría de las tablas medida sobre el fotograma real (hd-05 Sienna, 1.6s, recorte 9:16 sin rótulos).
// Punto de fuga estimado a partir de las juntas largas visibles; juntas cortas reales en las filas A (y≈705) y B (y≈1390).
// Coordenadas en píxeles del cuadro 1080×1920. Los polígonos pueden salir del cuadro.

export const VANISHING = { x: 881.0, y: -1454.0 };

export type Board = { id: string; lane: number; poly: [number, number][] };

export const BOARDS: Board[] = [
  { id: "Z1", lane: 0, poly: [[219.1, -200], [450.2, -200], [-31.8, 1203.2], [-466.6, 1098.9]] },
  { id: "Z2", lane: 0, poly: [[-466.6, 1098.9], [-31.8, 1203.2], [-357.0, 2150], [-1021.4, 2150]] },
  { id: "A1", lane: 1, poly: [[450.2, -200], [667.3, -200], [505.7, 748.1], [153.6, 663.6]] },
  { id: "A2", lane: 1, poly: [[153.6, 663.6], [505.7, 748.1], [266.8, 2150], [-357.0, 2150]] },
  { id: "B1", lane: 2, poly: [[667.3, -200], [857.2, -200], [848.1, 280.8], [595.7, 220.2]] },
  { id: "B2", lane: 2, poly: [[595.7, 220.2], [848.1, 280.8], [826.1, 1441.5], [404.8, 1340.3]] },
  { id: "B3", lane: 2, poly: [[404.8, 1340.3], [826.1, 1441.5], [812.6, 2150], [266.8, 2150]] },
  { id: "C1", lane: 3, poly: [[857.2, -200], [1111.1, -200], [1342.7, 1062.4], [835.6, 940.7]] },
  { id: "C2", lane: 3, poly: [[835.6, 940.7], [1342.7, 1062.4], [1542.2, 2150], [812.6, 2150]] },
];
