import { Module, Global } from '@nestjs/common';
import { PriorityScheduler } from './PriorityScheluder';


@Global() // Hacer el módulo global para que esté disponible en toda la aplicación
@Module({
  providers: [PriorityScheduler], // Agrega otros algoritmos aquí según los necesites
  exports: [PriorityScheduler],    // Exporta para que otros módulos puedan usarlos
})
export class AlgorithmsModule {}
