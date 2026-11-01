# Flagi Świata

Gra dla dzieci o flagach, krajach, stolicach, językach urzędowych i nutach (klucz wiolinowy i basowy). Działa jako aplikacja (PWA) na telefonie, także bez internetu.

## Instalacja na Androidzie (Samsung)

1. Otwórz adres gry z GitHub Pages w **Chrome**.
2. Menu ⋮ → **Dodaj do ekranu głównego** → **Zainstaluj**.
3. Na ekranie pojawi się ikonka „Flagi”. Gra otwiera się na pełnym ekranie.

## Aktualizacje

- Zmiany w `index.html` docierają same: telefon pobiera nową wersję przy uruchomieniu z internetem.
- Po zmianie flag (`flags/`) lub ikon (`icons/`) podbij `VERSION` w `sw.js` i dopisz nowe flagi do listy `FLAGS` w tym pliku.

## Gdzie co jest

- `index.html` – cała gra (nuty: sekcja `/* ---------- nuty ---------- */`, zakresy w `CLEFS`); lista krajów to tablica `RAW` (kod flagi, nazwa, stolica, języki, `"e"` = poziom łatwy, kontynent).
- `flags/` – flagi SVG z pakietu [flag-icons](https://github.com/lipis/flag-icons) (licencja MIT), nazwane kodem kraju.
- `sw.js` – praca offline i aktualizacje.
- `manifest.webmanifest`, `icons/` – nazwa i ikona aplikacji.
