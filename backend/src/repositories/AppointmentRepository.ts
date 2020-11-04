/**
 * Retorna um agendamento se encontrado
 */
import { EntityRepository, Repository } from 'typeorm'

import Appointment from '../models/Appointments';
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

  public async findByDate(date: Date): Promise<Appointment | null> {

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }

}

//findByDate(date).then(response=>{});

export default AppointmentsRepository;
