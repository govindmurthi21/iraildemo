import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Observable, throwError} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AsyncPipe, formatDate, NgFor, NgIf} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Station from './station';
import ConnectionTypes from './connection';
import { randomUUID } from 'crypto';


@Component({
  selector: 'app-iraildemo',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    NgFor 
  ],
  templateUrl: './iraildemo.component.html',
  styleUrl: './iraildemo.component.scss'
})
export class IraildemoComponent implements OnInit {
  fromStationControl = new FormControl('');
  toStationControl = new FormControl('');

  options: string[] = [];
  connections: ConnectionTypes.Connection[] = [];
  filteredFromStationOptions: Observable<string[]>;
  filteredToStationOptions: Observable<string[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get<Station[]>('http://localhost:8080/stations/').subscribe(response => {
      this.options = response.map((s) => s.name);
    });

    this.filteredFromStationOptions = this.fromStationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredToStationOptions = this.toStationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
  }

  public fetchRoutes($event: Event) {
    const url: string = `http://localhost:8080/connections/?from=${this.fromStationControl.value}&to=${this.toStationControl.value}&date=141024&time=1230&results=2`;
    this.http.get<ConnectionTypes.Connection[]>(url).subscribe(response => {
      let i: number = 0;
      response.forEach((c)=> {
        c.id = i.toLocaleString();
        i++;
        c.departure.stops.stop.forEach((s) => {
          s.id = i.toLocaleString();
          s.scheduledArrivalTime = formatDate(s.scheduledArrivalTime, 'dd/MM HH:mm', 'en-US');
          s.scheduledDepartureTime = formatDate(s.scheduledDepartureTime, 'dd/MM HH:mm', 'en-US');
          i++;
        })
      })
      this.connections = response;
    }, err => {
      console.log(err.message);
      alert(err.message);
    }, () => {
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
