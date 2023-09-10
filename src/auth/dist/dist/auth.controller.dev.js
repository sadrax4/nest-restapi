"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

exports.__esModule = true;
exports.AuthController = void 0;

var common_1 = require("@nestjs/common");

var AuthController =
/** @class */
function () {
  function AuthController(authservice) {
    this.authservice = authservice;
  }

  AuthController.prototype.signup = function (dto) {
    return this.authservice.signin(dto);
  };

  AuthController.prototype.signin = function (dto) {
    return this.authservice.signup(dto);
  };

  __decorate([common_1.Post('signup'), common_1.HttpCode(201), __param(0, common_1.Body())], AuthController.prototype, "signup");

  __decorate([common_1.Post('signin'), common_1.HttpCode(200), __param(0, common_1.Body())], AuthController.prototype, "signin");

  AuthController = __decorate([common_1.Controller('auth')], AuthController);
  return AuthController;
}();

exports.AuthController = AuthController;