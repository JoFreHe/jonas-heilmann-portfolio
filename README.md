# Jonas Heilmann · Fotografie, Film & Web

Persönliches Portfolio mit scrollgesteuertem Showreel und lokal bereitgestellten Bildern und Schriftarten.

**Website:** https://jofrehe.github.io/jonas-heilmann-portfolio/

## Veröffentlichung

GitHub Pages veröffentlicht `main`, Ordner `/docs`. Änderungen in diesem Ordner werden nach einem Push automatisch veröffentlicht. Es sind keine Installation, kein Backend und keine API-Schlüssel erforderlich. `.nojekyll` sorgt für die unveränderte Auslieferung der statischen Dateien.

Das Kontaktformular öffnet einen E-Mail-Entwurf im Mailprogramm des Besuchers. Der Besucher sendet ihn selbst ab. Der gemerkte Filmmoment verbleibt im Browser; nur die Zeitmarke wird in den Entwurf übernommen.

## Eigene Domain

Nach dem Domainkauf die Domain im GitHub-Konto verifizieren und unter **Settings → Pages → Custom domain** eintragen. Die vom Registrar benötigten DNS-Einträge gemäß [GitHubs Anleitung](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) einrichten und anschließend HTTPS erzwingen. Canonical, Open-Graph-Adressen und Sitemap auf die neue Adresse umstellen.

## Suchmaschinen

Canonical, Social-Vorschau und Sitemap verwenden die öffentliche Pages-Adresse. Die Startseite ist indexierbar, die Rechtstexte bewusst `noindex`. Nach Veröffentlichung die Sitemap in Google Search Console und Bing Webmaster Tools einreichen. Bei Projektseiten auf GitHub Pages gelten robots-Regeln auf Ebene des Hosts (`https://jofrehe.github.io/robots.txt`); eine projektinterne `robots.txt` wird nicht als hostweite Regel ausgewertet.

## Dateien und Rechte

`docs/` enthält ausschließlich die Website, optimierte Medien und Font-Lizenzen. Originalmedien, lokale Werkzeuge und Arbeitsnotizen sind nicht Bestandteil des Repositorys. Fotos und Showreel sind urheberrechtlich geschützt; keine allgemeine Lizenz zur Weiterverwendung. Syne und Hanken Grotesk liegen mit ihren OFL-Lizenzen unter `docs/assets/fonts/`.
