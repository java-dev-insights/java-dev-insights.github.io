# Algorithms

- [linkedin post](https://www.linkedin.com/pulse/list-data-structure-algorithms-mohammed-fazuluddin-q9hdc/)

**Search and sort algorithms** are foundational components of Data Structures and Algorithms (DSA). They dictate how efficiently data can be retrieved or arranged within a system. 

A comprehensive list of these algorithms is detailed below, broken down by their core types, mechanics, and computational complexities.

---

### 1. Searching Algorithms
Searching algorithms are used to find or retrieve a specific element from a collection of data. They generally fall into two categories: sequential searches and interval/tree-based searches.

| Algorithm                      | Best Time | Average/Worst Time                  | Space Complexity | Best Used For / Notes                                                                  |
| :----------------------------- | :-------- | :---------------------------------- | :--------------- | :------------------------------------------------------------------------------------- |
| **Linear Search**              | O(1)      | O(n)                                | O(1)             | Unsorted, small datasets. Checks every element sequentially.                           |
| **Binary Search**              | O(1)      | \(O(\log n)\)                       | O(1) (Iterative) | Sorted arrays or lists only. Divides search space in half each step.                   |
| **Jump Search**                | O(1)      | \(O(\sqrt{n})\)                     | O(1)             | Sorted arrays where jumping backward is cheaper than linear stepping.                  |
| **Interpolation Search**       | O(1)      | O(n) worst / \(O(\log \log n)\) avg | O(1)             | Sorted, uniformly distributed data. Mimics how we look up a word in a dictionary.      |
| **Exponential Search**         | O(1)      | \(O(\log n)\)                       | O(1)             | Sorted, unbounded or infinite arrays. Finds the range where the element resides first. |
| **Breadth-First Search (BFS)** | O(1)      | O(V + E)                            | O(V)             | Graphs and trees. Finds the shortest path in unweighted graphs level by level.         |
| **Depth-First Search (DFS)**   | O(1)      | O(V + E)                            | O(V)             | Graphs and trees. Explores as deep as possible along a branch before backtracking.     |

---

### 2. Comparison-Based Sorting Algorithms
These algorithms arrange data by comparing elements against one another using relational operators.

| Algorithm          | Best Time       | Average/Worst Time                | Space Complexity | Stable? | Core Mechanism                                                       |
| :----------------- | :-------------- | :-------------------------------- | :--------------- | :------ | :------------------------------------------------------------------- |
| **Bubble Sort**    | O(n)            | O(n²)                             | O(1)             | **Yes** | Repeatedly swaps adjacent elements if out of order.                  |
| **Selection Sort** | O(n²)           | O(n²)                             | O(1)             | **No**  | Finds the minimum element and swaps it to the front.                 |
| **Insertion Sort** | O(n)            | O(n²)                             | O(1)             | **Yes** | Inserts unsorted items into their correct place in a sorted sublist. |
| **Merge Sort**     | \(O(n \log n)\) | \(O(n \log n)\)                   | O(n)             | **Yes** | Divide-and-conquer; splits data recursively and merges them.         |
| **Quick Sort**     | \(O(n \log n)\) | \(O(n \log n)\) avg / O(n²) worst | \(O(\log n)\)    | **No**  | Partitions the array around a chosen pivot element.                  |
| **Heap Sort**      | \(O(n \log n)\) | \(O(n \log n)\)                   | O(1)             | **No**  | Builds a binary max/min heap to repeatedly extract the top item.     |

---

### 3. Non-Comparison-Based Sorting Algorithms

These algorithms achieve sub-quadratic linear time complexities, bypassing the \(\Omega(n \log n)\) comparison lower bound by exploiting specific assumptions about data types (like integers or bounded ranges).

- **Counting Sort**: Counts occurrences of distinct key values and uses arithmetic to map positions. **Time:** O(n + k) | **Space:** O(k) where k is the data range.
- **Radix Sort**: Processes numbers digit by digit from least to most significant using a stable sub-sort. **Time:** \(O(n \cdot k)\) | **Space:** O(n + k).
- **Bucket Sort**: Distributes elements across a set of buckets, individual buckets are sorted, then concatenated. **Time:** O(n + k) avg / O(n²) worst | **Space:** O(n).

---

### 4. Hybrid Sorting Algorithms
Modern language libraries rarely use raw versions of basic algorithms. They rely on hybrid approaches to capture the best real-world traits of different methods.

- **TimSort**: Combines Merge Sort and Insertion Sort. Highly efficient on real-world datasets that often contain pre-sorted segments. Standard in Python (`list.sort()`) and Java (`Arrays.sort`).
- **IntroSort**: Starts with Quick Sort, drops down to Heap Sort if the recursion depth exceeds a threshold, and switches to Insertion Sort for very tiny arrays. Standard in C++ STL (`std::sort`).
