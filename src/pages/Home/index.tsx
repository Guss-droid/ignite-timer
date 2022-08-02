import { HandPalm, Play } from "phosphor-react";

import * as zod from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Countdown } from "../../components/Countdown";
import { NewCycleForm } from "../../components/NewCycleForm";
import { useCycleContext } from "../../Context/CycleContext";

import { ButtonStartCountdown, ButtonStopCountdown, HomeContainer, } from "./styles";

export type FormTimerProps = zod.infer<typeof newFormTimerValidation>

const newFormTimerValidation = zod.object({
  task: zod.string().min(1, "Informe a tarefa."),
  minutesAmount: zod.number()
    .min(5, "O ciclo precisa ser no mínimo de 5 minutos.")
    .max(60, "O ciclo precisa ser no mínimo de 60 minutos."),
})

export function Home() {

  const { activeCycle, createNewCycle, interruptedCycle, } = useCycleContext()

  const newCycleForm = useForm<FormTimerProps>({
    resolver: zodResolver(newFormTimerValidation),
    defaultValues: {
      task: "",
      minutesAmount: 0
    }
  })

  const { watch, reset, handleSubmit } = newCycleForm
  const task = watch("task")

  function handleCreateNewTimer(data: FormTimerProps) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form
        action=""
        onSubmit={handleSubmit(handleCreateNewTimer)}
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ?
          <ButtonStopCountdown type="button" onClick={() => interruptedCycle()}>
            <HandPalm size={24} />
            Interromper
          </ButtonStopCountdown>
          :
          <ButtonStartCountdown type="submit" disabled={!task}>
            <Play size={24} />
            Começar
          </ButtonStartCountdown>
        }
      </form>
    </HomeContainer>
  )
}