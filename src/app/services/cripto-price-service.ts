import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CriptoPriceService {
  coin: string = 'bitcoin';
  currency: string = 'eur';
  days: string = '7';
  private apiUrl: string = this.generateApiUrl();
  private dateUpdateSubject = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  updateCryptoOptions(coin: string, currency: string, days: string) {
    this.coin = coin;
    this.currency = currency;
    this.days = days;
    this.generateApiUrl();

    this.dateUpdateSubject.next();
  }
  private generateApiUrl(): string {
    const days = Number(this.days);
    const now = new Date();
    const from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).getTime() / 1000;

    this.apiUrl = `https://api.coingecko.com/api/v3/coins/${this.coin}/market_chart?vs_currency=${this.currency}&days=${days}&interval=daily&precision=4`;
    console.log('Nuova API URL:', this.apiUrl);
    return this.apiUrl;
  }

  getCryptoPriceData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  //convert dataUpdateSubject to observable
  getDataUpdated$(): Observable<void> {
    return this.dateUpdateSubject.asObservable();
  }
}
