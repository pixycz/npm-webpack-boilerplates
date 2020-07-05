# Projekt 3 - Menší web

Základ je podobný jako rozšířená SPA – skripty a styly kompilované na výstup do `/dist` a statické soubory beze změny zkopírované do stejné složky. Navíc jsou zde další nové prvky:

## Více HTML šablon

Kromě `index.html` jsou zde další HTML dokumenty, které sdílejí stejné skripty a styly a je potřeba je stejně zpracovat a uložít zkompilované do `/dist`. Zde tedy:
- `index-en.html` – cizojazyčná (zjednodušená) verze homepage
- `page1.html`, `page2.html` – další stránky

## Procesování šablon

Obsah HTML šablon je (pomocí `HtmlWebpackPlugin`, `html-loader` apod.) zpracován, především jsou nahrazeny klíčová slova a odkazy hodnotami a segmanty HTML kódu (chunks) – viz např. `<%= require>` direktivy v HTML dokumentech.

## Sloučení "vendor" kódu

Určená skupina skriptů a stylů je sloučena (např. pomocí `MergeIntoSingleFilePlugin`) do jednoho souboru. Jedná se typicky o externí knihovny, které z nějakého důvodu nechceme mít součástí bundlu, ale také je nechceme do stránek linkovat každý zvlášť. Jedná se např. o sadu knihoven:

- do `/dist/js/vendor.js` se mají sloučit
    - `/src/lib/js/vendor_1.js` – 3rd-party knihovna
    - `/src/lib/js/vendor_2.js` – 3rd-party knihovna
- do `/dist/css/vendor.css` se mají sloučit
    - `/src/lib/css/vendor_1.css` – styly 3rd-party knihovny
    - `/src/lib/css/vendor_2.css` – styly 3rd-party knihovny
