import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const algorithms = {
  bubble: {
    name: "Bubble Sort",
    complexity: "O(n²)",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.",
    pseudocode: `function bubbleSort(arr):
  n = length(arr)
  for i from 0 to n-1:
    for j from 0 to n-i-1:
      if arr[j] > arr[j+1]:
        swap(arr[j], arr[j+1])
  return arr`,
    steps: [
      "Start with the first element",
      "Compare it with the next element",
      "If the first is greater, swap them",
      "Move to the next pair and repeat",
      "After each pass, the largest unsorted element bubbles to the end",
      "Continue until no swaps are needed",
    ],
    useCase: "Educational purposes, small datasets, nearly sorted data",
  },
  merge: {
    name: "Merge Sort",
    complexity: "O(n log n)",
    description: "Divides the array into halves, recursively sorts them, and merges the sorted halves.",
    pseudocode: `function mergeSort(arr):
  if length(arr) <= 1:
    return arr
  
  mid = length(arr) / 2
  left = mergeSort(arr[0:mid])
  right = mergeSort(arr[mid:])
  
  return merge(left, right)

function merge(left, right):
  result = []
  while left and right not empty:
    if left[0] <= right[0]:
      append left[0] to result
      remove left[0]
    else:
      append right[0] to result
      remove right[0]
  append remaining elements
  return result`,
    steps: [
      "Divide the array into two halves",
      "Recursively sort each half",
      "Merge the sorted halves back together",
      "During merge, compare elements from both halves",
      "Place smaller element first in result",
      "Continue until all elements are merged",
    ],
    useCase: "Stable sorting, linked lists, guaranteed O(n log n) performance",
  },
  quick: {
    name: "Quick Sort",
    complexity: "O(n log n) avg",
    description: "Selects a pivot element and partitions the array around it, recursively sorting the sub-arrays.",
    pseudocode: `function quickSort(arr, low, high):
  if low < high:
    pivotIndex = partition(arr, low, high)
    quickSort(arr, low, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, high)

function partition(arr, low, high):
  pivot = arr[high]
  i = low - 1
  for j from low to high-1:
    if arr[j] < pivot:
      i++
      swap(arr[i], arr[j])
  swap(arr[i+1], arr[high])
  return i + 1`,
    steps: [
      "Choose a pivot element (usually last element)",
      "Partition array: smaller elements left, larger right",
      "Recursively apply to left partition",
      "Recursively apply to right partition",
      "Pivot is now in its final sorted position",
      "Continue until all partitions are sorted",
    ],
    useCase: "General-purpose sorting, in-place sorting, average-case efficiency",
  },
  linear: {
    name: "Linear Search",
    complexity: "O(n)",
    description: "Sequentially checks each element until the target is found or the list ends.",
    pseudocode: `function linearSearch(arr, target):
  for i from 0 to length(arr)-1:
    if arr[i] == target:
      return i
  return -1  // not found`,
    steps: [
      "Start at the first element",
      "Compare with the target value",
      "If match found, return the index",
      "If not, move to next element",
      "Repeat until target is found or end is reached",
      "Return -1 if target not found",
    ],
    useCase: "Unsorted data, small datasets, single search operations",
  },
  binary: {
    name: "Binary Search",
    complexity: "O(log n)",
    description: "Efficiently searches a sorted array by repeatedly dividing the search interval in half.",
    pseudocode: `function binarySearch(arr, target):
  low = 0
  high = length(arr) - 1
  
  while low <= high:
    mid = (low + high) / 2
    
    if arr[mid] == target:
      return mid
    else if arr[mid] < target:
      low = mid + 1
    else:
      high = mid - 1
  
  return -1  // not found`,
    steps: [
      "Array must be sorted first",
      "Find the middle element",
      "If middle equals target, return index",
      "If target is smaller, search left half",
      "If target is larger, search right half",
      "Repeat until found or interval is empty",
    ],
    useCase: "Sorted data, frequent searches, large datasets",
  },
};

const Learn = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<keyof typeof algorithms>("bubble");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Mode</h1>
        <p className="text-muted-foreground">Deep dive into algorithm theory and implementation</p>
      </div>

      <Tabs value={selectedAlgo} onValueChange={(v) => setSelectedAlgo(v as keyof typeof algorithms)}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="bubble">Bubble</TabsTrigger>
          <TabsTrigger value="merge">Merge</TabsTrigger>
          <TabsTrigger value="quick">Quick</TabsTrigger>
          <TabsTrigger value="linear">Linear</TabsTrigger>
          <TabsTrigger value="binary">Binary</TabsTrigger>
        </TabsList>

        {Object.entries(algorithms).map(([key, algo]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{algo.name}</CardTitle>
                  <Badge variant="outline" className="text-base">
                    {algo.complexity}
                  </Badge>
                </div>
                <CardDescription className="text-base">{algo.description}</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Pseudocode */}
              <Card>
                <CardHeader>
                  <CardTitle>Pseudocode</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full rounded-lg bg-[hsl(var(--code-bg))] p-4">
                    <pre className="text-sm text-accent font-mono leading-relaxed whitespace-pre-wrap">
                      {algo.pseudocode}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Step-by-Step */}
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {algo.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                          {idx + 1}
                        </div>
                        <p className="flex-1 text-sm pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>When to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="p-4 rounded-lg bg-primary/10 border-l-4 border-primary">{algo.useCase}</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Learn;
