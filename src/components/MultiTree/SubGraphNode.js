import { Graph, HTML, treeToGraphData } from '@antv/g6';
import { isEqual } from '@antv/util';

export class SubGraphNode extends HTML {
  connectedCallback() {
    super.connectedCallback();
    this.drawSubGraph();
  }

  render(attributes, container) {
    super.render(attributes, container);
    this.drawSubGraph();
  }

  get data() {
    return this.context.graph.getElementData(this.id).data;
  }

  drawSubGraph() {
    if (!this.isConnected) return;
    if (isEqual(this.previousData, this.data)) return;
    this.previousData = this.data;

    const data = this.data;
    // debugger
    this.drawGraphNode(data.data);
  }

  drawGraphNode(data) {
    const [width, height] = this.getSize();
    const container = this.getDomElement();
    container.innerHTML = '';

    const subGraph = new Graph({
      container,
      width,
      height,
      animation: false,
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          iconFontFamily: 'iconfont',
          iconText: '\ue6e5',
        },
      },
        edge: {
        type: 'polyline',
        style: {
          radius: 0,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
      },
      behaviors: ['zoom-canvas', { type: 'drag-canvas', enable: (event) => event.shiftKey === true }, 'collapse-expand'],
    //   autoFit: 'view',
      plugins: [
    {
      type: 'background',
      key: 'my-background', // 为插件指定标识符，方便动态更新
      backgroundColor: '#f0f2f5', // 设置背景色
    },
  ],
    });

    subGraph.render();

    this.graph = subGraph;
  }

  destroy() {
    this.graph?.destroy();
    super.destroy();
  }
}