import { expect } from "chai";

import { Tree } from "./tree";

describe("tree/Tree", () => {
  it("can be constructed with a single node", () => {
    const tree = new Tree("A");
    expect(tree.root.root).to.eq(true);
    expect(tree.root.leaf).to.eq(true);
    expect(tree.root.children).to.have.length(0);
    expect(tree.root.depth).to.eq(0);
    expect(tree.root.value).to.eq("A");
  });

  it("can be constructed from edges", () => {
    const tree = Tree.from([
      ["A", "B"],
      ["B", "C"],
      ["A", "D"],
    ]);

    expect(tree.root.root).to.eq(true);
    expect(tree.root.leaf).to.eq(false);
    expect(tree.root.children).to.have.length(2);
    expect(tree.root.depth).to.eq(0);
    expect(tree.root.value).to.eq("A");

    const [b, d] = tree.root.children;

    expect(b.root).to.eq(false);
    expect(b.leaf).to.eq(false);
    expect(b.children).to.have.length(1);
    expect(b.depth).to.eq(1);
    expect(b.value).to.eq("B");

    expect(d.root).to.eq(false);
    expect(d.leaf).to.eq(true);
    expect(d.children).to.have.length(0);
    expect(d.depth).to.eq(1);
    expect(d.value).to.eq("D");

    const [c] = b.children;

    expect(c.root).to.eq(false);
    expect(c.leaf).to.eq(true);
    expect(c.children).to.have.length(0);
    expect(c.depth).to.eq(2);
    expect(c.value).to.eq("C");
  });

  it("can be tested for equality", () => {
    const tree: Tree<string> = Tree.from([
      ["A", "B"],
      ["B", "C"],
      ["A", "D"],
      ["D", "E"],
    ]);

    expect(
      tree.equals(
        Tree.from([
          ["A", "B"],
          ["B", "C"],
          ["A", "D"],
          ["D", "E"],
        ]),
      ),
    ).to.eq(true);

    expect(
      tree.equals(
        Tree.from([
          ["!", "B"],
          ["B", "C"],
          ["!", "D"],
          ["D", "E"],
        ]),
      ),
    ).to.eq(false);

    expect(
      tree.equals(
        Tree.from([
          ["A", "!"],
          ["!", "C"],
          ["A", "D"],
          ["D", "E"],
        ]),
      ),
    ).to.eq(false);

    expect(
      tree.equals(
        Tree.from([
          ["A", "B"],
          ["B", "!"],
          ["A", "D"],
          ["D", "E"],
        ]),
      ),
    ).to.eq(false);

    expect(
      tree.equals(
        Tree.from([
          ["A", "B"],
          ["B", "C"],
          ["A", "D"],
          ["D", "E"],
          ["A", "F"],
        ]),
      ),
    ).to.eq(false);

    expect(
      tree.equals(
        Tree.from([
          ["A", "B"],
          ["B", "C"],
          ["B", "F"],
          ["A", "D"],
          ["D", "E"],
        ]),
      ),
    ).to.eq(false);
  });

  it("can be traversed breadth-first", () => {
    const tree = Tree.from([
      ["A", "B"],
      ["B", "C"],
      ["A", "D"],
      ["D", "E"],
    ]);

    const visited: string[] = [];
    tree.root.traverse((n) => visited.push(n.value), "breadth-first");
    expect(visited).to.have.ordered.members(["A", "B", "D", "C", "E"]);
  });

  it("can be traversed depth-first", () => {
    const tree = Tree.from([
      ["A", "B"],
      ["B", "C"],
      ["A", "D"],
      ["D", "E"],
    ]);

    const visited: string[] = [];
    tree.root.traverse((n) => visited.push(n.value), "depth-first");
    expect(visited).to.have.ordered.members(["A", "B", "C", "D", "E"]);
  });

  it("can find the path to root node", () => {
    const tree = Tree.from([
      ["A", "B"],
      ["B", "C"],
      ["A", "D"],
      ["D", "E"],
    ]);

    const [b, d] = tree.root.children;
    const [c] = b.children;

    expect(tree.root.lineage()).to.have.ordered.members([]);
    expect(b.lineage()).to.have.ordered.members([tree.root]);
    expect(d.lineage()).to.have.ordered.members([tree.root]);
    expect(c.lineage()).to.have.ordered.members([b, tree.root]);
  });

  it("can find the closest common ancestor", () => {
    const tree = Tree.from([
      ["A", "B"],
      ["B", "C"],
      ["B", "D"],
      ["D", "E"],
      ["A", "F"],
      ["F", "G"],
      ["F", "H"],
      ["H", "I"],
    ]);

    const [b, f] = tree.root.children;
    const [c, d] = b.children;
    const [e] = d.children;
    const [g, h] = f.children;
    const [i] = h.children;

    expect(tree.root.common(tree.root)).to.eq(tree.root);

    expect(tree.root.common(b)).to.eq(tree.root);
    expect(tree.root.common(c)).to.eq(tree.root);
    expect(tree.root.common(d)).to.eq(tree.root);
    expect(tree.root.common(e)).to.eq(tree.root);

    expect(b.common(tree.root)).to.eq(tree.root);
    expect(c.common(tree.root)).to.eq(tree.root);
    expect(d.common(tree.root)).to.eq(tree.root);
    expect(e.common(tree.root)).to.eq(tree.root);

    expect(b.common(f)).to.eq(tree.root);
    expect(b.common(g)).to.eq(tree.root);
    expect(b.common(h)).to.eq(tree.root);
    expect(b.common(i)).to.eq(tree.root);

    expect(f.common(b)).to.eq(tree.root);
    expect(g.common(b)).to.eq(tree.root);
    expect(h.common(b)).to.eq(tree.root);
    expect(i.common(b)).to.eq(tree.root);

    expect(f.common(b)).to.eq(tree.root);
    expect(f.common(c)).to.eq(tree.root);
    expect(f.common(d)).to.eq(tree.root);
    expect(f.common(e)).to.eq(tree.root);

    expect(b.common(f)).to.eq(tree.root);
    expect(c.common(f)).to.eq(tree.root);
    expect(d.common(f)).to.eq(tree.root);
    expect(e.common(f)).to.eq(tree.root);

    expect(b.common(c)).to.eq(tree.root);
    expect(b.common(d)).to.eq(tree.root);
    expect(b.common(e)).to.eq(tree.root);

    expect(c.common(b)).to.eq(tree.root);
    expect(d.common(b)).to.eq(tree.root);
    expect(e.common(b)).to.eq(tree.root);

    expect(c.common(d)).to.eq(b);
    expect(c.common(e)).to.eq(b);

    expect(d.common(c)).to.eq(b);
    expect(e.common(c)).to.eq(b);
  });

  it("can be split into subtrees", () => {
    const tree = Tree.from([
      // b
      ["A", "B"],
      // c
      ["A", "C"],
      ["C", "D"],
      // e
      ["A", "E"],
      ["E", "F"],
      ["F", "G"],
      ["F", "H"],
      ["E", "I"],
    ]);

    const b = tree.root.children[0].subtree();
    expect(b.equals(new Tree("B"))).to.eq(true);

    const c = tree.root.children[1].subtree();
    expect(c.equals(Tree.from([["C", "D"]]))).to.eq(true);

    const e = tree.root.children[2].subtree();
    expect(
      e.equals(
        Tree.from([
          ["E", "F"],
          ["F", "G"],
          ["F", "H"],
          ["E", "I"],
        ]),
      ),
    ).to.eq(true);
  });
});
