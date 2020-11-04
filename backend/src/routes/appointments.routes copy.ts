import { Router } from 'express';
import { parseISO } from 'date-fns';


import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

//import ensuraAuthenticated from '../middlewares/ensuraAuthenticated';

const appointmentsRouter = Router();

//appointmentsRouter.use(ensuraAuthenticated)

const appointmentRepository = new AppointmentRepository();

//Rotas deve, somente:Receber a requisição, chamar outro arquivo, devolver uma resposta.

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {

  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentRepository);

    const appointment = createAppointment.execute({ provider, date: parseDate });

    return response.json(appointment)

  } catch (error) {
    return response.status(400).json({
      error: error.message
    });
  }
});

export default appointmentsRouter
