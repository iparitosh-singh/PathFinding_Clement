import  {AlgoReturn} from '../../interfaces/sortingInterfaces'

const partition = (array: number[], low: number, high: number, animations: any[]): number => {
    const partition = array[high]
    let index = low
    for(let i = index; i < high; i++){
        if(array[i] < partition){
            animations.push([index, array[i]])
            animations.push([i, array[index]])
            const temp = array[i]
            array[i] = array[index]
            array[index] = temp
            index += 1
        }
    }

    animations.push([index, array[high]])
    animations.push([high, array[index]])
    const temp = array[high]
    array[high] = array[index]
    array[index] = temp
    return index
}

const quickSortRecurive = (
    array: Array<number>,
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

const quick_sort = (array: Array<number>): AlgoReturn  => {
    const animations : any[] = []
    quickSortRecurive(array, 0, array.length - 1, animations)
    return {sortedArray: array, animations}
}

export default quick_sort


