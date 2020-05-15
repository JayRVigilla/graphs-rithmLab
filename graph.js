/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add BIDIRECTIONAL edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    // get SET of vertex.adjacent
    let vertsToUpdate = vertex.adjacent;

    // update each vertex.adjacent in adjacency SET
    for (let vert of vertsToUpdate) {
      this.removeEdge(vertex, vert)
    }

    // remove vertex
    this.nodes.delete(vertex)

  }

  /** traverse graph with DFS and returns array of Node values */
  // TODO: try to do away with 'verteces' variable as done in BFS
  depthFirstSearch(start) {
    // use a stack ---- pop, push
    const toVisitStack = [start];
    const verteces = [];
    const seen = new Set();
    let current;


    seen.add(start);

    while (toVisitStack.length) { // while we still have Vertices to visit
      current = toVisitStack.pop(); // next to check is from end of toVisitStack
      verteces.push(current.value);

      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {  //if we haven't seen it before
          seen.add(neighbor);
          toVisitStack.push(neighbor);  // add vert in adjacency SET to toVisitStack 
        }
      }
    }
    // console.log("seen ", seen);
    // console.log("veteces ", verteces);
    return verteces;
    // return Array.from(seen);
  }


  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {    // use a stack ---- pop, push
    const toVisitQueue = [start];
    // const verteces = [];
    const seen = new Set();
    let current;

    seen.add(start.value);

    while (toVisitQueue.length) { // while we still have Vertices to visit
      current = toVisitQueue.shift(); // next to check is from beginning of queue
      // verteces.push(current.value);

      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor.value)) {  //if we haven't seen it before
          seen.add(neighbor.value);
          toVisitQueue.push(neighbor);  // add vert in adjacency SET to toVisitStack 
        }
      }
    }
    console.log("seen ", seen);
    // console.log("veteces ", verteces);
    // return verteces;
    // return seen;
    return Array.from(seen);
  }

  /** finds shortest path between two verteces */
  shortestPath(graph, v1, v2) {
    // need a step counter, findPath, canFind(T/F)
    // DFS to set the baseline/max of leastSteps
    // if canFind === true && iteration.steps < leastSteps
    // recursive
    // while toVisitStack.length BASE CASE
    // findPath(graph, v1, v2, steps, canFind) RECURSE
    // PROGRESS

    /**helperFunction findPath(graph, v1, v2, visited=()){
     * while (toVisitStack.length && steps < leastSteps){
     * 
     * if current=v2 return steps
     * 
     * if each of current.adjacent !visited.has(each) THEN push onto stack
     * current = toVisit.pop
     * steps ++
     * return findPath
     * }
    }*/
  }
  // *****************************************************
  shortestPath(start, end) {
    // just finds the first path. for Q,V it finds 
    // as written in solution ["Q", "P", "X", "U", "V"] 
    // BUT there's a shorter path! [Q,X,V]
    if (start === end) {
      return [start.value];
    }

    var queue = [start];
    let visited = new Set();
    let predecessors = {};  // object of what? -- linked list of the path you take
    let path = []; // returned with start on either side but doesn't show end
    let ans;

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {  //when we reach the end
        let stop = predecessors[end.value];  //
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(end.value);  //add start value to beginning of path... changed to end, was start
        path.reverse();  // reverses the path array
        return path;
      }

      visited.add(currentVertex);  // when not at end keep track of where you've been 
      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {  // if we haven't seen one of the adjacent verteces of the current node
          predecessors[vertex.value] = currentVertex.value;  //
          queue.push(vertex);
        }
      }
    }
  }
}


module.exports = { Graph, Node }

