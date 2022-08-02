import { FormContainer, MinuteAmountsInput, TaskInput } from "./styles";


import { useCycleContext } from "../../Context/CycleContext";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {

  const { activeCycle } = useCycleContext()
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="suggestionsTask"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="suggestionsTask">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto Ré" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinuteAmountsInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}