import {ArrayNode} from '../interfaces/sortingInterfaces'

export const animateSort = (animations: any[], array: ArrayNode[]) => {
    for(let i = 0; i < animations.length; i++){
      const [index, height] = animations[i]
      setTimeout(() => {
        array[index].ref.current?.changeHeight(height)
      }, i*1 )
    }
}

