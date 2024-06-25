import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coffee } from '../data/coffee-data';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CoffeeHttpService {
	baseUrl = 'http://localhost:8000';
	constructor(private client: HttpClient) {}

	getAllBeans(): Observable<Coffee[]> {
		return this.client.get<Coffee[]>(`${this.baseUrl}/coffee`);
	}
}
