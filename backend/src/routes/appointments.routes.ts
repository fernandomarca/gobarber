import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensuraAuthenticated from '../middlewares/ensuraAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensuraAuthenticated);

appointmentsRouter.get('/', async (request, response) => {

  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  const user = request.user;
  return response.json({ appointments, user });
});

appointmentsRouter.post('/', async (request, response) => {


  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute(
    {
      provider_id,
      date: parseDate
    }
  );

  return response.json(appointment)

});

export default appointmentsRouter

//console.log(request.user) disponibiliza o id do user para todas as rotas autenticadas.
