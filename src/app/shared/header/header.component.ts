import { Component, HostListener, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  activeSection: string = '';
  menuOpen: boolean = false;
  animatingClose: boolean = false;
  closeAnimationStage: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setActive(section: string) {
    this.activeSection = section;
    this.closeMenuWithAnimation();
  }

  toggleMenu() {
    if (this.menuOpen) {
      this.closeMenuWithAnimation();
    } else {
      this.menuOpen = true;
    }
  }

  closeMenuWithAnimation() {
    this.animatingClose = true;
    this.closeAnimationStage = 1;

    setTimeout(() => {
      this.closeAnimationStage = 2;
    }, 100);

    setTimeout(() => {
      this.animatingClose = false;
      this.closeAnimationStage = 0;
      this.menuOpen = false;
    }, 200);
  }
}
