import { Component } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { catchError, retry, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe, formatDate, NgFor, NgIf} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import Message from './message';


@Component({
  selector: 'app-iraildemo2',
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
    NgFor,
    MatTableModule
  ],
  templateUrl: './iraildemo2.component.html',
  styleUrl: './iraildemo2.component.scss'
})
export class Iraildemo2Component {
  public messages: Message[] = [];
  spamFormControl = new FormControl('');
  displayedColumns: string[] = ['message', 'spamOrNot', 
    'kafkaTopic', 'kafkaPartition',
    'kafkaOffset', 'rabbitId',
    'rabbitQueue', 'rabbitTime',];

  constructor(
    private ws: WebSocketService
  ) {
    this.ws.webSocket$
      .pipe(
        catchError((error) => {
          this.messages = [];
          return throwError(() => new Error(error));
        }),
        retry({ delay: 5_000 }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: msg => {
          let mess: Message = JSON.parse(JSON.stringify(msg));
          this.messages = [mess, ...this.messages];
        }, // Called whenever there is a message from the server.
        error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
       });
  }

  public analyzeMessage ($event: Event) {
    this.ws.sendSpamNoSpam(this.spamFormControl.value || '');
  }
}

