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

  shortestPath(start, end) {
    /**  original: 
     * for the points Q & V (5) ["Q", "P", "X", "U", "V"]
     * for the points Q & Y (4) ["Q", "P", "X", "Y"]
     * for the points Q & U (4) ["Q", "P", "X", "U"]
     * 
     * BUT there are a shorter paths
     * for the points Q & V (3) ["Q", "X", "V"]
     * for the points Q & Y (3) ["Q", "X", "Y"]
     * for the points Q & U (3) ["Q", "X", "U"]
     * 
     * 
     * changed the method to add the full nodes to the path array
     * then do a check on the path before returning
     * 
     * TODO: for larger graph may have to do this check multiple times.
     *      -have a condition for having done the check at all in on pass. 
     *      -if true do another pass. I think we can do this recursively
     * 
     * also changed the method to do away with having to reverse the path
      */
    
    if (start === end) {
      return [start];
    }

    var queue = [start];
    let visited = new Set();
    let predecessors = {};  // linked list of the path you take. NOW where values are Verteces
    let path = []; // reworked the function to add the full nodes to the path array
    let ans;

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {  
        let stop = predecessors[end.value]; 
        while (stop) {
          path.unshift(stop);
          stop = predecessors[stop.value];
        }
        path.push(end); 

        //added check for redundant verteces in path
        for (let vert in path) { 
          let i = path.indexOf(vert)
          // if vert and the nextItem both have the nextItemAfterThat in their adjacency lists, remove nextItem
          if (vert.adjacent.includes(path[i + 2]) && path[i + 1].adjacent.includes(path[i + 2])) { path.splice(i+1,1)}
        }
        ans = path.map( v => v.value);
        return ans;
      }

      visited.add(currentVertex);  
      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {  
          predecessors[vertex.value] = currentVertex; 
          queue.push(vertex);
        }
      }
    }
  }
}


module.exports = { Graph, Node }

