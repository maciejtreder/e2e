"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    create(newTask) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new this.taskModel(newTask);
            return yield task.save();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel.find().exec();
        });
    }
    update(updatedTask) {
        return __awaiter(this, void 0, void 0, function* () {
            const toUpdate = yield this.getById(updatedTask._id);
            toUpdate.name = updatedTask.name;
            toUpdate.status = updatedTask.status;
            return yield toUpdate.save();
        });
    }
    delete(toDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.getById(toDelete);
            return yield task.remove();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = (yield this.taskModel.find({ _id: id }).exec())[0];
            if (!model) {
                throw new common_1.HttpException('Task not found.', common_1.HttpStatus.NOT_FOUND);
            }
            return model;
        });
    }
};
TaskService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Task')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map