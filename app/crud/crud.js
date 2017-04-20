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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var crud_service_1 = require("../crud.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var CrudComponent = (function () {
    function CrudComponent(_crudService, modalService) {
        var _this = this;
        this._crudService = _crudService;
        this.modalService = modalService;
        this.name = 'Crud Operation';
        /* Options for Modal */
        this.modalOptions = {
            size: 'lg'
        };
        this._crudService.getCustomer()
            .subscribe(function (data) { return _this.employeeList = data; }, function (err) { return console.log("err" + err); }, function () { return console.log('Finished'); });
    }
    CrudComponent.prototype.createNew = function (content) {
        var _this = this;
        this.modalTitle = 'Create New Record';
        /* Toggling Actions */
        this.isSave = true;
        this.isUpdate = false;
        /* Trigger Modal */
        this.modalRef = this.modalService.open(content, this.modalOptions);
        this.modalRef.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        var len = this.employeeList.length;
        var id = this.employeeList[len - 1].id;
        this.id = ++id;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.designation = '';
    };
    CrudComponent.prototype.save = function () {
        var object = {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            designation: this.designation
        };
        this.employeeList.push(object);
        /* Close Modal */
        this.modalRef.close();
    };
    CrudComponent.prototype.edit = function (content, data) {
        var _this = this;
        this.modalTitle = 'Update ' + data.first_name + ' Record';
        /* Toggling Actions */
        this.isSave = false;
        this.isUpdate = true;
        /* Trigger Modal */
        this.modalRef = this.modalService.open(content, this.modalOptions);
        this.modalRef.result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        this.id = data.id;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.email = data.email;
        this.designation = data.designation;
    };
    CrudComponent.prototype.update = function () {
        var _this = this;
        this.employeeList.forEach(function (key, index) {
            if (key.id === _this.id) {
                _this.employeeList[index].id = _this.id;
                _this.employeeList[index].first_name = _this.firstName;
                _this.employeeList[index].last_name = _this.lastName;
                _this.employeeList[index].email = _this.email;
                _this.employeeList[index].designation = _this.designation;
            }
        });
        /* Close Modal */
        this.modalRef.close();
    };
    CrudComponent.prototype.delete = function (index) {
        this.employeeList.splice(index, 1);
    };
    CrudComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    return CrudComponent;
}());
CrudComponent = __decorate([
    core_1.Component({
        selector: 'crud',
        templateUrl: './app/crud/crud.html',
        providers: [crud_service_1.CrudService]
    }),
    __metadata("design:paramtypes", [crud_service_1.CrudService, ng_bootstrap_1.NgbModal])
], CrudComponent);
exports.CrudComponent = CrudComponent;
//# sourceMappingURL=crud.js.map