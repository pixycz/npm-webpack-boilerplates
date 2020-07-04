# Projekt 1 - SPA

Základní obecný Single-Page App projekt.

## Obsah složky projektu

### Složka `/src`

Zdrojové soubory, které se mají zkompilovat na výstup do `/dist`

- `index.html` – základní HTML šablona, do níž se načtou zkompilované skripty a styly
- `index.js` – základní JS, do kterého se importují další JS z `/js` a kompiluje se do `/dist/js/bundle.js`
- `js/` – složky se skripty
- `sass/` – složka se styly
-- `sass/index.scss` – základní styl, do nějž se importují ostatní styly a zkompiluje se do `/dist/css/style.css`. Může být i jako `/src/index.scss` apod.
- `img/` – složka s obrázky, které se importují do JS a kompilují se do `/dist/img/*`
- podobně `media/`, `fonts/` atd.

### Složka `/dist`

Obsahuje zkompilované soubory. V zásadě by se měla dát v téhle podobě umístit na server a plnohodnotně fungovat jako veřejná distribuce.

- `index.html` – základní HTML dokument s nalinkovanými styly a skripty
- `js/` – obsahuje zkompilovaný bundle skriptů, volitelně s mapou
- `css/` – obsahuje zkopilované styly, volitelně s mapou.
-- další variantou jsou styly zkompilované do `bundle.js` – tohle řešení ale necháme jako samostatnou variantu (je použito v jiném projektu)
- `img/` – obsahuje deployované obrázky, resp. další soubory (viz `media/`, `fonts/` atd.)


## Skripty

- `dev` – spustí lokální server
-- volitelně na https
-- dostupný na `localhost:` i na `http://0.0.0.0` (adresa počítače v rámci LAN)
-- watch a hot-reload při každém uložení souboru
-- negeneruje žádné nové soubory do složky projektu (skrytá kompilace)
- `build` – zkompiluje projekt do `/dist`
-- volitelně se vytvoří mapy JS a CSS bundlů
-- volitelně se minifikuje/uglifikuje
