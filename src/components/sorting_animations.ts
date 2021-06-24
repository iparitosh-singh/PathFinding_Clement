import {ArrayNode} from '../interfaces/sortingInterfaces'

export const animateMerge = (animations: any[], array: ArrayNode[]) => {
    for(let i = 0; i < animations.length; i++){
      const [index, height] = animations[i]
      setTimeout(() => {
        array[index].ref.current?.changeHeight(height.value)
      }, i*1 )
    }
}

export const animateQuickSort = (animations: any[], array: ArrayNode[]) => {
    for(let i = 0; i < animations.length; i++){
      const [first, second] = animations[i]
      setTimeout(() => {
        const h1 = array[first].ref.current?.height!
        const h2 = array[second].ref.current?.height!
        array[first].ref.current?.changeHeight(h2)
        array[second].ref.current?.changeHeight(h1)
      }, i*1 )
    }
}
