import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
export default class AppointmentsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute(
      {
        provider_id,
        date: parseDate
      }
    );

    return response.json(appointment);
  }

  // public async list(request: Request, response: Response): Promise<Response> {

  //   const appointments = new AppointmentRepository();
  //   // const appointments = await appointmentRepository.find();
  //   appointments.findByDate()
  //   const user = request.user;
  //   return response.json({ appointments, user });
  // }
}
