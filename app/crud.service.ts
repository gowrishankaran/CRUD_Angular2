import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CrudService {
	constructor(private _http: Http) { }

  
    /* */
    getCustomer() {
       return this._http
         .get('./app/data/customer.json')
         .map(res => res.json());
    }



}