# Projekt 4 - JS knihovna

Samostatná (standalone) JS knihovna pro začlenění do cizích HTML dokumentů. Cílem je zdrojové soubory zkompilovat do jediného JS souboru, resp. do JS ve dvou variantách, čitelné a minifikované verzi.

Soubor `index.html` zde vůbec není, resp. může být jen pro formu, pokud je to nutné. Kompiluje se pouze samotný JS – a v tomto případě včetně CSS, které chceme mít v jednom bundlu spolu se skripty. Výstupem kompilace musí být jediný soubor `library.js`, resp. ještě v minifikované variantě `library.min.js`, který je možné distribuovat a načíst do jiných HTML dokumentů.

Pozn.: Pokud náhodou musí být součástí projektu nějaké assety nebo jiné soubory, zpracovávají se jako statické a jejich distribuce se pak řeší individuálně jinými prostředky, není to problém tohoto projektu.
