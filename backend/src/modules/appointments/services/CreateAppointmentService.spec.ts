import "reflect-metadata";
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  });


  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121212121212',
      user_id: '121212121212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('121212121212');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentsDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentsDate,
      provider_id: '121212121212',
      user_id: '121212121212',
    });

    await expect(createAppointment.execute({
      date: appointmentsDate,
      provider_id: '121212121212',
      user_id: '121212121212',
    })).rejects.toBeInstanceOf(AppError);
  });
});
