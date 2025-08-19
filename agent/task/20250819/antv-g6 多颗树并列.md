- 任务
    - 每颗树都是一个自定义节点（类似SubGraphNode）
    - 从左到右，多颗树并列
    - 总体是图中图的形式来实现，即每棵树都是一个Graph实例，但是都挂载在根Graph所在的Dom元素上
    - 树之间不能有重叠
    - 要很方便的设置树之间的横向间距
    - 每棵树都可以折叠和展开节点
    - 多颗树之间的节点可以有连接关系，但是当节点折叠后，连接关系要消失
- 要求
    - 使用antv g6 5.0语法
    - 使用context7 mcp服务
    - 所有修改都限定在src\components\MultiTree目录下
- SubGraphNode示例
```js
import { BaseCombo, ExtensionCategory, Graph, HTML, isCollapsed, register } from '@antv/g6';
import { isEqual } from '@antv/util';

class SubGraphNode extends HTML {
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
      data: data,
      node: {
        style: {
          labelText: (d) => d.id,
          iconFontFamily: 'iconfont',
          iconText: '\ue6e5',
        },
      },
      layout: {
        type: 'force',
        linkDistance: 50,
      },
      behaviors: ['zoom-canvas', { type: 'drag-canvas', enable: (event) => event.shiftKey === true }],
      autoFit: 'view',
    });

    subGraph.render();

    this.graph = subGraph;
  }

  destroy() {
    this.graph?.destroy();
    super.destroy();
  }
}

```

- 根Graph示例
```js
const graph = new Graph({
  container: 'container',
  animation: false,
  zoom: 0.8,
  data: {
    nodes: [
      {
        id: '1',
        combo: 'A',
        style: { x: 120, y: 70 },
        data: {
          data: {
            nodes: [
              { id: 'node-1' },
              { id: 'node-2' },
              { id: 'node-3' },
              { id: 'node-4' },
              { id: 'node-5' },
              { id: 'node-6' },
              { id: 'node-7' },
              { id: 'node-8' },
            ],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
              { source: 'node-1', target: 'node-5' },
              { source: 'node-1', target: 'node-6' },
              { source: 'node-1', target: 'node-7' },
              { source: 'node-1', target: 'node-8' },
            ],
          },
        },
      },
      {
        id: '2',
        combo: 'C',
        style: { x: 370, y: 70 },
        data: {
          data: {
            nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
            ],
          },
        },
      },
      {
        id: 'node-4',
        combo: 'D',
        style: { x: 370, y: 200 },
        data: {
          data: {
            nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
            ],
          },
        },
      },
    ],
    edges: [],
    combos: [
      {
        id: 'root',
        data: {
          data: [
            { name: 'percent', value: 50 },
            { name: 'percent', value: 45 },
            { name: 'percent', value: 70 },
          ],
        },
      },
      {
        id: 'A',
        combo: 'root',
        data: {
          data: [
            { name: 'percent', value: 30 },
            { name: 'percent', value: 90 },
          ],
        },
      },
      {
        id: 'B',
        combo: 'root',
        style: { collapsed: true },
        data: {
          data: [
            { name: 'percent', value: 60 },
            { name: 'percent', value: 80 },
          ],
        },
      },
      {
        id: 'C',
        combo: 'B',
        style: { collapsed: true },
        data: {
          data: [{ name: 'percent', value: 60 }],
        },
      },
      {
        id: 'D',
        combo: 'B',
        style: { collapsed: true },
        data: {
          data: [{ name: 'percent', value: 80 }],
        },
      },
    ],
  },
  node: {
    type: 'sub-graph',
    style: {
      dx: -100,
      dy: -50,
      size: getSize,
    },
  },
  combo: {
    type: 'card',
    style: {
      collapsedSize: [200, 100],
      collapsedMarker: false,
      radius: 10,
    },
  },
  behaviors: [
    { type: 'drag-element', enable: (event) => event.shiftKey !== true },
    'collapse-expand',
    'zoom-canvas',
    'drag-canvas',
  ],
  plugins: [
    {
      type: 'contextmenu',
      getItems: (event) => {
        const { targetType, target } = event;
        if (!['node', 'combo'].includes(targetType)) return [];
        const id = target.id;

        if (targetType === 'combo') {
          const data = graph.getComboData(id);
          if (isCollapsed(data)) {
            return [{ name: '展开', value: 'expanded' }];
          } else return [{ name: '收起', value: 'collapsed' }];
        }
        return [{ name: '收起', value: 'collapsed' }];
      },
      onClick: (value, target, current) => {
        const id = current.id;
        const elementType = graph.getElementType(id);

        if (elementType === 'node') {
          const parent = graph.getParentData(id, 'combo');
          if (parent) return graph.collapseElement(parent.id, false);
        }

        if (value === 'expanded') graph.expandElement(id, false);
        else graph.collapseElement(id, false);
      },
    },
  ],
});

graph.render();
```