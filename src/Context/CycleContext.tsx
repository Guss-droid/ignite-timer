import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { addNewCycleAction, interruptedCycleAction, markCurrentCycleAction } from "../reducers/cycles/action";
import { cyclesReducer, ICycleData } from "../reducers/cycles/reducer";

interface IFormTimer {
  task: string;
  minutesAmount: number;
}

interface ICycleContextData {
  cycles: ICycleData[];
  amountSecondsPassed: number;
  activeCycleId: string | null;
  activeCycle: ICycleData | undefined;
  interruptedCycle: () => void;
  markCurrentCycleAsFinished: () => void;
  createNewCycle: (data: IFormTimer) => void;
  setSecondsPassed: (seconds: number) => void;
}

interface ICycleProvider {
  children: ReactNode;
}

const CyclesContext = createContext({} as ICycleContextData)

export function CycleProvider({ children }: ICycleProvider) {

  const [stateCycles, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  }, () => {
    const storedState = localStorage.getItem("igniteTimerCycles-1.0.0")

    if (storedState) {
      return JSON.parse(storedState)
    }
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  const { cycles, activeCycleId } = stateCycles
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  useEffect(() => {
    const stateJSON = JSON.stringify(stateCycles)

    localStorage.setItem("igniteTimerCycles-1.0.0", stateJSON)
  }, [stateCycles])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAction())
  }

  function createNewCycle(data: IFormTimer) {
    const id = String(new Date().getTime())

    const newCycle: ICycleData = {
      id,
      task: data.task,
      minutes: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setSecondsPassed(0)
  }

  function interruptedCycle() {
    dispatch(interruptedCycleAction())
  }

  return (
    <CyclesContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      createNewCycle,
      setSecondsPassed,
      interruptedCycle,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
    }}>
      {children}
    </CyclesContext.Provider>
  )
}

export const useCycleContext = () => useContext(CyclesContext)