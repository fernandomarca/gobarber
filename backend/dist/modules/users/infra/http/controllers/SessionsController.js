"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//index,show,create,update,delete
class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticatedUser = _tsyringe.container.resolve(_AuthenticateUserService.default);

    const {
      userWithoutPassword,
      token
    } = await authenticatedUser.execute({
      email,
      password
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(userWithoutPassword),
      token
    });
  }

} // const user =
// {
//   ...userWithoutPassword,
//   password: undefined,
// }


exports.default = SessionsController;