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
  {
    id: 20,
    question: "What does this union-find based algorithm check for in an undirected graph?",
    codeSnippet: "def validTree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    parent = list(range(n))\n    rank = [0] * n\n    for x, y in edges:\n        if find(parent, x) == find(parent, y):\n            return False\n        union(parent, rank, x, y)\n    return True",
    options: [
      "Detects a cycle in the graph",
      "Checks if the graph is bipartite",
      "Determines if the graph forms a valid tree",
      "Finds the minimum spanning tree"
    ],
    correctAnswer: 2,
    dataStructure: "graph"
  },
  {
    id: 21,
    question: "What problem does this depth-first search (DFS) algorithm solve?",
    codeSnippet: "def numIslands(grid):\n    if not grid:\n        return 0\n    count = 0\n    rows, cols = len(grid), len(grid[0])\n    def dfs(r, c):\n        if 0 <= r < rows and 0 <= c < cols and grid[r][c] == '1':\n            grid[r][c] = '0'\n            dfs(r+1, c)\n            dfs(r-1, c)\n            dfs(r, c+1)\n            dfs(r, c-1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count +=1\n                dfs(r,c)\n    return count",
    options: [
      "Finds the largest island by area",
      "Counts the number of distinct island shapes",
      "Calculates the total perimeter of all islands",
      "Counts the number of connected landmasses (islands)"
    ],
    correctAnswer: 3,
    dataStructure: "graph"
  },
  {
    id: 22,
    question: "What does this topological sorting algorithm determine?",
    codeSnippet: "def canFinish(numCourses, prerequisites):\n    adj = [[] for _ in range(numCourses)]\n    indegree = [0] * numCourses\n    for course, prereq in prerequisites:\n        adj[prereq].append(course)\n        indegree[course] += 1\n    queue = deque([i for i in range(numCourses) if indegree[i] == 0])\n    count = 0\n    while queue:\n        node = queue.popleft()\n        count += 1\n        for neighbor in adj[node]:\n            indegree[neighbor] -= 1\n            if indegree[neighbor] == 0:\n                queue.append(neighbor)\n    return count == numCourses",
    options: [
      "Finds a valid order to complete all courses",
      "Checks if the graph has no cycles (all courses can be finished)",
      "Calculates the minimum time to complete all courses",
      "Finds the course with the most prerequisites"
    ],
    correctAnswer: 1,
    dataStructure: "graph"
  },
  {
    id: 23,
    question: "What is the purpose of this hash set-based algorithm?",
    codeSnippet: "def longestConsecutive(nums):\n    num_set = set(nums)\n    longest = 0\n    for num in num_set:\n        if num - 1 not in num_set:\n            current = num\n            current_streak = 1\n            while current + 1 in num_set:\n                current += 1\n                current_streak += 1\n            longest = max(longest, current_streak)\n    return longest",
    options: [
      "Finds the longest increasing subsequence",
      "Finds the longest sequence of consecutive integers",
      "Calculates the largest gap between elements",
      "Checks for duplicate elements"
    ],
    correctAnswer: 1,
    dataStructure: "array"
  },
  {
    id: 24,
    question: "What problem does this two-pointer technique solve?",
    codeSnippet: "def maxArea(height):\n    left, right = 0, len(height) - 1\n    max_area = 0\n    while left < right:\n        current_area = (right - left) * min(height[left], height[right])\n        max_area = max(max_area, current_area)\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return max_area",
    options: [
      "Finds two numbers that sum to a target",
      "Calculates the maximum water container area",
      "Finds the tallest bar in the histogram",
      "Determines the minimum height difference between bars"
    ],
    correctAnswer: 1,
    dataStructure: "array"
  },
  {
    id: 25,
    question: "What does this dynamic programming solution check?",
    codeSnippet: "def wordBreak(s, wordDict):\n    word_set = set(wordDict)\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(1, len(s)+1):\n        for j in range(i):\n            if dp[j] and s[j:i] in word_set:\n                dp[i] = True\n                break\n    return dp[len(s)]",
    options: [
      "Finds all valid word segmentations",
      "Calculates the minimum splits for segmentation",
      "Checks if the string can be fully segmented into dictionary words",
      "Counts the number of dictionary words in the string"
    ],
    correctAnswer: 2,
    dataStructure: "dynamic programming"
  },
  {
    id: 26,
    question: "What problem does this fast-slow pointer algorithm solve?",
    codeSnippet: "def hasCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False",
    options: [
      "Finds the middle node of a linked list",
      "Detects a cycle in a linked list",
      "Reverses a linked list in-place",
      "Checks if the list is palindrome"
    ],
    correctAnswer: 1,
    dataStructure: "linked list"
  },
  {
    id: 27,
    question: "What does this binary tree recursion accomplish?",
    codeSnippet: "def invertTree(root):\n    if root:\n        root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root",
    options: [
      "Calculates the tree height",
      "Checks if the tree is symmetric",
      "Creates a mirror image of the tree",
      "Counts the number of nodes"
    ],
    correctAnswer: 2,
    dataStructure: "tree"
  },
  {
    id: 28,
    question: "What is this stack-based algorithm checking?",
    codeSnippet: "def isValid(s):\n    stack = []\n    mapping = {')':'(', ']':'[', '}':'{'}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack",
    options: [
      "Balanced parentheses in an expression",
      "Valid mathematical expression evaluation",
      "Proper HTML tag nesting",
      "Palindrome string check"
    ],
    correctAnswer: 0,
    dataStructure: "stack"
  },
  {
    id: 29,
    question: "What does this two-pointer array algorithm calculate?",
    codeSnippet: "def trap(height):\n    left, right = 0, len(height)-1\n    left_max = right_max = water = 0\n    while left < right:\n        if height[left] < height[right]:\n            left_max = max(left_max, height[left])\n            water += left_max - height[left]\n            left += 1\n        else:\n            right_max = max(right_max, height[right])\n            water += right_max - height[right]\n            right -= 1\n    return water",
    options: [
      "Total rainwater trapped between bars",
      "Maximum height difference between bars",
      "Largest container area",
      "Longest non-decreasing subsequence"
    ],
    correctAnswer: 0,
    dataStructure: "array"
  },
  {
    id: 30,
    question: "What does this heap-based algorithm solve?",
    codeSnippet: "def mergeKLists(lists):\n    heap = []\n    for i in range(len(lists)):\n        if lists[i]:\n            heapq.heappush(heap, (lists[i].val, i))\n    dummy = curr = ListNode(0)\n    while heap:\n        val, i = heapq.heappop(heap)\n        curr.next = ListNode(val)\n        curr = curr.next\n        if lists[i].next:\n            lists[i] = lists[i].next\n            heapq.heappush(heap, (lists[i].val, i))\n    return dummy.next",
    options: [
      "Finds the median of k sorted arrays",
      "Merges k sorted linked lists into one",
      "Finds the kth smallest element",
      "Sorts a nearly sorted array"
    ],
    correctAnswer: 1,
    dataStructure: "heap"
  },
  {
    id: 31,
    question: "What does this dynamic programming algorithm compute?",
    codeSnippet: "def climbStairs(n):\n    if n == 1:\n        return 1\n    dp = [0]*(n+1)\n    dp[1] = 1\n    dp[2] = 2\n    for i in range(3, n+1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]",
    options: [
      "Minimum cost to climb stairs",
      "Number of distinct ways to climb stairs",
      "Longest increasing path in stairs",
      "Maximum height reachable"
    ],
    correctAnswer: 1,
    dataStructure: "dynamic programming"
  },
  ];