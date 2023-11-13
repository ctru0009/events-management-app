import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_URL } from '../constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// const IP = "localhost";

const G1_URL_BACKEND = '/api/v1/category/32182988';
const G2_URL_BACKEND = '/qian/api/v1';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient, private router: Router) {}

  getCategories() {
    let URL = G1_URL_BACKEND + '/list';
    return this.http.get(URL);
  }

  addCategory(newCategory: Object) {
    let URL = G1_URL_BACKEND + '/add';
    console.log('Event added');
    return this.http.post(URL, JSON.stringify(newCategory), httpOptions).pipe(
      catchError((error) => {
        console.log('Event error');
        if (error.status === 400) {
          this.router.navigate(['/invalid-data']);
        }
        return error;
      })
    );
  }

  deleteCategory(id: Object) {
    let URL = G1_URL_BACKEND + '/delete';
    return this.http
      .delete(URL, {
        headers: httpOptions.headers,
        body: JSON.stringify(id),
      })
      .pipe(
        catchError((error) => {
          if (error.status === 400) {
            this.router.navigate(['/invalid-data']);
          }
          return error;
        })
      );
  }

  updateCategory(categoryObject: Object) {
    let URL = G1_URL_BACKEND + '/update';
    return this.http.put(URL, JSON.stringify(categoryObject), httpOptions).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.router.navigate(['/invalid-data']);
        }
        return error;
      })
    );
  }

  getEventsWithCategoryId(categoryId: string) {
    let URL = `${G1_URL_BACKEND}/list-events-with-categoryID`;
    // put the categoryId into an body object
    return this.http.post(URL, { categoryId: categoryId }, httpOptions);
  }

  getG1Stats() {
    let URL = G1_URL_BACKEND + '/g1-stats';
    return this.http.get(URL);
  }

  addEvent(eventObj: Object) {
    let URL = G2_URL_BACKEND + '/add-events'; // match the URL in the backend
    return this.http.post(URL, eventObj, httpOptions); // send the event object to the backend
  }

  listEvents() {
    let URL = G2_URL_BACKEND + '/list-events';
    return this.http.get(URL); // get the list of events from the backend
  }

  deleteEvent(eventId: Object) {
    let URL = G2_URL_BACKEND + '/delete-event';
    return this.http.delete(URL, {
      headers: httpOptions.headers,
      body: eventId,
    }); // send the event id to the backend
  }

  displayEvent(eventId: string) {
    let URL = G2_URL_BACKEND + '/display-event';
    return this.http.get(URL + '/' + eventId); // send the event id to the backend
  }

  updateEvent(eventObj: Object) {
    console.log(eventObj);
    let URL = G2_URL_BACKEND + '/update-event';
    return this.http.put(URL, eventObj, httpOptions); // send the event object to the backend
  }

  getG2Stats() {
    let URL = G2_URL_BACKEND + '/g2-stats';
    return this.http.get(URL);
  }
}
