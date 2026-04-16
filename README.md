# Dashboard Spese Personali

Una piccola ma potente **Single Page Application (SPA)** progettata per registrare, visualizzare e gestire in tempo reale le spese personali. L'interfaccia si caratterizza per un desing moderno orientato alla User Experience, integrando un esteso uso del *glassmorphism* su un tema scuro.

---

## 🚀 Caratteristiche e Funzionalità Principali

- **CRUD Completo:** L'utente può Creare, Leggere, Aggiornare (tramite Modale contestuale) ed Eliminare facilmente ogni singola spesa senza ricaricare la pagina principale.
- **Riepilogo Dinamico:** Un header reattivo mostra l'importo totale accumulato e il conteggio di quante spese figurano in lista; ogni operazione aggiorna i dati all'istante.
- **Filtri e Ricerca Avanzata:** Puoi ricercare spese specifiche tramite il form testuale oppure isolare l'intera lista per specifiche macro-categorie:
  - `Casa`, `Cibo`, `Trasporti`, `Tempo libero`, `Salute`, `Utenze`, `Shopping`, e `Altro`.
- **Persistenza Locale (Bonus):** Lo stato dell'applicazione è gestito in JS e sincronizzato istantaneamente col *LocalStorage* del browser. Chiudendo la tab i dati non verranno persi, tornando accessibili alla prossima sessione.
- **Micro-Animazioni e UI Premium:**
  - Font dinamico e nitido (`Outfit`).
  - Effetti "vetro smerigliato" per la nav-bar in dissolvenza fissa (`backdrop-filter`) studiati per le sovrapposizioni e lo scroll-depth.
  - Hover effects fluidi per rendere l'interfaccia interattiva e vitale.

---

## 🛠️ Stack Tecnologico

Il progetto si basa sulla trinità della programmazione Front-End affiancata alla scalabilità responsive di Bootstrap:
1. **HTML5:** Semantic HTML (header, main, section, ecc.) per una chiara gerarchia della DOM.
2. **CSS3 (Vanilla):** Molte regole custom e proprietà speciali per sovrascrivere aspetti grafici generici e realizzare le trasparenze, layout flessibili, animazioni d'apparizione a scomparsa `z-index` layering per i contesti di blocco.
3. **Bootstrap 5.3:** Tema impostato nativamente in `dark-mode`. Gestisce i fondamenti della reattività strutturale (Grid Layout Desktop/Mobile) e componenti base per i componenti come Cards, Buttons e Modals. I `Bootstrap Icons` arricchiscono testate e pulsanti.
4. **Vanilla JavaScript:** 
    - Event Delegations.
    - Manipolazione profonda degli elementi del DOM.
    - Funzioni Custom per formattazione valutaria e data europea.
    - Gestione e manipolazione dell'Array di Oggetti di stato.

---

## 🗂️ Struttura dei File

L'approccio prevede una separazione degli argomenti (SoC - Separation of Concerns) per facilitare scalabilità e lettura:
* `index.html`: Scaffolding della pagina, input-group e blueprint della Modale di modifica.
* `style.css`: Motore visivo personalizzato (Colori accento Giallo caldo, sfumature vetro, e timing delle transizioni).
* `script.js`: Nucleo operativo della logica dell'APP (Event handlers per form, localStorage logic, CRUD state management).

---

## 💡 Come usare l'Applicativo

Nessuna complessa installazione o dipendenza NodeJS esterna necessaria (poiché impatta sui CDN pubblici per Framework e Icone):

1. **Clona o scarica** la cartella sul tuo PC.
2. Fai **doppio clic** sul file `index.html` e consenti al tuo Browser web standard di aprirlo (raccomandato Chrome, Edge, Firefox, o Safari moderno).
3. **Aggiungi una Spesa**: Sulla colonna adiacente compila accuratamente i quattro input cardine e premi il tasto "Aggiungi". Goditi la responsività!

---
> Progetto di Fine Modulo - Web Developer Baseline
