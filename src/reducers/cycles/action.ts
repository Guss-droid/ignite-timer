import { ICycleData } from "./reducer";

export enum ActionTypes {
  addCycle = "addCycle",
  markCycleAsFinished = "markCycleAsFinished",
  interruptCurrentCycle = "interruptCurrentCycle",
}

export function addNewCycleAction(newCycle: ICycleData) {
  return {
    type: ActionTypes.addCycle,
    payload: {
      newCycle,
    }
  }
}

export function interruptedCycleAction() {
  return {
    type: ActionTypes.interruptCurrentCycle,
  }
}

export function markCurrentCycleAction() {
  return {
    type: ActionTypes.markCycleAsFinished,
  }
}