import { Vector3, Euler } from 'three';

export type ShapeType = 'sphere' | 'box' | 'star';

export type ColorTheme = 'gold' | 'silver' | 'red' | 'green';

export interface OrnamentData {
  id: string;
  type: ShapeType;
  color: ColorTheme;
  scale: number;
  treePosition: Vector3;
  scatterPosition: Vector3;
  rotation: Euler;
  rotationSpeed: number;
}