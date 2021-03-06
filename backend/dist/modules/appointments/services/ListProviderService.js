"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _IUserRepositories = _interopRequireDefault(require("../../users/repositories/IUserRepositories"));

var _ICachaProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICachaProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepositories.default === "undefined" ? Object : _IUserRepositories.default, typeof _ICachaProvider.default === "undefined" ? Object : _ICachaProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProviderService {
  constructor(usersRepository, cacheProvider) {
    this.usersRepository = usersRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    user_id
  }) {
    let users = await this.cacheProvider.recover(`providers-list:${user_id}`); // let users = null;

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      });
    }

    await this.cacheProvider.save(`providers-list:${user_id}`, (0, _classTransformer.classToClass)(users));
    return users;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListProviderService;
exports.default = _default;