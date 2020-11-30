import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;


describe('List Provider Month Availability', () => {
  beforeEach(() => {

    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  });

  it("should be able to list the day availability from provider", async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, availability: false },
      { hour: 9, availability: false },
      { hour: 10, availability: false },
      { hour: 13, availability: true },
      { hour: 14, availability: false },
      { hour: 15, availability: false },
      { hour: 16, availability: true },
    ]));
  });

});
