import { computeIfAbsent } from "./map";
import { Multimap } from "./multimap";

/** Executes a breadth-first search of the tree with the supplied root node. */
function bfs<T>(root: Node<T>, predicate: (node: Node<T>) => boolean): Node<T> | undefined {
  if (predicate(root)) {
    return root;
  }

  let stack = root.children.slice();
  while (true) {
    const next: Node<T>[] = [];
    for (const node of stack) {
      if (predicate(node)) {
        return node;
      } else {
        next.push(...node.children);
      }
    }

    if (next.length !== 0) {
      stack = next;
    } else {
      return undefined;
    }
  }
}

/** Executes a depth-first search of the tree with the supplied root node. */
function dfs<T>(root: Node<T>, predicate: (node: Node<T>) => boolean): Node<T> | undefined {
  if (predicate(root)) {
    return root;
  }

  const stack = root.children.reverse();
  while (stack.length !== 0) {
    const node = stack.pop()!;
    if (predicate(node)) {
      return node;
    } else {
      stack.push(...node.children.reverse());
    }
  }
}

/** A node in a tree. */
export class Node<T> {
  constructor(
    public readonly tree: Tree<T>,
    public readonly parent: Node<T> | undefined,
    public readonly children: Node<T>[],
    public readonly depth: number,
    public value: T,
  ) {}

  /** Returns whether this node is the root node. */
  get root(): boolean {
    return this.parent === undefined;
  }

  /** Returns whether this node is a leaf node. */
  get leaf(): boolean {
    return this.children.length === 0;
  }

  /** Adds a child node to this node. */
  add(child: T): Node<T> {
    const node = new Node(this.tree, this, [], this.depth + 1, child);
    this.children.push(node);
    return node;
  }

  /** Searches the descendants of this node. */
  search(
    predicate: (node: Node<T>) => boolean,
    mode: "breadth-first" | "depth-first" = "depth-first",
  ): Node<T> | undefined {
    return mode === "breadth-first" ? bfs(this, predicate) : dfs(this, predicate);
  }

  /** Traverses the descendants of this node. */
  traverse(
    visitor: (node: Node<T>) => void,
    mode: "breadth-first" | "depth-first" = "depth-first",
  ): void {
    this.search(node => {
      visitor(node);
      return false;
    }, mode);
  }

  /** Returns the path to the root node from this node. */
  lineage(): Node<T>[] {
    const lineage: Node<T>[] = [];

    let parent = this.parent;
    while (parent !== undefined) {
      lineage.push(parent);
      parent = parent.parent;
    }

    return lineage;
  }

  /** Returns the closest common ancestor for this node and the supplied node. */
  common(other: Node<T>): Node<T> {
    if (this === other) {
      return this;
    }

    let thisParent = this.parent;
    let thisDepth = this.depth;
    let otherParent = other.parent;
    let otherDepth = other.depth;

    while (true) {
      if (!thisParent || !otherParent) {
        return this.tree.root;
      }

      if (thisDepth > otherDepth) {
        thisDepth -= 1;
        thisParent = thisParent.parent;
      } else if (thisDepth < otherDepth) {
        otherDepth -= 1;
        otherParent = otherParent.parent;
      } else if (thisParent === otherParent) {
        return thisParent;
      } else {
        thisParent = thisParent.parent;
        otherParent = otherParent.parent;
      }
    }
  }

  /** Returns a tree with this node as the root. */
  subtree(): Tree<T> {
    const tree = new Tree(this.value);

    const stack: [Node<T>, Node<T>[]][] = [[tree.root, this.children.slice()]];
    while (stack.length !== 0) {
      const [parent, children] = stack.pop()!;
      for (const child of children) {
        stack.push([parent.add(child.value), child.children.slice()]);
      }
    }

    return tree;
  }
}

/** A tree. */
export class Tree<T> {
  public root: Node<T>;

  /** Returns a tree constructed from the supplied edges. */
  static from<T extends number | string>(edges: [T, T][]): Tree<T> {
    const graph = new Multimap<T, T>();
    for (const [parent, child] of edges) {
      graph.addEntry(parent, child);
    }

    const children = graph.values();
    const roots = Array.from(graph.keys()).filter(node => !children.has(node));
    if (roots.length === 0) throw new Error("no root node");
    if (roots.length > 1) throw new Error("mulitple root nodes");

    const tree = new Tree(roots[0]);
    const next = graph.getValues(tree.root.value);

    const stack: [Node<T>, ReadonlySet<T> | undefined][] = [[tree.root, next]];
    while (stack.length !== 0) {
      const [node, children] = stack.pop()!;
      if (children) {
        for (const child of children) {
          stack.push([node.add(child), graph.getValues(child)]);
        }
      }
    }

    return tree;
  }

  constructor(root: T) {
    this.root = new Node(this, undefined, [], 0, root);
  }

  /** Returns whether this tree and the supplied tree are equal. */
  equals(
    other: Tree<T>,
    compare: (a: Node<T>, b: Node<T>) => boolean = (a, b) => a.value === b.value,
  ): boolean {
    let stack: [Node<T>, Node<T>][] = [[this.root, other.root]];

    while (stack.length !== 0) {
      const [a, b] = stack.pop()!;

      if (a.children.length !== b.children.length || !compare(a, b)) {
        return false;
      }

      for (let i = 0; i < a.children.length; ++i) {
        stack.push([a.children[i], b.children[i]]);
      }
    }

    return true;
  }

  /** Returns a DOT digraph description for this tree. */
  describe(label: (node: Node<T>) => string): string {
    let dot = "digraph Tree {\n";

    let id = 0;
    const ids = new Map<Node<T>, string>();
    const identify = (node: Node<T>) => computeIfAbsent(ids, node, () => `_${id++}`);

    const stack = [this.root];
    while (stack.length !== 0) {
      const node = stack.shift()!;

      const id = identify(node);
      dot += `  ${id}[label=${JSON.stringify(label(node))}];\n`;
      if (node.parent) dot += `  ${identify(node.parent)} -> ${id};\n`;

      stack.push(...node.children);
    }

    return `${dot}}`;
  }
}
