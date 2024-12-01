import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Location } from '@angular/common';  // Location-Service verwenden
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeroComponent } from './hero/hero.component';  // HeroComponent importieren
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
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portfolio';
  currentLang = ''; // Standard-Sprache wird beim Start erkannt
  isLanguageMenuOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: Location // Location-Service verwenden
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Hole den Sprachpräfix aus der URL, wenn vorhanden
      let pathLang = window.location.pathname.split('/')[1];

      // Unterstützte Sprachen
      const supportedLanguages = ['en', 'de', 'fr', 'es', 'pt', 'ar', 'ru', 'it', 'ko', 'hi', 'zh', 'ja'];

      console.log(`Aktuelle URL: ${window.location.pathname}`);
      console.log(`Analysierter Sprachpräfix: ${pathLang}`);

      // Überprüfe, ob das Sprachpräfix gültig ist
      if (supportedLanguages.includes(pathLang)) {
        this.currentLang = pathLang;
        console.log(`Unterstützte Sprache erkannt: ${this.currentLang}`);
      } else {
        this.currentLang = '';  // Keine Sprache, daher leer (kein Präfix)
        console.log(`Keine unterstützte Sprache in der URL gefunden, kein Präfix gesetzt.`);
      }

      // Setze die aktuelle Sprache im Dokument
      document.documentElement.lang = this.currentLang;
    }
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  switchLanguage(lang: string) {
    if (lang !== this.currentLang) {
      console.log(`Sprache wechseln: ${this.currentLang} → ${lang}`);
  
      // Entferne alle existierenden Sprachpräfixe und hänge das neue Präfix an
      let newUrl = window.location.pathname.replace(/^\/(en|de|fr|es|pt|ar|ru|it|ko|hi|zh|ja)/, '');
      newUrl = `/${lang}${newUrl}`;
  
      console.log(`Navigiere zu neuer URL: ${newUrl}`);
      this.location.replaceState(newUrl);  // Die URL wird ohne die Seite neu zu laden geändert
      document.documentElement.lang = lang;  // Aktualisiere das <html> Lang-Attribut
      this.currentLang = lang;  // Aktualisiere die aktuelle Sprache
  
      // Jetzt die Seite neu laden, damit der Inhalt in der neuen Sprache angezeigt wird
      window.location.href = newUrl;  // Seite vollständig neu laden, damit die Sprache korrekt angezeigt wird
    }
  }
  
  
}