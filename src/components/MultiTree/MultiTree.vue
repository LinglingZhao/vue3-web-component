<template>
  <div ref="containerRef" class="multi-tree-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Graph, treeToGraphData } from '@antv/g6';

const containerRef = ref(null);
let graph = null;

// 定义多棵树的数据
const treeDataList = [
  {
    id: 'root1',
    children: [
      {
        id: 'child1-1',
        children: [{ id: 'grandchild1-1' }, { id: 'grandchild1-2' }]
      },
      {
        id: 'child1-2',
        children: [{ id: 'grandchild1-3' }, { id: 'grandchild1-4' }]
      }
    ]
  },
  {
    id: 'root2',
    children: [
      {
        id: 'child2-1',
        children: [{ id: 'grandchild2-1' }]
      },
      {
        id: 'child2-2',
        children: [{ id: 'grandchild2-2' }, { id: 'grandchild2-3' }, { id: 'grandchild2-4' }]
      }
    ]
  },
  {
    id: 'root3',
    children: [
      {
        id: 'child3-1',
        children: [{ id: 'grandchild3-1' }, { id: 'grandchild3-2' }, { id: 'grandchild3-3' }]
      }
    ]
  }
];

const initGraph = () => {
  if (!containerRef.value) return;

  // 为每棵树创建独立的图实例
  const graphs = [];
  const containerWidth = 1200;
  const containerHeight = 600;
  const treeWidth = containerWidth / treeDataList.length;
  
  treeDataList.forEach((treeData, index) => {
    const graphData = treeToGraphData(treeData);
    
    // 为每棵树设置不同的x偏移量，实现并列显示
    const xOffset = index * treeWidth;
    
    // 为节点添加偏移量
    const offsetNodes = graphData.nodes.map(node => ({
      ...node,
      style: {
        ...node.style,
        x: (node.style?.x || 0) + xOffset,
        y: node.style?.y || 0
      }
    }));
    
    // 创建每棵树的图实例
    const treeGraph = new Graph({
      container: containerRef.value,
      width: containerWidth,
      height: containerHeight,
      data: {
        nodes: offsetNodes,
        edges: graphData.edges
      },
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'center',
          labelBackground: true,
          ports: [{ placement: 'right' }, { placement: 'left' }]
        }
      },
      edge: {
        type: 'cubic-horizontal'
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR',
        nodeSep: 50,
        rankSep: 100
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element']
    });
    
    treeGraph.render();
    graphs.push(treeGraph);
  });
  
  // 保存第一个图实例用于销毁
  graph = graphs[0];
};

onMounted(() => {
  initGraph();
});

onUnmounted(() => {
  if (graph) {
    graph.destroy();
  }
});
</script>

<style scoped>
.multi-tree-container {
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
}
</style>