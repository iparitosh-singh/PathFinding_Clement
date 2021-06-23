import {SortingNode, AlgoReturn} from '../../interfaces/sortingInterfaces'

const merge_array = (
    first: Array<SortingNode>,
    second: Array<SortingNode>
): Array<SortingNode> => {
    let merged: Array<SortingNode> = []
    while(first.length > 0 && second.length > 0){
        if(first[0].value < second[0].value){
            merged.push(first.shift()!)
        }
        else {
            merged.push(second.shift()!)
        }
    }
    while(first.length > 0){
        merged.push(first.shift()!)
    }

    while(second.length > 0){
        merged.push(second.shift()!)
    }

    return merged
}

const mergeSortRecursive = (array: Array<SortingNode>): Array<SortingNode> => {
    if(array.length === 1){
        return array
    }
    const middle = Math.floor(array.length / 2)
    let leftA: Array<SortingNode> = array.slice(0, middle)
    let rightA: Array<SortingNode> = array.slice(middle, array.length)
    if(!leftA[0]) leftA = [array[0]]
    if(!rightA[0]) rightA = [array[1]]
    return merge_array(mergeSortRecursive(leftA), mergeSortRecursive(rightA))
}

const merge_sort = (array: Array<SortingNode>): AlgoReturn => {
    const sortedArray = mergeSortRecursive(array)
    return {sortedArray: sortedArray}
}

export default merge_sort
