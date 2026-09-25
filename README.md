# Meteor Auction

Meteor Auction ist eine Beispielanwendung, welche mit Meteor.js und React entwickelt wurde im Zuge einer Projektarbeit an der Hochschule Karlsruhe. 

<p align="center">
  <img src="docs/images/meteor_auction_home.png" width="48%" alt="Auktionsübersicht">
  <img src="docs/images/meteor_auction_detail.png" width="46%" alt="Auktion-Detailseite">
</p>


## Über das Projekt

Der Zweck der Anwendung ist die Präsentation des Frameworks Meteor.js. Sie zeigt Charakteristika von Meteor an einem Praxisbeispiel eines kleinen Online-Auktionshauses mit 4 Beispielauktionen und stellt Stärken und Schwächen vor. 

## Features

- Auktionsübersicht der Gegenstände mit Countdown der Auktionsdauer
- Gebotsformular mit Historie für eine Live-Gebotfunktionalität
- Jede Auktion unterstützt zudem einen Live-Chat, indem Bieter interagieren können
- Es existiert eine einfache Accountverwaltung (natives Meteor-Feature) mit schon existierenden Musterbenutzern

## Tech Stack

- Meteor.js + React
- Pico.css als Styling-Basis
- accounts-base / accounts-password (native Meteor-Accountverwaltung)
- MongoDB (über die integrierte Meteor/Minimongo-Funktion)

## Setup

### Voraussetzungen

- min. Node.js-Version 24 oder höher
- Meteor-Cli muss installiert sein (mit `npx meteor`), siehe https://docs.meteor.com/about/install.html

### Installation

- Repo klonen
- `meteor npm install`

**Hinweis für Windows: Falls `meteor npm install` oder `meteor run` mit einem Kompilierungsfehler bei `argon2 / accounts-password` fehlschlägt (natives C++-Modul, Windows-Build-Toolchain-Problem), empfiehlt sich die Ausführung über WSL. **

### Starten

- `meteor run`
- Web-Anwendung ist in der Regel unter Standard-Port `localhost:3000` zu finden. 

## Testen / Ausprobieren

### Login

Es existieren schon Test-Benutzer: Alice, Bob, Charlie, David, Eve ----- Passwort einheitlich `test`

Für den eigenen Test am besten einfach einen eigenen Test-Benutzer anlegen. Benutername (keine E-Mail) und Passwort frei wählen und *beim ersten Einloggen* auf `Register` klicken. Ansonsten mit `Login` einloggen. 

### Testmöglichkeit mit mehreren Nutzern

Für ein Beobachten der Echtzeit-Reaktivität ein zweites *privates* Browserfenster mit der Anwendung öffnen und mit einem zweiten Test-Nutzer einloggen. 

## Projektstruktur

- `server/main.js` - Publications + Methods (Kern der Meteor-Backend-Logik)
- `server/seedData.js` - Testdaten
- `imports/api/` - Collections
- `imports/ui/auction/`, `imports/ui/auth/`, `imports/ui/layout/` - UI-Komponenten nach Bereich

## Meteor.js: Stärken & Schwächen

### Stärken

1. **Alles aus einer Hand**: Meteor liefert von Grund auf schon viele Grundlagen für eine komplette Webanwendung mit. Dazu gehört ein funktionierendes Build-Tool mit einem Dev-Server. Das Build-Tool hat eine Hot-Reload Funktionalität. Eine eigens integrierte Datenbank (MongoDB) und ein Node.js Backend sind vorhanden, mit denen sich die Backend-Funktionalität schnell umsetzen lässt ohne ein extra notwendiges Setup. 

2. **Pub/Sub-Reaktivität mit sehr wenig Boilerplate-Code**: Meteor nutzt als Backend nicht eine klassische REST-Schnittstelle und zustandslose HTTP-Aufrufe. Stattdessen werden Websocket-Verbindungen zwischen Frontend und Backend verwendet. Dabei können Collections in der Datenbank abonniert werden. Falls Änderungen bspw. durch einen anderen Nutzer in der Datenbank stattfinden, werden die anderen Clients informiert und es findet eine Aktualisierung der Informationen statt, ohne dass ein Polling nach aktuellen Informationen notwendig ist. 
Als Beispiel lässt sich in diesem Projekt zum Beispiel die Chatfunktionalität betrachten in `/imports/ui/auction/AuctionChat.jsx`. Zum Abrufen von Chatnachrichten werden zwei von Meteor bereitgestellte React-Hooks verwendet. Zunächst wird eine Subscription mit `useSubscribe()` zu einer Datenbankcollection von Chatnachrichten einer bestimmten Auktion erstellt. Durch die Subscription findet daraufhin immer eine automatische Aktualisierung bei Datenänderungen der Datenbank statt. Mit `useTracker()` werden dann die entsprechenden Nachrichten als Query von der MongoDB abgefragt. Es ist kein manuelles State-Management wie klassischerweise bei React nötig. Die Server-Daten finden sich in einer clientseitigen In-Memory-Kopie der abonnierten Daten. 

