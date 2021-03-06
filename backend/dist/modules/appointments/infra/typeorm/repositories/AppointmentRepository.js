"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointments = _interopRequireDefault(require("../entities/Appointments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointments.default);
  }

  async findByDate(date, provider_id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
    });
    return findAppointment;
  }

  async findAllInMounthProvider({
    provider_id,
    month,
    year
  }) {
    const parseMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName},'MM-YYYY') = '${parseMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day
  }) {
    const parseMonth = String(month).padStart(2, '0');
    const parseDay = String(day).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName},'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`)
      },
      relations: ['user']
    });
    return appointments;
  }

  async create({
    provider_id,
    user_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
      user_id
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;