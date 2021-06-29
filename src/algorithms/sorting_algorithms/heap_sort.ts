import {AlgoReturn} from '../../interfaces/sortingInterfaces'

const heapify = (array: Array<number>, last: number, current: number, animations: any[]) => {
    let largest = current
    let left = 2 * current + 1
    let right = 2 * current + 2

    if(left < last && array[left] > array[largest])
        largest = left

    if(right < last && array[right] > array[largest])
        largest = right

    if(largest !== current){
        animations.push([current, array[largest]])
        animations.push([largest, array[current]])
        const temp = array[current]
        array[current] = array[largest]
        array[largest] = temp
        heapify(array, last, largest, animations)
    }
}

const heap_sort = (array: Array<number>): AlgoReturn => {
    const animations: any[] = []
    for(let i = Math.floor(array.length / 2) - 1; i >= 0; i--){
        heapify(array, array.length, i, animations)
    }
    for(let i = array.length - 1; i > 0; i--){
        animations.push([0, array[i]])
        animations.push([i, array[0]])

        const temp = array[0]
        array[0] = array[i]
        array[i] = temp
        heapify(array, i, 0, animations)
    }
    return {animations, sortedArray: array}
}

export default heap_sort
