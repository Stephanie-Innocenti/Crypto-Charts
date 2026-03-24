import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { CryptoOptions } from './components/crypto-options/crypto-options';
import { CryptoPriceChart } from './components/crypto-price-chart/crypto-price-chart';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header,CryptoOptions,CryptoPriceChart,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-crypto-charts');
}
