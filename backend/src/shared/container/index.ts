import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import '@modules/users/providers';
import './providers';


container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

