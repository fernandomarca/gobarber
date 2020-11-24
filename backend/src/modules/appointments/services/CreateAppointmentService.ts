import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  private appointmentRepository: IAppointmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentRepository: IAppointmentsRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;

/**
 * Dependency Inversion (SOLID);
 *
 * S:Single Responsability Principle
 * D: Dependency invertion Principle
 */
