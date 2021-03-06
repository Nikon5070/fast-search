// const timeout = (fn) => setTimeout(() => fn(), 0);

export const findNode = (tree, path) => {
  let node = null;

  if (!path) {
    node = tree;
  } else {
    node = Array.from(path)
      .reduce((acc, item) => (acc !== undefined ? acc[item] : undefined), tree);
  }

  return node;
};

const addNode = (tree, path, data) => {
  if (!data) return;

  const parent = findNode(tree, path);

  if (!parent) return;

  if (parent[data] && Object.keys(parent[data]).length) {
    parent[data].count += 1;
  } else {
    parent[data] = {
      count: 1,
    };
  }
};

const addBranch = (tree, str) => {
  if (!str || !str.length) return;

  for (let i = 0; i < str.length; i += 1) {
    const path = str.slice(0, i);
    const data = str[i];

    addNode(tree, path, data);
  }
};

const generateTree = (arr) => {
  const tree = {};
  if (!arr || !arr.length) return tree;

  console.time('list');
  [...Array(arr.length)].map((_, i) => addBranch(tree, arr[i]));
  console.timeEnd('list');

  return tree;
};

export default generateTree;
