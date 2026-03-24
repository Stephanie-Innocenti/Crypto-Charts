import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Link {
  label: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  readonly currentYear = signal(new Date().getFullYear());
  
  readonly links: Link[] = [
    { label: 'Privacy', url: '/privacy' },
    { label: 'Termini', url: '/termini' },
    { label: 'Cookie', url: '/cookie' },
    { label: 'Contatti', url: '/contatti' }
  ];
}
