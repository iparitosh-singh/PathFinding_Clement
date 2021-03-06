import React, { useCallback, useEffect, useState } from "react";
import Node from "./Node";
import Legends from "../Legend";
import Navbar from "../Navbar";
import Description from '../Discription'
import { BoardProps, gridNode } from "../../interfaces";
import {
  getNodeVistedOrder,
  aninimateVisitedNode,
  animatePath,
  redoAlgo,
  remakingGrid,
  animateMaze
} from '../animations'

import {
  changeNormal,
  getStatus,
  checkStart,
  checkFinish,
} from "../helper";

import useMemoizedCallback from "../../hooks/useMemoizedCallback";
import { nodeTypes, actionType } from "../../interfaces/constants";
import "./Board.scss";

export type NodeHandle = React.ElementRef<typeof Node>;

const Board: React.FC<BoardProps> = (props) => {
  const { height, width } = props;
  const [algoDone, setAlgoDone] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [nodePressed, setNodePressed] = useState<nodeTypes>(nodeTypes.NODE);
  const [selectedAlgo, setSelectedAlgo] = useState<number>(-1);
  const [selectedMaze, setSelectedMaze] = useState<number>(-1);
  const [grid, setGrid] = useState<gridNode[][]>([]);
  const [initStart, setInitStart] = useState({
    row: Math.floor(height / 2),
    col: Math.floor(width / 4),
  });
  const [initFinish, setInitFinsish] = useState({
    row: Math.floor(height / 2),
    col: Math.floor((3 * width) / 4),
  });

  const makeGrid = useCallback((): gridNode[][] => {
    const newGrid: gridNode[][] = [];
    for (let i = 0; i < height; i++) {
      const gridRow: gridNode[] = [];
      for (let j = 0; j < width; j++) {
        const node: gridNode = {
          row: i,
          col: j,
          ref: React.createRef<NodeHandle>(),
          isStart: false,
          isFinish: false,
        };
        gridRow.push(node);
      }
      newGrid.push(gridRow);
    }
    return newGrid;
  }, [height, width]);

  useEffect(() => {
    setGrid(makeGrid());
    setInitStart({
      row: Math.floor(height / 2),
      col: Math.floor(width / 4),
    });
    setInitFinsish({
      row: Math.floor(height / 2),
      col: Math.floor((3 * width) / 4),
    });
    setAlgoDone(false)
    setIsRunning(false)
  }, [makeGrid, height, width]);

  const handleMouseDown = useMemoizedCallback(
    (_: React.MouseEvent, row: number, col: number): void => {
      if (isRunning) return;
      const nodeState = getStatus(grid[row][col]);
      setNodePressed(nodeState);
      if (!checkStart(nodeState) && !checkFinish(nodeState)) {
        if (nodeState === nodeTypes.WALL)
          changeNormal(grid[row][col], nodeTypes.UNVISITED);
        else
          changeNormal(grid[row][col], nodeTypes.WALL);
      }
    },
    []
  );

  const handleMouseEnter = useMemoizedCallback(
    (event: React.MouseEvent, row: number, col: number): void => {
      if (event.buttons !== 1 || isRunning) return;
      const nodeState = getStatus(grid[row][col]);
      const currentSpecialNode: boolean = (checkStart(nodeState) || checkFinish(nodeState)) ? true : false

      if (!checkStart(nodePressed) && !checkFinish(nodePressed)) {
        if (!currentSpecialNode) {
          changeNormal(grid[row][col], nodeTypes.WALL, nodeTypes.UNVISITED);
        }
      }
      //if the start/finish node is pressed
      else {
        if(algoDone){
          if(nodeState !== nodeTypes.WALL){
            changeNormal(grid[row][col], nodePressed, nodeState);
            redoAlgo(grid, selectedAlgo, { row, col }, nodePressed, nodeState);
          }
        }
        else if(!currentSpecialNode) {
          changeNormal(grid[row][col], nodePressed, nodeState);
        }
      }
    },
    []
  );

  const handleMouseUp = useCallback((): void => {
    setNodePressed(nodeTypes.UNVISITED);
  }, []);

  const handleMouseLeave = useMemoizedCallback(
    (event: React.MouseEvent, row: number, col: number): void => {
      if (event.buttons !== 1 || isRunning) return;
      if (!checkStart(nodePressed) && !checkFinish(nodePressed)) return;
      const node = grid[row][col];
      if (!node.ref.current) return;

      //dont change if goinf out of the grid
      const prevStatus = node.ref.current.prevState;
      const nextElement = event.relatedTarget as HTMLElement;
      const nextNodeClasses = nextElement.className.split(" ")
      const specialNode = nextNodeClasses[0] !== "node"
      ||nextNodeClasses[1] === "start"
      ||nextNodeClasses[1] === "finish"

      if (specialNode) {
        setNodePressed(nodeTypes.UNVISITED);
        return;
      }
      if(!algoDone && !specialNode){
        changeNormal(node, prevStatus, nodeTypes.UNVISITED)
      }
    },
    []
  );

  const clearWallAndPath = (): void => {
    remakingGrid(actionType.resetFull, grid);
    setAlgoDone(false);
  };

  const handleRedoAlgo = (): void => {
    remakingGrid(actionType.reset, grid);
    setAlgoDone(false);
  };

  const handleVisualize = async (): Promise<void> => {
    if(selectedAlgo === -1){
      await animateMaze(grid, selectedMaze)
      setIsRunning(false)
      return
    }
    if (isRunning) return;
    setIsRunning(true);
    const { endReached, path, nodeVisitedOrder } = getNodeVistedOrder(
      selectedAlgo,
      grid
    );
    await aninimateVisitedNode(nodeVisitedOrder, grid, 1);
    if (endReached)
      await animatePath(path, grid, 2);
    setIsRunning(false);
    setAlgoDone(true);
  };

  const handleAlgoSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedAlgo(parseInt(event.target.value));
    setSelectedMaze(-1)
  };

  const handleMazeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMaze(parseInt(event.target.value))
    setSelectedAlgo(-1);
  }

  return (
    <>
      <Navbar
        handleMazeSelect={handleMazeSelect}
        handleAlgoSelect={handleAlgoSelect}
        handleRedoAlgo={handleRedoAlgo}
        handleVisualize={handleVisualize}
        handleReset={clearWallAndPath}
        selectedAlgo={selectedAlgo}
        selectedMaze={selectedMaze}
        isRunning={isRunning}
        algoDone={algoDone}

      />
      <div className="container">
        <Legends/>
        <Description selectedAlgo={selectedAlgo} selectedMaze={selectedMaze}/>
        <div
          className="grid"
          onMouseLeave={() => {
            setNodePressed(nodeTypes.UNVISITED);
          }}
        >
          {grid.map((row, rowInd) => {
            return (
              <div className="grid-row" key={rowInd}>
                {row.map((node, colInd) => {
                  const { row, col, ref } = node;
                  return (
                    <Node
                      isStart={initStart}
                      isFinish={initFinish}
                      ref={ref}
                      key={colInd}
                      row={row}
                      col={col}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onMouseUp={handleMouseUp}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
