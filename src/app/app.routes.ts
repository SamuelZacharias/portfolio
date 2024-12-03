import { Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component'; // Legal Notice importieren

export const appRoutes: Routes = [
  { path: '', component: HeroComponent },  // Hauptseite (Hero)
  { path: 'about', component: AboutComponent },  // Über-mich-Seite
  { path: 'skills', component: SkillsComponent },  // Fähigkeiten
  { path: 'portfolio', component: PortfolioComponent },  // Portfolio
  { path: 'references', component: ReferencesComponent },  // Referenzen
  { path: 'contact', component: ContactComponent },  // Kontaktseite
  { path: 'legal-notice', component: LegalNoticeComponent }, // Legal Notice Seite
  { path: '**', redirectTo: '' }, // Fallback Route
];
