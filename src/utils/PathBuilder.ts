import * as d3 from 'd3';
import { getNewPos } from './2d';

type PathNode = {
  type: "C",
  x: number,
  y: number,
  angle: number,
  spread: number,
}

export default class PathBuilder {
  nodes: PathNode[] = [];
  constructor() {}

  addNode(node: PathNode): void {
    this.nodes.push(node);
  }

  getPath(): string {
    const {nodes} = this;
    const ctx = d3.path();
    const firstNode = nodes[0];
    if (!firstNode) return "";

    ctx.moveTo(firstNode.x, firstNode.y);
  
    nodes.forEach((curNode, i) => {
      const nextNode = i === nodes.length - 1 ? nodes[0] : nodes[i + 1];
      const cp1 = getNewPos({
        origin: {x: curNode.x, y: curNode.y},
        angle: curNode.angle,
        distance: curNode.spread,
      });
      const cp2 = getNewPos({
        origin: {x: nextNode.x, y: nextNode.y},
        angle: nextNode.angle + 180,
        distance: nextNode.spread,
      });
      ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, nextNode.x, nextNode.y);
    });
  
    ctx.closePath();
    return ctx.toString();
  }  
}