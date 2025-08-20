import { CubicHorizontal } from '@antv/g6';

export class AntLine extends CubicHorizontal {
  onCreate() {
    const shape = this.shapeMap.key;
    shape.animate([{ lineDashOffset: 20 }, { lineDashOffset: 0 }], {
      duration: 500,
      iterations: Infinity,
    });
  }
}