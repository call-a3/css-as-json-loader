import {SourceMapGenerator, SourceMapConsumer, SourceNode} from 'source-map';

function get_node_origin(node) {
  let start = node.source.input.origin(node.source.start.line, node.source.start.column);
  let end = node.source.input.origin(node.source.end.line, node.source.end.column);
  return {
    source: start.file,
    start: {
      line: start.line,
      column: start.column
    },
    end: {
      line: end.line,
      column: end.column
    }
  };
}

function node_to_json(node) {
  let json = {
    type: node.type,
    origin: get_node_origin(node)
  };
  if (node.nodes) {
    json.nodes = [];
    node.each(function(node) {
      if (node.type !== 'comment') {
        json.nodes.push(node_to_json(node));
      }
    });
  }
  ['name', 'params', 'selectors', 'prop', 'value', 'important'].forEach(function(attr) {
    if (node[attr] !== undefined) {
      json[attr] = node[attr];
    }
  });
  return json;
}

export default function postcssToJSON(root) {
  let nodes = [];
  root.each(function(node) {
    nodes.push(node_to_json(node));
  });
  return nodes;
}
