<template>
  <div ref="containerRef" class="multi-tree-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Graph, treeToGraphData, ExtensionCategory, register } from '@antv/g6';
import { AntLine } from './antLine.js'
import { SubGraphNode } from './SubGraphNode.js'

register(ExtensionCategory.EDGE, 'ant-line', AntLine);
register(ExtensionCategory.NODE, 'sub-graph', SubGraphNode);

const containerRef = ref(null);
let graphs = [];
let interGraphEdges = [];

// 定义多棵树的数据
const treeDataList = [
  {
    id: 'tree-1',
    data: {
      data: {
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
    }
  },
  {
    id: 'tree-2',
    data: {
      data: {
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
    }
  },
  {
    id: 'tree-3',
    data: {
      data: {
        id: 'root3',
        children: [
          {
            id: 'child3-1',
            children: [{ id: 'grandchild3-1' }, { id: 'grandchild3-2' }, { id: 'grandchild3-3' }]
          }
        ]
      }
    }
  },
];

// 为树节点动态添加inorderIndex属性的函数
const addInorderIndex = (treeData) => {
  let index = 0;

  const traverse = (node) => {
    node.inorderIndex = index++;
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => traverse(child));
    }
  };

  traverse(treeData);
  return treeData;
};

// 定义树之间的连接关系
const interTreeConnections = [
  { source: 'grandchild1-2', target: 'child2-1' },
  { source: 'grandchild2-3', target: 'child3-1' }
];

// 树之间的横向间距
const TREE_SPACING = 100;
// 容器宽度
const CONTAINER_WIDTH = 1200;
// 容器高度
const CONTAINER_HEIGHT = 600;
// 节点x坐标水平间距
const NODE_X_SPACING = 100;
// 节点x坐标偏移量
const NODE_X_OFFSET = 30;
// 节点y坐标垂直间距
const NODE_Y_SPACING = 50;
// 节点y坐标偏移量
const NODE_Y_OFFSET = 100;

const initGraph = () => {
  if (!containerRef.value) return;

  // 清空之前的图实例
  graphs = [];
  interGraphEdges = [];

  // 计算每棵树的宽度
  let treeWidth = (CONTAINER_WIDTH - (treeDataList.length - 1) * TREE_SPACING) / treeDataList.length;

  // 合并所有树的数据到一个图实例中
  let allNodes = [];
  let allEdges = [];

  // 手动构建节点和边数据，避免treeToGraphData重置位置
  // treeDataList.forEach((treeData, index) => {
  //   // 为每棵树的数据添加inorderIndex属性
  //   const treeWithIndex = addInorderIndex(JSON.parse(JSON.stringify(treeData)));

  //   // 为每棵树设置不同的x坐标，避免重叠
  //   // 使用treeWidth和索引计算xOffset，确保树之间有足够间距
  //   const xOffset = index * (treeWidth + TREE_SPACING);

  //   // 递归函数来处理节点数据
  //   const processNode = (node, parentId = null, depth = 0) => {
  //     // 创建节点数据
  //     const nodeData = {
  //       id: node.id,
  //       inorderIndex: node.inorderIndex, // 添加中序遍历序号属性
  //       style: {
  //       x: xOffset + depth * NODE_X_SPACING + NODE_X_OFFSET,  // 根据深度设置x坐标，增加间距
  //       y: node.inorderIndex * NODE_Y_SPACING + NODE_Y_OFFSET  // 根据深度设置y坐标，增加间距
  //     }
  //     };

  //     // 添加节点到数组
  //     allNodes.push(nodeData);

  //     // 如果有父节点，创建边
  //     if (parentId) {
  //       const edgeData = {
  //         id: `edge-${parentId}-${node.id}`,
  //         source: parentId,
  //         target: node.id,
  //         // 添加属性区分树内边
  //         type: 'innerTree'
  //       };
  //       allEdges.push(edgeData);
  //     }

  //     // 递归处理子节点
  //     if (node.children && node.children.length > 0) {
  //       node.children.forEach(child => {
  //         processNode(child, node.id, depth + 1);
  //       });
  //     }
  //   };

  //   // 处理当前树的根节点
  //   processNode(treeWithIndex);
  // });
  const configTree = {
    'tree-1': {
      dx: 0,
      dy: 0,
      size: [200, 200],
    },
        'tree-2': {
      dx: 300,
      dy: 0,
      size: [200, 200],
    },
        'tree-3': {
      dx: 600,
      dy: 0,
      size: [200, 200],
    }
  }
  // 创建一个图实例来显示所有树
  const graph = new Graph({
    container: containerRef.value,
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    data: {
      nodes: treeDataList,
      edges: []
    },
    node: {
      type: 'sub-graph',
      style: (d) => {
        return configTree[d.id]
      },
    },
    edge: {
      type: (d) => d.type === 'innerTree' ? 'polyline' : 'ant-line',
      style: (d) => {
        if (d.type === 'innerTree') {
          return {
            radius: 0,
            router: {
              type: 'orth',
            },
          };
        } else {
          return {
            stroke: '#1890ff',
            lineWidth: 2,
            endArrow: false,
            lineDash: [10, 10],
            // sourcePort: 'bottom',
            // targetPort: 'left',
          };
        }
      }
    },
    behaviors: ['drag-canvas', 'zoom-canvas',
      'drag-element',
      'collapse-expand']
  });

  graph.render();
  graphs.push(graph);

  // 监听节点折叠/展开事件
  graph.on('node:collapsed', (evt) => {
    debugger
    updateInterGraphEdges();
  });

  // 创建跨树连接线
  updateInterGraphEdges();
};

