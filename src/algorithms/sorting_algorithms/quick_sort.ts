import {SortingNode, AlgoReturn} from '../../interfaces/sortingInterfaces'

const partition = (array: SortingNode[], low: number, high: number): number => {
    const partition = array[high].value
    let index = low
    for(let i = index; i < high; i++){
        if(array[i].value < partition){
            [array[i], array[index]] = [array[index], array[i]]
            index += 1
        }
    }
    [array[index], array[high]] = [array[high], array[index]]
    return index
}

const quickSortRecurive = (
    array: Array<SortingNode>,
    start: number,
    end: number
): void => {
    if(start >= end)
        return;
    const midIndex = partition(array, start, end)

    quickSortRecurive(array, start, midIndex - 1)
    quickSortRecurive(array, midIndex + 1, end)
}

const quick_sort = (array: Array<SortingNode>): AlgoReturn  => {
    quickSortRecurive(array, 0, array.length - 1)
    return {sortedArray: array}
}

export default quick_sort


