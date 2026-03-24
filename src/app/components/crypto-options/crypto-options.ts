import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Init } from 'v8';
import { CriptoPriceService } from '../../services/cripto-price-service';

@Component({
  selector: 'app-crypto-options',
  imports: [CommonModule, FormsModule],
  templateUrl: './crypto-options.html',
  styleUrl: './crypto-options.css',
})
export class CryptoOptions implements OnInit{
  coin: string = '';
  currency: string = '';
  days: string = '';

  coinOptions: string[] = [
    'bitcoin',

    'ethereum',

    'litecoin',

    'dogecoin',

    'cardano',

    'binancecoin',

    'solana',

    'polkadot',

    'ripple',


    'uniswap',

    'chainlink',

    'shiba-inu',

    'avalanche',

    'tron',
  ];

  currencyOptions: string[] = [
    'usd',

    'eur',

    'gbp',

    'jpy',

    'aud',

    'cad',

    'chf',

    'cny',

    'inr',

    'brl',
  ];

  daysOptions: string[] = ['7', '14', '30', '90', '180', '365'];
 constructor(private cryptoPriceService: CriptoPriceService) {}    
   ngOnInit(): void {
   this.coin = this.cryptoPriceService.coin;
   this.currency= this.cryptoPriceService.currency;
   this.days=this.cryptoPriceService.days;
  }
  onSubmit(){
    console.log("premuto", this.coin, " ", this.currency, " ", this.days)
    this.cryptoPriceService.updateCryptoOptions(
      this.coin, this.currency,this.days
    )
  }
 
}
