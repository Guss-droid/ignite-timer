import ptBR from "date-fns/locale/pt-BR";
import { formatDistanceToNow } from "date-fns";
import { useCycleContext } from "../../Context/CycleContext";

import { HistoryContainer, HistoryList, Status } from "./styled";

export function History() {
  const { cycles } = useCycleContext()

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutes} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </td>
                <td>
                  {cycle.finishedDate && <Status statusColor="green">Concluído</Status>}
                  {cycle.interruptedDate && <Status statusColor="red">Interrompido</Status>}
                  {(!cycle.finishedDate && !cycle.interruptedDate) && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}