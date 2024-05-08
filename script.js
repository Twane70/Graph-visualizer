let fisheye = new G6.Fisheye({
  r: 200,
  d: 3,
  showLabel: true,
  delegateStyle: {
    fill: '#f5f0f0',
    lineDash: [5, 5],
    stroke: '#666',
  },
});


const colors = [
  '#4FC3F7',
  '#00ACC1',
  '#EC407A',
  '#5C6BC0',
  '#E91E63',
  '#FFCA28',
  '#78909C',
  '#EC407A',
  '#9CCC65',
];

const graphDiv = document.getElementById('container');



const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [fisheye],
  fitView: true,
  defaultNode: {
    labelCfg: {
      style: {
        fill: '#f2eded',
        stroke: '#191b1c',
        fontSize: 14,
      },
    },
  },
  defaultEdge: {
    style: {
      stroke: '#3d3d3d',
    },
  },
  defaultLabel: {
    style: {
      fill: '#ff0000',
    },
  },
});


fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    data.nodes.forEach((node) => {
      node.label = node.id;
      node.size = Math.random() * 30 + 10;
      node.style = {
        fill: colors[Math.floor(Math.random() * 9)],
        lineWidth: 0,
      };
    });
    graph.data(data);
    graph.render();
    graph.getNodes().forEach((node) => {
      node
        .getContainer()
        .getChildren()
        .forEach((shape) => {
          if (shape.get('type') === 'text') shape.hide();
        });
    });
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };