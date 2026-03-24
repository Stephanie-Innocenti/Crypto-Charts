import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CriptoPriceService } from '../../services/cripto-price-service';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-crypto-price-chart',
  imports: [],
  templateUrl: './crypto-price-chart.html',
  styleUrl: './crypto-price-chart.css',
})
export class CryptoPriceChart implements AfterViewInit, OnDestroy {
  @ViewChild('cryptoChart') canvasRef!: ElementRef<HTMLCanvasElement>; // Template: #cryptoChart
  chart: Chart | null = null;
  private dataUpdateSubscription?: Subscription;

  constructor(
    private cryptoPriceService: CriptoPriceService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateChart(); // Initial load after DOM ready
    }
    this.dataUpdateSubscription = this.cryptoPriceService.getDataUpdated$().subscribe(() => {
      this.updateChart();
    });
  }

  ngOnDestroy(): void {
    this.dataUpdateSubscription?.unsubscribe();
    this.chart?.destroy();
  }

  updateChart(): void {
    if (!isPlatformBrowser(this.platformId) || !this.canvasRef?.nativeElement) {
      return;
    }

    this.cryptoPriceService.getCryptoPriceData().subscribe((data: any) => {
      const labels = data.prices.map((price: [number, number]) =>
        new Date(price[0]).toLocaleDateString(),
      );
      const prices = data.prices.map((price: [number, number]) => price[1]);

      this.chart?.destroy();

      const ctx = this.canvasRef.nativeElement.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: `${this.cryptoPriceService.coin} price (${this.cryptoPriceService.currency})`,
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
                tension: 0.1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: { maxTicksLimit: 10, maxRotation: 45 }, // Max 10 labels ruotati
                grace: '5%',
              },
              y: { beginAtZero: false },
            },
            plugins: {
              legend: { display: true },
              tooltip: { mode: 'index' },
            },
          },
        });
      }
    });
  }
}
