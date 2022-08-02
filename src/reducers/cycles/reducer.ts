import { ActionTypes } from "./action";

export interface ICycleData {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  finishedDate?: Date;
  interruptedDate?: Date;
}

interface ICyclesReducer {
  cycles: ICycleData[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: ICyclesReducer, action: any) {

  switch (action.type) {
    case ActionTypes.addCycle:

      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
    case ActionTypes.interruptCurrentCycle:

      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    case ActionTypes.markCycleAsFinished:

      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:

      return state;
  }
}