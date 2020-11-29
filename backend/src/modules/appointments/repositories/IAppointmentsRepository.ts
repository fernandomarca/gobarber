import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {

  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;

  findAllInMounthProvider(data: IFindAllInMonthFromProvider): Promise<Appointment[]>;
}
