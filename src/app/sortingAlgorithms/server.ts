"use server";
// src/app/sortingAlgorithms/algorithms.ts
// global array to sort
let array: number[] = [];
let arrayLength: number = 100;

// delay function
async function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

// get and set the array
export async function getSortingArray() {
    return array;
}

export async function setArray(newArray: number[]) {
    array.length = 0;
    array.push(...newArray);
}

// swap two elements in the array
export async function swap(i: number, j: number) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// randomize the array
export async function randomizeArray(arrayLength: number) {
    array.length = 0;
    for (let i = 0; i < arrayLength; i++) {
        array.push(Math.floor(Math.random() * arrayLength));
    }
}

// enum for the sorting algorithms
enum SortingAlgorithm {
    BubbleSort,
    SelectionSort,
    QuickSort,
    MergeSort,
    HeapSort,
    BogoSort
}

export async function getSortingAlgorithmEnum() {
    return SortingAlgorithm;
}

let currentSortingAlgorithm: SortingAlgorithm = SortingAlgorithm.BubbleSort;

export async function getCurrentSortingAlgorithm() {
    return currentSortingAlgorithm;
}   

// run the sorting algorithm
export async function runSortingAlgorithm(number : number) {
    switch (number) {
        case 0:
            currentSortingAlgorithm = SortingAlgorithm.BubbleSort;
            await bubbleSort();
            break;
        case 1:
            currentSortingAlgorithm = SortingAlgorithm.SelectionSort;
            await selectionSort();
            break;
        case 2:
            currentSortingAlgorithm = SortingAlgorithm.QuickSort;
            await quickSort();
            break;
        case 3:
            currentSortingAlgorithm = SortingAlgorithm.MergeSort;
            await mergeSort();
            break;
        case 4:
            currentSortingAlgorithm = SortingAlgorithm.HeapSort;
            await heapSort();
            break;
        case 5:
            currentSortingAlgorithm = SortingAlgorithm.BogoSort;
            await bogoSort();
            break;
    }
}

// sorting algorithms, all async, dont ask for the array, just use the global array

// bubble sort
export async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length-i-1; j++) {
            if (array[j] > array[j+1]) {
                swap(j, j+1);
            }
            await delay(10);
        }
    }
}

// selection sort
export async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i+1; j < array.length; j++) {
            if (array[min] > array[j]) {
                min = j;
            }
            await delay(10);
        }
        swap(i, min);
    }
}

// quick sort
export async function quickSort() {
    await quickSortHelper(0, array.length-1);
}

async function quickSortHelper(low: number, high: number) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSortHelper(low, pi-1);
        await quickSortHelper(pi+1, high);
    }
}

async function partition(low: number, high: number) {
    let pivot = array[high];
    let i = low-1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            swap(i, j);
        }
        await delay(10);
    }
    swap(i+1, high);
    return i+1;
}

// merge sort
export async function mergeSort() {
    await mergeSortHelper(0, array.length-1);
}

async function mergeSortHelper(low: number, high: number) {
    if (low < high) {
        let mid = Math.floor((low+high)/2);
        await mergeSortHelper(low, mid);
        await mergeSortHelper(mid+1, high);
        await merge(low, mid, high);
    }
}

async function merge(low: number, mid: number, high: number) {
    let n1 = mid-low+1;
    let n2 = high-mid;
    let left = [];
    let right = [];
    for (let i = 0; i < n1; i++) {
        left.push(array[low+i]);
    }
    for (let i = 0; i < n2; i++) {
        right.push(array[mid+1+i]);
    }
    let i = 0;
    let j = 0;
    let k = low;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        k++;
        await delay(10);
    }
    while (i < n1) {
        array[k] = left[i];
        i++;
        k++;
        await delay(10);
    }
    while (j < n2) {
        array[k] = right[j];
        j++;
        k++;
        await delay(10);
    }
}

// heap sort
export async function heapSort() {
    let n = array.length;
    for (let i = Math.floor(n/2)-1; i >= 0; i--) {
        await heapify(n, i);
    }
    for (let i = n-1; i >= 0; i--) {
        swap(0, i);
        await heapify(i, 0);
    }
}

async function heapify(n: number, i: number) {
    let largest = i;
    let l = 2*i+1;
    let r = 2*i+2;
    if (l < n && array[l] > array[largest]) {
        largest = l;
    }
    if (r < n && array[r] > array[largest]) {
        largest = r;
    }
    if (largest != i) {
        swap(i, largest);
        await heapify(n, largest);
    }
}

// bogo sort
export async function bogoSort() {
    while (!isSorted()) {
        shuffle();
        await delay(10);
    }
}

function isSorted() {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i-1]) {
            return false;
        }
    }
    return true;
}

function shuffle() {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        swap(i, j);
    }
}