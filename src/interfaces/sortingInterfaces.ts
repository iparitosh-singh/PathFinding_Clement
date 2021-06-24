
export interface SortingNode{
    value: number,
}

export interface AlgoReturn {
    sortedArray: Array<SortingNode>,
    animations: any[]
}
export interface ArrayNode {
  index: number,
  value: number,
  ref: React.RefObject<BarHandle>
}

export interface BarProps {
  height: number
  ref: React.RefObject<BarHandle>
}

export interface BarHandle {
  height: number
  changeHeight: (num: number) => void
}
