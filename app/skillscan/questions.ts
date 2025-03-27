export interface Question {
    id: number;
    question: string;
    codeSnippet?: string;
    options: string[];
    correctAnswer: number;
    dataStructure: string;
  }
  
export const questions: Question[] = [
    {
      id: 1,
      question: "What is the time complexity of appending to a Python list?",
      codeSnippet: "my_list = [1, 2, 3]\nmy_list.append(4)",
      options: ["O(1) amortized", "O(n)", "O(log n)", "O(n^2)"],
      correctAnswer: 0,
      dataStructure: "array",
    },
    {
      id: 2,
      question: "What is the output of this set operation?",
      codeSnippet: "set1 = {1, 2, 3}\nset2 = {3, 4, 5}\nprint(set1 & set2)",
      options: ["{3}", "{1, 2, 4, 5}", "Error", "{ }"],
      correctAnswer: 0,
      dataStructure: "hash-table",
    },
    {
      id: 3,
      question: "What does this binary tree traversal output?",
      codeSnippet: "def traverse(root):\n    if root:\n        print(root.val)\n        traverse(root.left)\n        traverse(root.right)",
      options: ["In-order", "Pre-order", "Post-order", "Level-order"],
      correctAnswer: 1,
      dataStructure: "tree",
    },
    {
      id: 4,
      question: "What is the time complexity of this linked list operation?",
      codeSnippet: "current = head\nwhile current:\n    current = current.next\nreturn current",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      dataStructure: "linked-list",
    },
    {
      id: 5,
      question: "Which implementation is correct for BFS?",
      codeSnippet: "from collections import deque\n\ndef bfs(graph, start):\n    queue = deque([start])\n    visited = set()\n    while queue:\n        node = queue.popleft()\n        # ...",
      options: ["Stack-based", "Queue-based", "Heap-based", "Recursive"],
      correctAnswer: 1,
      dataStructure: "graph",
    },
    {
      id: 6,
      question: "What does this heap operation achieve?",
      codeSnippet: "import heapq\nheap = [3, 1, 4, 1, 5]\nheapq.heapify(heap)",
      options: ["Creates max-heap", "Creates min-heap", "Sorts the list", "Reverses order"],
      correctAnswer: 1,
      dataStructure: "heap",
    },
    {
      id: 7,
      question: "What is the result of these stack operations?",
      codeSnippet: "stack = []\nstack.append(1)\nstack.append(2)\nstack.pop()\nprint(stack[-1])",
      options: ["1", "2", "Error", "None"],
      correctAnswer: 0,
      dataStructure: "stack",
    },
    {
      id: 8,
      question: "Which graph representation is this?",
      codeSnippet: "graph = {\n    'A': ['B', 'C'],\n    'B': ['D'],\n    'C': ['E'],\n    'D': [],\n    'E': []\n}",
      options: ["Adjacency Matrix", "Edge List", "Adjacency List", "Incidence Matrix"],
      correctAnswer: 2,
      dataStructure: "graph",
    },
    {
      id: 9,
      question: "What does this list comprehension create?",
      codeSnippet: "matrix = [[i*j for j in range(3)] for i in range(3)]",
      options: [
        "3x3 identity matrix",
        "Multiplication table",
        "Diagonal matrix",
        "Transposed matrix"
      ],
      correctAnswer: 1,
      dataStructure: "array",
    },
    {
      id: 10,
      question: "What is the output of this deque operation?",
      codeSnippet: "from collections import deque\nd = deque([1, 2, 3])\nd.appendleft(0)\nd.pop()\nprint(d)",
      options: [
        "deque([0, 1, 2])",
        "deque([0, 1, 3])",
        "deque([1, 2, 3])",
        "deque([0, 2, 3])"
      ],
      correctAnswer: 0,
      dataStructure: "queue",
    },
    {
      id: 11,
      question: "What is the purpose of this dictionary pattern?",
      codeSnippet: "from collections import defaultdict\nd = defaultdict(list)\nfor k, v in pairs:\n    d[k].append(v)",
      options: [
        "Count occurrences",
        "Group values by key",
        "Create a hash table",
        "Sort key-value pairs"
      ],
      correctAnswer: 1,
      dataStructure: "hash-table",
    },
    {
      id: 12,
      question: "What tree property does this code verify?",
      codeSnippet: "def is_balanced(root):\n    if not root:\n        return True\n    left = height(root.left)\n    right = height(root.right)\n    return abs(left - right) <= 1",
      options: [
        "Complete tree",
        "Full binary tree",
        "Height-balanced",
        "Perfect binary tree"
      ],
      correctAnswer: 2,
      dataStructure: "tree",
    },
    {
      id: 13,
      question: "What does this heapq operation do?",
      codeSnippet: "import heapq\nnums = [3, 1, 4, 1, 5, 9]\nprint(heapq.nsmallest(3, nums))",
      options: [
        "[1, 1, 3]",
        "[3, 4, 5]",
        "[9, 5, 4]",
        "[1, 3, 4]"
      ],
      correctAnswer: 0,
      dataStructure: "heap",
    },
    {
      id: 14,
      question: "What linked list operation is this?",
      codeSnippet: "def reverse(head):\n    prev = None\n    current = head\n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    return prev",
      options: [
        "Find middle node",
        "Detect cycle",
        "Reverse list",
        "Remove duplicates"
      ],
      correctAnswer: 2,
      dataStructure: "linked-list",
    },
    {
      id: 15,
      question: "What queue behavior is demonstrated?",
      codeSnippet: "from queue import Queue\nq = Queue()\nq.put(1)\nq.put(2)\nprint(q.get())",
      options: [
        "LIFO (Last-In-First-Out)",
        "FIFO (First-In-First-Out)",
        "Priority ordering",
        "Random access"
      ],
      correctAnswer: 1,
      dataStructure: "queue",
  },
  {
    id: 16,
    question:
      "What is the time complexity of the following sliding window algorithm for finding the longest substring without repeating characters?",
    codeSnippet:
      "def lengthOfLongestSubstring(s):\n    charIndex = {}\n    left = 0\n    maxLen = 0\n    for right, char in enumerate(s):\n        if char in charIndex and charIndex[char] >= left:\n            left = charIndex[char] + 1\n        charIndex[char] = right\n        maxLen = max(maxLen, right - left + 1)\n    return maxLen",
    options: ["O(n)", "O(n²)", "O(n log n)", "O(2ⁿ)"],
    correctAnswer: 0,
    dataStructure: "string",
  },
  {
    id: 17,
    question:
      "Which tree traversal order does the following serialization algorithm use?",
    codeSnippet:
      "def serialize(root):\n    def helper(node):\n        if not node:\n            return ['#']\n        return [str(node.val)] + helper(node.left) + helper(node.right)\n    return ' '.join(helper(root))",
    options: ["In-order", "Pre-order", "Post-order", "Level-order"],
    correctAnswer: 1,
    dataStructure: "tree",
  },
  {
    id: 18,
    question:
      "What is the time complexity of the following dynamic programming solution for the Longest Increasing Subsequence problem?",
    codeSnippet:
      "def lengthOfLIS(nums):\n    if not nums:\n        return 0\n    dp = [1] * len(nums)\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
    correctAnswer: 2,
    dataStructure: "array",
  },
  {
    id: 19,
    question:
      "What is the time complexity of the following Dijkstra's algorithm implementation using a min-heap?",
    codeSnippet:
      "def dijkstra(graph, start):\n    import heapq\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    heap = [(0, start)]\n    while heap:\n        current_distance, current_node = heapq.heappop(heap)\n        if current_distance > distances[current_node]:\n            continue\n        for neighbor, weight in graph[current_node]:\n            distance = current_distance + weight\n            if distance < distances[neighbor]:\n                distances[neighbor] = distance\n                heapq.heappush(heap, (distance, neighbor))\n    return distances",
    options: [
      "O((V+E) log V)",
      "O(V²)",
      "O(V log V)",
      "O(E log V)",
    ],
    correctAnswer: 0,
    dataStructure: "graph",
  },
  {
    id: 20,
    question:
      "What does the following union-find based algorithm check for in an undirected graph?",
    codeSnippet:
      "def find(parent, i):\n    if parent[i] != i:\n        parent[i] = find(parent, parent[i])\n    return parent[i]\n\n\ndef union(parent, rank, x, y):\n    xroot = find(parent, x)\n    yroot = find(parent, y)\n    if rank[xroot] < rank[yroot]:\n        parent[xroot] = yroot\n    elif rank[xroot] > rank[yroot]:\n        parent[yroot] = xroot\n    else:\n        parent[yroot] = xroot\n        rank[xroot] += 1\n\n\ndef validTree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    parent = list(range(n))\n    rank = [0] * n\n    for x, y in edges:\n        if find(parent, x) == find(parent, y):\n            return False\n        union(parent, rank, x, y)\n    return True",
    options: [
      "Detects a cycle in the graph",
      "Checks if the graph is bipartite",
      "Determines if the graph forms a valid tree",
      "Finds the minimum spanning tree",
    ],
    correctAnswer: 2,
    dataStructure: "graph",
  },
  ];