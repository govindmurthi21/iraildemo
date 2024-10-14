import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import Message from './message';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly URL = 'ws://localhost:3000';
  private webSocketSubject = webSocket<string>(this.URL);
  public webSocket$ = this.webSocketSubject.asObservable();

  sendSpamNoSpam(spamOrNot: string): void {
    this.webSocketSubject.next(JSON.stringify(spamOrNot));
  }
}