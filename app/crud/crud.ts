import { Component } from '@angular/core';
import { CrudService }  from '../crud.service';
import { Employee }  from './employee';
import {NgbModal, ModalDismissReasons, NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector:'crud',
	templateUrl:'./app/crud/crud.html',
	providers:[CrudService]
})

export class CrudComponent {
	name:string = 'Crud Operation';
	employeeList:Employee[];
	closeResult: string;
	modalRef: NgbModalRef;
	id:number;
	firstName:string;
	lastName:string;
	email:string;
	designation:string;
	isSave:boolean;
	isUpdate:boolean;
	modalTitle:string;

	constructor(private _crudService:CrudService, private modalService: NgbModal) {
		this._crudService.getCustomer()
    	 	.subscribe(
	    	 	data => this.employeeList = data,
	    	 	err => console.log("err" +err),
	    	 	() => console.log('Finished')
    	 	);
	}

	/* Options for Modal */
	modalOptions : NgbModalOptions = {
		size:'lg'
	};

	createNew(content) {

		this.modalTitle = 'Create New Record';

		/* Toggling Actions */
		this.isSave = true;
		this.isUpdate = false;

		/* Trigger Modal */
		this.modalRef = this.modalService.open(content,this.modalOptions);
	    this.modalRef.result.then((result) => {
	      this.closeResult = `Closed with: ${result}`;
	    }, (reason) => {
	      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	    });

	    let len = this.employeeList.length;
	    let id = this.employeeList[len-1].id;
		this.id = ++id;
		this.firstName = '';
		this.lastName = '';
		this.email = '';
		this.designation = '';
	}

	save() {
		
		var object : Employee = {
			id:this.id,
			first_name:this.firstName,
			last_name:this.lastName,
			email:this.email,
			designation:this.designation
		};

		this.employeeList.push(object);

		/* Close Modal */
		this.modalRef.close();
	}

	edit(content, data) {

		this.modalTitle = 'Update '+data.first_name+ ' Record';

		/* Toggling Actions */
		this.isSave = false;
		this.isUpdate = true;
		
		/* Trigger Modal */
		this.modalRef = this.modalService.open(content,this.modalOptions);
	    this.modalRef.result.then((result) => {
	      this.closeResult = `Closed with: ${result}`;
	    }, (reason) => {
	      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	    });

		this.id = data.id;
		this.firstName = data.first_name;
		this.lastName = data.last_name;
		this.email = data.email;
		this.designation = data.designation;

	}

	update() {
		
		this.employeeList.forEach((key, index) => {
		    if(key.id === this.id) {
		    	this.employeeList[index].id = this.id;
		    	this.employeeList[index].first_name = this.firstName;
		    	this.employeeList[index].last_name = this.lastName;
		    	this.employeeList[index].email = this.email;
		    	this.employeeList[index].designation = this.designation;
		    }
		});

		/* Close Modal */
		this.modalRef.close();
	}

	delete(index) {
		this.employeeList.splice(index,1);
	}

	
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}
	
	

	


}