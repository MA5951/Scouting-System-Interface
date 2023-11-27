"use server";
// src/app/sortingAlgorithms/algorithms.ts
// global array to sort
let array: number[] = [];
let colorArray: string[] = []; // in hex
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

// randomize the array - generate a new array of numbers from 1 to arrayLength in random order
export async function randomizeArray(arrayLength: number) {
    array.length = 0;
    for (let i = 1; i <= arrayLength; i++) {
        array.push(i);
    }
    for (let i = 1; i <= arrayLength; i++) {
        let j = Math.floor(Math.random() * arrayLength);
        swap(i, j);
    }

    fillColorArray(arrayLength, "#ffffff");
}

// Set the color array
export async function fillColorArray(arrayLength: number, color: string) {
    colorArray = new Array(arrayLength).fill(color);
}

export async function setColorArrayExempt(colorPointerArray: string[][], backgroundColor: string) {
    // Ensure colorPointerArray is properly initialized
    if (!colorPointerArray || !Array.isArray(colorPointerArray)) {
        console.error("Invalid colorPointerArray");
        return;
    }

    for (let i = 0; i < colorPointerArray.length; i++) {
        // Ensure each entry in colorPointerArray is a valid array
        if (
            !colorPointerArray[i] ||
            !Array.isArray(colorPointerArray[i]) ||
            colorPointerArray[i].length !== 2
        ) {
            console.error(`Invalid entry in colorPointerArray at index ${i}`);
            continue;
        }

        var index: number = +colorPointerArray[i][0];

        // Ensure index is within bounds
        if (index < 0 || index >= colorArray.length) {
            console.error(`Invalid index in colorPointerArray at index ${i}`);
            continue;
        }

        colorArray.fill(backgroundColor);
        colorArray[index] = colorPointerArray[i][1];
    }
}

export async function getColorArray() {
    return colorArray;
}


// run the sorting algorithm
export async function runSortingAlgorithm(number : number) {
    switch (number) {
        case 0:
            await bubbleSort();
            break;
        case 1:
            await selectionSort();
            break;
        case 2:
            await quickSort();
            break;
        case 3:
            await mergeSort();
            break;
        case 4:
            await heapSort();
            break;
        case 5:
            await bogoSort();
            break;
    }
}

// sorting algorithms, all async, dont ask for the array, just use the global array

// bubble sort
export async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                await setColorArrayExempt([
                    [j.toString(), "#7CFC00"],
                    [(j + 1).toString(), "#7CFC00"],
                    [(j + 2).toString(), "#7CFC00"], // Highlight the next comparison
                    [(i).toString(), "#7CFC00"]
                ], "#ffffff");
            } else {
                await setColorArrayExempt([
                    [j.toString(), "#7CFC00"],
                    [(j + 1).toString(), "#7CFC00"],
                    [(j + 2).toString(), "#FF4500"], // Highlight the next comparison in a different color
                    [(i).toString(), "#7CFC00"]
                ], "#ffffff");
            }
            await delay(10);
        }
    }
}

// selection sort
export async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[min] > array[j]) {
                min = j;
            }
            await setColorArrayExempt([
                [min.toString(), "#FF4500"], // Highlight the minimum element being compared
                [j.toString(), "#7CFC00"]
            ], "#ffffff");
            await delay(10);
        }
        swap(i, min);
    }
}

// quick sort
export async function quickSort() {
    await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(low: number, high: number) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    }
}

async function partition(low: number, high: number) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            swap(i, j);
        }
        await setColorArrayExempt([
            [high.toString(), "#FF4500"], // Highlight the pivot
            [i.toString(), "#7CFC00"],
            [j.toString(), "#7CFC00"]
        ], "#ffffff");
        await delay(10);
    }
    swap(i + 1, high);
    return i + 1;
}

// merge sort
export async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(low: number, high: number) {
    if (low < high) {
        let mid = Math.floor((low + high) / 2);
        await mergeSortHelper(low, mid);
        await mergeSortHelper(mid + 1, high);
        await merge(low, mid, high);
    }
}

async function merge(low: number, mid: number, high: number) {
    let n1 = mid - low + 1;
    let n2 = high - mid;
    let left = [];
    let right = [];
    for (let i = 0; i < n1; i++) {
        left.push(array[low + i]);
    }
    for (let i = 0; i < n2; i++) {
        right.push(array[mid + 1 + i]);
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
        await setColorArrayExempt([
            [low.toString(), "#FF4500"], // Highlight the start of the merging
            [mid.toString(), "#FF4500"], // Highlight the middle of the merging
            [high.toString(), "#FF4500"], // Highlight the end of the merging
            [k.toString(), "#7CFC00"] // Highlight the position where the merging is happening
        ], "#ffffff");
        await delay(10);
    }
    while (i < n1) {
        array[k] = left[i];
        i++;
        k++;
        await setColorArrayExempt([
            [low.toString(), "#FF4500"],
            [mid.toString(), "#FF4500"],
            [high.toString(), "#FF4500"],
            [k.toString(), "#7CFC00"]
        ], "#ffffff");
        await delay(10);
    }
    while (j < n2) {
        array[k] = right[j];
        j++;
        k++;
        await setColorArrayExempt([
            [low.toString(), "#FF4500"],
            [mid.toString(), "#FF4500"],
            [high.toString(), "#FF4500"],
            [k.toString(), "#7CFC00"]
        ], "#ffffff");
        await delay(10);
    }
}

// heap sort
export async function heapSort() {
    let n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    for (let i = n - 1; i >= 0; i--) {
        swap(0, i);
        await heapify(i, 0);
    }
}

async function heapify(n: number, i: number) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    if (l < n && array[l] > array[largest]) {
        largest = l;
    }
    if (r < n && array[r] > array[largest]) {
        largest = r;
    }
    if (largest != i) {
        swap(i, largest);
        await setColorArrayExempt([
            [i.toString(), "#7CFC00"],
            [largest.toString(), "#FF4500"] // Highlight the swapped element
        ], "#ffffff");
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