import { useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { useCycleContext } from "../../Context/CycleContext";

import { CountdownContainer, Separator } from "./styles";

export function Countdown() {

  const {
    activeCycle,
    activeCycleId,
    setSecondsPassed,
    amountSecondsPassed,
    markCurrentCycleAsFinished
  } = useCycleContext()

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const secondsRemaining = currentSeconds % 60
  const minutesRemaining = Math.floor(currentSeconds / 60)

  const seconds = String(secondsRemaining).padStart(2, "0")
  const minutes = String(minutesRemaining).padStart(2, "0")

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, setSecondsPassed, markCurrentCycleAsFinished])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`
    }
  }, [minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}