interface BaseTreeNode<T> {
  children?: T[]
}

// 树转数组
export function treeToArray<T extends BaseTreeNode<T>>(tree: T[]): T[] {
  const result = []

  function traverse(node: T) {
    // 将当前节点添加到结果数组中
    result.push({ ...node, children: undefined })

    // 如果有子节点，则递归遍历子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => traverse(child))
    }
  }

  // 遍历整个树（支持多棵树情况）
  tree.forEach(rootNode => traverse(rootNode))

  return result
}

// 通过id查找树中的某个节点
export function findNodeById<T extends BaseTreeNode<T>>(tree: T[] = [], id: string | number, key: string = 'id'): T | null {
  for (const node of tree) {
    if (node[key] === id) {
      return node
    }

    if (node.children && node.children.length > 0) {
      const result = findNodeById(node.children, id)

      if (result) {
        return result
      }
    }
  }
  return null
}

// 查找树中的某个节点的父节点
export function findParentNode<T extends BaseTreeNode<T>>(tree: T[], targetValue: string | number, parent: T = null, key: string = 'uuid'): T | null {
  for (const node of tree) {
    if (node[key] === targetValue) {
      return parent
    }

    if (node.children && node.children.length > 0) {
      const result = findParentNode(node.children, targetValue, node)

      if (result) {
        return result
      }
    }
  }

  return null
}

// 通过子节点查找其根节点
export function findRootNodeByChild<T extends BaseTreeNode<T>>(tree: T[], targetValue: string | number, key: string = 'id'): T | null {
  let rootNode: T = null

  function findNode(node: T, parent: T) {
    if (node[key] === targetValue) {
      rootNode = parent || node
      return true
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        if (findNode(child, parent || node)) {
          return true
        }
      }
    }
    return false
  }

  for (const node of tree) {
    if (findNode(node, null)) {
      break
    }
  }

  return rootNode
}

// 获取树的所有叶子节点
export function getLastLevelNodes<T extends BaseTreeNode<T>>(tree: T[]) {
  const lastLevelNodes: T[] = []

  function traverse(node: T) {
    if (!node.children || node.children.length === 0) {
      lastLevelNodes.push(node)
    }
    else {
      node.children.forEach(child => traverse(child))
    }
  }

  tree.forEach(node => traverse(node))

  return lastLevelNodes
}

// 返回树中某个元素的索引路径
export function findPath<T extends BaseTreeNode<T>>(tree: T[], targetValue: string | number, key: string = 'id') {
  let path = []

  function helper(node: { [key: string]: any }, currentPath: any[]) {
    if (!node) {
      return false
    }

    if (node[key] === targetValue) {
      path = [...currentPath]
      return true
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        currentPath.push(i)

        if (helper(node.children[i], currentPath)) {
          return true
        }

        currentPath.pop()
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    if (helper(tree[i], [i])) {
      break
    }
  }

  return path
}

// 返回树中某个元素的路径节点
export function findPathNodes<T extends BaseTreeNode<T>>(tree: T[], targetValue: string | number, key: string = 'id') {
  let nodes = []

  function helper(node: { [key: string]: any }, currentPathNode: any[]) {
    if (!node) {
      return false
    }

    if (node[key] === targetValue) {
      nodes = [...currentPathNode]
      return true
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        currentPathNode.push(node.children[i])

        if (helper(node.children[i], currentPathNode)) {
          return true
        }

        currentPathNode.pop()
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    if (helper(tree[i], [tree[i]])) {
      break
    }
  }

  return nodes
}
