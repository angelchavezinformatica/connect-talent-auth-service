import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { Logger } from "src/contexts/shared/logger/domain";

interface PriorityTask<T> {
  data: T;
  priority: number;
  callback: () => Promise<void>; // Función de callback que se ejecuta al procesar la tarea
}

@Injectable()
export class PriorityScheduler<T> {
  private queue: PriorityTask<T>[] = [];
  private isProcessing = false;

  constructor(private readonly logger: Logger) {} // Inyectamos el logger

  addTask(data: T, priority: number, callback: () => Promise<void>) {
    this.queue.push({ data, priority, callback });
    this.queue.sort((a, b) => b.priority - a.priority); // Ordena la cola por prioridad

    // Usamos el logger en lugar de console.log
    this.logger.info(`Tarea añadida con prioridad ${priority}`, {
      attributes: { data },
    });

    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    this.logger.debug("Iniciando el procesamiento de la cola de prioridades.");

    while (this.queue.length > 0) {
      const currentTask = this.queue.shift();
      if (currentTask) {
        this.logger.info(`Procesando tarea con prioridad ${currentTask.priority}`, {
          attributes: { data: currentTask.data },
        });
        try {
          await currentTask.callback();
          this.logger.info(`Tarea completada con éxito para el elemento:`, {
            attributes: { data: currentTask.data },
          });
        } catch (error) {
          this.logger.error("Error al procesar la tarea", {
            attributes: { data: currentTask.data, error },
          });
        }
      }
    }

    this.isProcessing = false;
    this.logger.debug("Procesamiento de la cola completado.");
  }
}
