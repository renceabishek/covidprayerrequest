import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from '../model/config';
import { Request } from '../model/Request';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private behaviourSubject = new BehaviorSubject(null)
  requestSubjects = this.behaviourSubject.asObservable();

  constructor(private http: HttpClient) { }

  public setRequests(data) {
    this.behaviourSubject.next(data);
  }

  fetchPrayerRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${config.apiUrl}/prayer/request`);
  }

  createPrayerRequest(request): Observable<any> {
    return this.http.post(`${config.apiUrl}/prayer/request`,request, { responseType: 'text' })
  }
}
