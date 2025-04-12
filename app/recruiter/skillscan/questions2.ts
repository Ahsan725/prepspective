export interface Question {
    id: number;
    question: string;
    codeSnippet?: string;
    options: string[];
    correctAnswer: number;
    dataStructure: string;
  }
  
export const questions: Question[] =[
    {
      "id": 20,
      "question": "What does this union-find based algorithm check for in an undirected graph?",
      "codeSnippet": "def validTree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    parent = list(range(n))\n    rank = [0] * n\n    for x, y in edges:\n        if find(parent, x) == find(parent, y):\n            return False\n        union(parent, rank, x, y)\n    return True",
      "options": [
        "Detects a cycle in the graph",
        "Checks if the graph is bipartite",
        "Determines if the graph forms a valid tree",
        "Finds the minimum spanning tree"
      ],
      "correctAnswer": 2,
      "dataStructure": "graph"
    },
    {
      "id": 21,
      "question": "What problem does this depth-first search (DFS) algorithm solve?",
      "codeSnippet": "def numIslands(grid):\n    if not grid:\n        return 0\n    count = 0\n    rows, cols = len(grid), len(grid[0])\n    def dfs(r, c):\n        if 0 <= r < rows and 0 <= c < cols and grid[r][c] == '1':\n            grid[r][c] = '0'\n            dfs(r+1, c)\n            dfs(r-1, c)\n            dfs(r, c+1)\n            dfs(r, c-1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count +=1\n                dfs(r,c)\n    return count",
      "options": [
        "Finds the largest island by area",
        "Counts the number of distinct island shapes",
        "Calculates the total perimeter of all islands",
        "Counts the number of connected landmasses (islands)"
      ],
      "correctAnswer": 3,
      "dataStructure": "graph"
    },
    {
      "id": 22,
      "question": "What does this topological sorting algorithm determine?",
      "codeSnippet": "def canFinish(numCourses, prerequisites):\n    adj = [[] for _ in range(numCourses)]\n    indegree = [0] * numCourses\n    for course, prereq in prerequisites:\n        adj[prereq].append(course)\n        indegree[course] += 1\n    queue = deque([i for i in range(numCourses) if indegree[i] == 0])\n    count = 0\n    while queue:\n        node = queue.popleft()\n        count += 1\n        for neighbor in adj[node]:\n            indegree[neighbor] -= 1\n            if indegree[neighbor] == 0:\n                queue.append(neighbor)\n    return count == numCourses",
      "options": [
        "Finds a valid order to complete all courses",
        "Checks if the graph has no cycles (all courses can be finished)",
        "Calculates the minimum time to complete all courses",
        "Finds the course with the most prerequisites"
      ],
      "correctAnswer": 1,
      "dataStructure": "graph"
    },
    {
      "id": 23,
      "question": "What is the purpose of this hash set-based algorithm?",
      "codeSnippet": "def longestConsecutive(nums):\n    num_set = set(nums)\n    longest = 0\n    for num in num_set:\n        if num - 1 not in num_set:\n            current = num\n            current_streak = 1\n            while current + 1 in num_set:\n                current += 1\n                current_streak += 1\n            longest = max(longest, current_streak)\n    return longest",
      "options": [
        "Finds the longest increasing subsequence",
        "Finds the longest sequence of consecutive integers",
        "Calculates the largest gap between elements",
        "Checks for duplicate elements"
      ],
      "correctAnswer": 1,
      "dataStructure": "array"
    },
    {
      "id": 24,
      "question": "What problem does this two-pointer technique solve?",
      "codeSnippet": "def maxArea(height):\n    left, right = 0, len(height) - 1\n    max_area = 0\n    while left < right:\n        current_area = (right - left) * min(height[left], height[right])\n        max_area = max(max_area, current_area)\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return max_area",
      "options": [
        "Finds two numbers that sum to a target",
        "Calculates the maximum water container area",
        "Finds the tallest bar in the histogram",
        "Determines the minimum height difference between bars"
      ],
      "correctAnswer": 1,
      "dataStructure": "array"
    },
    {
      "id": 25,
      "question": "What does this dynamic programming solution check?",
      "codeSnippet": "def wordBreak(s, wordDict):\n    word_set = set(wordDict)\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(1, len(s)+1):\n        for j in range(i):\n            if dp[j] and s[j:i] in word_set:\n                dp[i] = True\n                break\n    return dp[len(s)]",
      "options": [
        "Finds all valid word segmentations",
        "Calculates the minimum splits for segmentation",
        "Checks if the string can be fully segmented into dictionary words",
        "Counts the number of dictionary words in the string"
      ],
      "correctAnswer": 2,
      "dataStructure": "dynamic programming"
    },
    {
      "id": 26,
      "question": "What problem does this fast-slow pointer algorithm solve?",
      "codeSnippet": "def hasCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False",
      "options": [
        "Finds the middle node of a linked list",
        "Detects a cycle in a linked list",
        "Reverses a linked list in-place",
        "Checks if the list is palindrome"
      ],
      "correctAnswer": 1,
      "dataStructure": "linked list"
    },
    {
      "id": 27,
      "question": "What does this binary tree recursion accomplish?",
      "codeSnippet": "def invertTree(root):\n    if root:\n        root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root",
      "options": [
        "Calculates the tree height",
        "Checks if the tree is symmetric",
        "Creates a mirror image of the tree",
        "Counts the number of nodes"
      ],
      "correctAnswer": 2,
      "dataStructure": "tree"
    },
    {
      "id": 28,
      "question": "What is this stack-based algorithm checking?",
      "codeSnippet": "def isValid(s):\n    stack = []\n    mapping = {')':'(', ']':'[', '}':'{'}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack",
      "options": [
        "Balanced parentheses in an expression",
        "Valid mathematical expression evaluation",
        "Proper HTML tag nesting",
        "Palindrome string check"
      ],
      "correctAnswer": 0,
      "dataStructure": "stack"
    },
    {
      "id": 29,
      "question": "What does this two-pointer array algorithm calculate?",
      "codeSnippet": "def trap(height):\n    left, right = 0, len(height)-1\n    left_max = right_max = water = 0\n    while left < right:\n        if height[left] < height[right]:\n            left_max = max(left_max, height[left])\n            water += left_max - height[left]\n            left += 1\n        else:\n            right_max = max(right_max, height[right])\n            water += right_max - height[right]\n            right -= 1\n    return water",
      "options": [
        "Total rainwater trapped between bars",
        "Maximum height difference between bars",
        "Largest container area",
        "Longest non-decreasing subsequence"
      ],
      "correctAnswer": 0,
      "dataStructure": "array"
    },
    {
      "id": 30,
      "question": "What does this heap-based algorithm solve?",
      "codeSnippet": "def mergeKLists(lists):\n    heap = []\n    for i in range(len(lists)):\n        if lists[i]:\n            heapq.heappush(heap, (lists[i].val, i))\n    dummy = curr = ListNode(0)\n    while heap:\n        val, i = heapq.heappop(heap)\n        curr.next = ListNode(val)\n        curr = curr.next\n        if lists[i].next:\n            lists[i] = lists[i].next\n            heapq.heappush(heap, (lists[i].val, i))\n    return dummy.next",
      "options": [
        "Finds the median of k sorted arrays",
        "Merges k sorted linked lists into one",
        "Finds the kth smallest element",
        "Sorts a nearly sorted array"
      ],
      "correctAnswer": 1,
      "dataStructure": "heap"
    },
    {
      "id": 31,
      "question": "What does this dynamic programming algorithm compute?",
      "codeSnippet": "def climbStairs(n):\n    if n == 1:\n        return 1\n    dp = [0]*(n+1)\n    dp[1] = 1\n    dp[2] = 2\n    for i in range(3, n+1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]",
      "options": [
        "Minimum cost to climb stairs",
        "Number of distinct ways to climb stairs",
        "Longest increasing path in stairs",
        "Maximum height reachable"
      ],
      "correctAnswer": 1,
      "dataStructure": "dynamic programming"
    }
  ]