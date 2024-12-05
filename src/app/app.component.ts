import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import * as AOS from 'aos';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    PortfolioComponent,
    ReferencesComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  currentLang = '';
  isLanguageMenuOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: Location
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const pathLang = window.location.pathname.split('/')[1];

      const supportedLanguages = ['en', 'de', 'fr', 'es', 'pt', 'ar', 'ru', 'it', 'ko', 'hi', 'zh', 'ja'];

      if (supportedLanguages.includes(pathLang)) {
        this.currentLang = pathLang;
      } else {
        this.currentLang = '';
      }

      document.documentElement.lang = this.currentLang;
    }
  }

  ngOnInit() {
    AOS.init({
        duration: 1200,
        easing: 'ease-out-back',
        once: false,
        mirror: true,
        delay: 100
    });
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  switchLanguage(lang: string) {
    if (lang !== this.currentLang) {
      let newUrl = window.location.pathname.replace(/^\/(en|de|fr|es|pt|ar|ru|it|ko|hi|zh|ja)/, '');
      newUrl = `/${lang}${newUrl}`;

      this.location.replaceState(newUrl);
      document.documentElement.lang = lang;
      this.currentLang = lang;

      window.location.href = newUrl;
    }
  }
}
