import {SortingNode, AlgoReturn} from '../../interfaces/sortingInterfaces'

const partition = (array: SortingNode[], low: number, high: number, animations: any[]): number => {
    const partition = array[high].value
    let index = low
    for(let i = index; i < high; i++){
        if(array[i].value < partition){
            [array[i], array[index]] = [array[index], array[i]]
            animations.push([i , index])
            index += 1
        }
    }
    [array[index], array[high]] = [array[high], array[index]]
    animations.push([high , index])
    return index
}

const quickSortRecurive = (
    array: Array<SortingNode>,
    start: number,
    end: number,
    animations: any[]
): void => {
    if(start >= end)
        return;
    const midIndex = partition(array, start, end, animations)

    quickSortRecurive(array, start, midIndex - 1, animations)
    quickSortRecurive(array, midIndex + 1, end, animations)
}

const quick_sort = (array: Array<SortingNode>): AlgoReturn  => {
    const animations : any[] = []
    quickSortRecurive(array, 0, array.length - 1, animations)
    return {sortedArray: array, animations}
}

export default quick_sort


