import {SortingNode, AlgoReturn} from '../../interfaces/sortingInterfaces'

const mergeArray = (
    array: Array<SortingNode>,
    start: number,
    middle: number,
    end: number,
    animations: any[],
    aux_array: Array<SortingNode>
) => {
    let i = start,
    k = start,
    j = middle + 1
    while(i <= middle && j <= end){
        if(aux_array[i].value <= aux_array[j].value){
            animations.push([k, aux_array[i]])
            array[k++] = aux_array[i++]
        }
        else{
            animations.push([k, aux_array[j]])
            array[k++] = aux_array[j++]
        }
    }
    while(i <= middle){
        animations.push([k, aux_array[i]])
        array[k++] = aux_array[i++]
    }
    while(j <= end){
        animations.push([j, aux_array[j]])
        array[k++] = aux_array[j++]
    }
}

const mergeSortRecursive = (
    array: Array<SortingNode>,
    start: number,
    end: number,
    animations: any[],
    aux_array: Array<SortingNode>
): void => {
    if(start === end)
        return
    const middle = Math.floor((end + start) / 2)

    mergeSortRecursive(aux_array, start, middle, animations, array)
    mergeSortRecursive(aux_array, middle + 1, end, animations, array)

    mergeArray(array, start, middle, end, animations, aux_array)
}


const merge_sort = (array: Array<SortingNode>): AlgoReturn => {
    const aux_array = array.slice()
    const animations: any[] = []
    mergeSortRecursive(array, 0, array.length - 1, animations, aux_array)
    return {sortedArray: array, animations}
}

export default merge_sort
