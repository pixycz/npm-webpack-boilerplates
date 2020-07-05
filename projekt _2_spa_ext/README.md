# Projekt 2 - SPA (rozšířený)

Rozšířený Single-Page App projekt. V podstatě vše stejné jako základní SPA projekt, navíc je zde složka `static/`, jejíž obsah se nekompiluje, ale bez jakékoli změny kopíruje do `/dist`.

Pokud `static/` obsahuje standardní složku, která se po kompilaci vyskytuje v `/dist` – např. `/dist/js` nebo `/dist/img` – tak se obsah stejné složy ze `static/` zkopíruje do této existující složky.

## Varianta: React projekt

Standardně projekty v Reactu obsahují složku `/public`, která se chová obdobně. Jednak je zde umístěn kořenový `index.html`, ale jakýkoli další obsah se přesouvá do `/dist` beze změn právě tak, jak je uvedeno výše.