Beispielausschnitt der Subscription zum Abrufen von Chatnachrichten:
```javascript
const isLoading = useSubscribe("auctionChat", auctionId);

  const chatMessages = useTracker(() => {
    return ChatCollection.find(
      { auctionId: auctionId },
      { sort: { createdAt: 1 } },
    ).fetch();
  });
```

3. **Meteor-Methods statt REST-Aufrufe**: Ein Aufruf von `Meteor.call(...)` ersetzt die klassische Vorgehensweise von REST. Bei REST ist eine Endpunkt-Definition mit HTTP-Methode notwendig. Es muss das Request- und Response-Format festgelegt werden mit eigenem Mapping als DTO. Dies wird durch die Meteor-Methoden vereinfacht mit einem Prinzip wie bei Remote Procedure Calls (RPCs). Die Validierung kann direkt am Methoden-Anfang über `check()` durchgeführt werden. 

Beispielausschnitt der Backend-Schnittstellendefinition und dem Frontend-Aufruf zum Senden von Chatnachrichten:
```javascript
// Backend-Definition in /server/main.js
Meteor.methods({
  "chat.insert": async function (auctionId, text) {
    check(auctionId, String);
    check(text, String);

    // [ ... ]

    return insertChat({ auctionId, senderName: user.username, userId: this.userId, text, createdAt: new Date() });
  },
});

// Frontend-Aufruf in /imports/ui/auction/AuctionChat.jsx
const handleSend = (message) => {
    Meteor.call("chat.insert", auctionId, message, (error) => {
      if (error) {
        setChatErrorMessage(error.reason);
      } else {
        setChatErrorMessage("");
      }
    });
  };
```

4. **Eingebaute Kernsysteme**: Meteor liefert von Haus aus viele eingebauten Kernsysteme, unterstützt mit offiziellen Zusatzpaketen wie eine Accountverwaltung (unterstützt unterschiedliche Login-Methoden mit Passwort, TOTP oder Magic Link, ...). Die volle Websocket-Infrastruktur ist inklusive. Auch eine mobile Umsetzung in Kombination mit React Native ist möglich. 

5. **Geteilte Codebasis Client/Server**: Durch eine geteilte Codebasis in der gleichen Sprache (JavaScript) mit den gleichen Hilfsfunktionen für Frontend und Backend nutzbar ist die Projektumsetzung für kleinere Projekte viel leichter umzusetzen. Durch eine simple Ordnerkonvention werden Frontend- und Backend getrennt. Die Bündelung geschieht automatisch durch den Build-Prozess im Hintergrund. 

> ==> Durch seine Vorteile bietet Meteor eine hohe Protyping-Geschwindigkeit für kleinere Projekte

### Schwächen

1. **Team-Skalierung**: Bei größeren Teams und Projekten kann die stark zentrale Struktur von Meteor (z. B. Meteor.publish/Meteor.methods oft in wenigen zentralen Dateien wie server/main.js) schnell unübersichtlich werden und zu Merge-Konflikten führen, wenn mehrere Entwickler an denselben Dateien arbeiten. 

2. **Skalierungsaufwand bei vielen Verbindungen**: Weil jeder Nutzer eine offene WebSocket-Verbindung hält und der Server die Datenbank überwacht, benötigt Meteor bei zehntausenden gleichzeitigen Nutzern mehr RAM und gezieltes Tuning als rein zustandslose HTTP-APIs.

3. **MongoDB-Bindung**: Meteor ist im Kern auf MongoDB ausgelegt. SQL-Anbindung existiert nur über vereinzelte Community-Lösungen, wird aber offiziell nicht direkt unterstützt. Dies kann problematisch sein, wenn eine relationale Datenbank als Grundlage für ein Projekt dienen soll. 

4. **Client/Server-Trennung ist Konvention**: Dadurch das Frontend- und Backend-Code in der selben Codebasis gepflegt werden und nur durch Ordner mit Namenskonvention getrennt sind, kann versehentlich serverseitiger Code im Frontend landen. Dies ist ein Sicherheitsrisiko, da versehentlich Geheimnisse im Frontend-Code ausgespielt werden können oder der Nutzer unvorgesehene Aktionen aufgrund fehlender Servervalidierung durchführen könnte. 

Ein Beispiel wäre, dass im Backend keine Validierung von this.userId stattfindet, bevor eine Datenbank-Aktion ausgeführt wird, oder dass die User-Id als Parameter vom Client mitgegeben wird, statt sie serverseitig aus dem Kontext der Verbindung (this.userId) zu beziehen. 

Validierung im Backend:
```javascript
"chat.insert": async function (auctionId, text) {
    check(auctionId, String);
    check(text, String);
    
    // Validierung der UserId vor Ausführen von Datenbank-Aktionen. 
    if (!(this.userId)) {
      throw new Meteor.Error("not-authorized", "Not authorized. ");
    }

    const user = await Meteor.users.findOneAsync(this.userId);

    return insertChat({ auctionId, senderName: user.username, userId: this.userId, text, createdAt: new Date() });
  },
```