// 更新跨树连接线
const updateInterGraphEdges = () => {
  if (graphs.length === 0) return;

  const graph = graphs[0]; // 获取唯一的图实例

  // 清除之前的跨图连接线
  interGraphEdges.forEach(edgeId => {
    try {
      if (graph.getEdgeData(edgeId)) {
        graph.removeEdgeData([edgeId]);
      }
    } catch (e) {
      // 边不存在时会抛出异常，忽略即可
    }
  });

  interGraphEdges = [];

  // 创建新的跨图连接线
  interTreeConnections.forEach(connection => {
    const sourceNode = findNodeInGraphs(connection.source);
    const targetNode = findNodeInGraphs(connection.target);

    // 只有当源节点和目标节点都存在且未折叠时才创建连接线
    if (sourceNode && targetNode && !isNodeCollapsed(sourceNode) && !isNodeCollapsed(targetNode)) {
      const edgeId = `inter-${connection.source}-${connection.target}`;
      const edgeData = {
        id: edgeId,
        source: connection.source,
        target: connection.target,
        // 添加属性区分树之间连线
        type: 'interTree',
        style: {
          stroke: '#1890ff',
          lineWidth: 2,
          endArrow: true,
          // 添加蚂蚁线动画效果
          lineDash: [5, 5],
          animate: true,
          animateType: 'lineDash',
          animateInterval: 100
        }
      };

      // 将连接线添加到图实例中
      graph.addEdgeData([edgeData]);
      interGraphEdges.push(edgeId);
    }
  });

  // 重新绘制图
  graph.draw();
};

// 在所有图中查找节点
const findNodeInGraphs = (nodeId) => {
  for (const graph of graphs) {
    try {
      const nodeData = graph.getNodeData(nodeId);
      if (nodeData) {
        return nodeData;
      }
    } catch (e) {
      // 节点不存在时会抛出异常，我们忽略这个异常
    }
  }
  return null;
};

// 检查节点是否折叠
const isNodeCollapsed = (nodeData) => {
  // 检查节点是否有折叠状态
  return nodeData.states && nodeData.states.includes('collapsed');
};

onMounted(() => {
  initGraph();
});

onUnmounted(() => {
  graphs.forEach(graph => {
    if (graph) {
      graph.destroy();
    }
  });
});
</script>

<style scoped>
.multi-tree-container {
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
}
</style>