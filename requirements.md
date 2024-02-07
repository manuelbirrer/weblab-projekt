# Kochplaner

## Kontext

Der Kochplaner hilft einer Familie bzw. Wohngemeinschaft dabei den Überblick zu behalten wann wer kocht, was gekocht wird und wer bei jeder Mahlzeit dabei ist.

Dazu gehört eine Ansicht, z.B. als Kalender, bei welcher alle geplanten Mahlzeiten übersichtlich dargestellt werden. Über diese Ansicht können sich die Benutzer auch für eingetragene Mahlzeiten anmelden. Zusätzlich kann darüber auch ein Formular zum Erfassen einer neuen Mahlzeit aufgerufen werden.

Zu diesem Planer gehört optional auch eine Rezeptverwaltung. Dabei bleibt aber noch offen, ob diese nur dazu dient, Links/Texte zu speichern, oder ob einzelne Zutaten verwaltet werden.

## Anforderungen

### Fachliche Anforderungen

#### User Story 1: Anmelden (Prio 'Must')

Als Familienmitglied kann ich mich beim Kochplaner anmelden, um den Plan verwenden zu können.

**Akzeptanzkriterien**

* Mittels korrektem Benutzernamen und korrektem Passwort gelange ich zum Kochplaner.
* Mit nicht korrekten Benutzerdaten (Benutzername / Passwort) kann ich mich nicht anmelden.

#### User Story 2: Plan verwenden (Prio 'Must')

Als Familienmitglied kann ich den Plan ansehen und für die Mahlzeiten eine Detailansicht öffnen.

**Akzeptanzkriteren**
* Mahlzeiten werden in einem Kalender oder ähnlicher Darstellungsart angezeigt
* Mahlzeiten können angeklickt werden um alle damit verbundenen Informationen in einer Detailansicht anzusehen


#### User Story 3: Mahlzeit erfassen (Prio 'Must')

Als Familienmitglied kann ich eine neue Mahlzeit erfassen.

**Akzeptanzkriterien**

* Für die Erfassung einer neuen Mahlzeit muss ich folgende Felder angeben können:
    * Datum (Muss-Feld)
        * z.B. *02.03.2024*
    * Zeit (Muss-Feld)
        * z.B. *12:00*
    * Gericht (Muss-Feld)
        * Auswahl, wenn Rezepte implementiert (User Story 6), sonst Text
        * z.B. *Pizza*
    * Koch (Muss-Feld)
        * Auswahl aus Benutzern
        * z.B. *Max Mustermann*
    * Bemerkung (Optional-Feld)
        * z.B. *Schreibt mir bitte noch was ihr auf eurer Pizza wollt* 
* Sofern ein Muss-Feld nicht abgefüllt ist, darf die Mahlzeit nicht abgespeichert werden.
* Neben den Eingaben müssen folgende Informationen bei der Erfassung einer neuen Mahlzeit hinterlegt werden
    * Informationen zum Erfasser (Link auf Person)
    * Erfassungsdatum

#### User Story 4: Bei Mahlzeit anmelden/abmelden (Prio 'Must')

Als Familienmitglied kann ich mich bei einer Mahlzeit anmelden/abmelden und sehen wer angemeldet ist.

**Akzeptanzkriterien**

* Wenn nicht angemelet, wird ein Knopf angezeigt, um sich anzumelden.
* Wenn angemeldet, wird ein Knopf angezeigt, um sich wieder abzumelden.
* Angemeldete Personen werden bei der Mahlzeit angezeigt

#### User Story 5: Mahlzeit anpassen (Prio 'Should')

Als Familienmitglied kann ich eine eingetragene Mahlzeit bearbeiten, um falsche Angaben zu korrigieren, oder sonstige Änderungen zu machen.

**Akzeptanzkriteren**

* Folgende Felder können angepasst werden:
    * Zeit
    * Gericht
    * Koch
    * Bemerkung
* Bei Änderung wird das Änderungsdatum und Bearbeiter abgespeichert

#### User Story 6: Rezepte erfassen (Prio 'Could')

Als Familienmitglied kann ich Rezepte bzw. Gerichte erfassen, welche bei Mahlzeiten verlinkt werden.

**Akzeptanzkriteren**

Für die Erfassung eines neuen Rezepts muss ich folgende Felder angeben können:
* Name (Muss-Feld)
    * z.B. *Pizza*
* Rezept (Muss-Feld)
    * Link oder Text

#### User Story 7: Zutatenübersicht (Prio 'Could')

Als Familienmitglied kann ich neue Zutaten erfassen, bei Rezepten hinzufügen und eine Übersicht benötigter Zutaten erstellen.

**Akzeptanzkriteren**

Für die Erfassung einer neuen Zutat muss ich folgende Felder angeben können:
* Name (Muss-Feld)
    * z.B. *Mozzarella*
* Einheit (Muss-Feld)
    * z.B. *Packung*

Rezept wird um folgende Felder ergänzt:
* Zutaten (beliebig viele), weiter aufgeteilt in:
    * Zutat
        * Auswahl
    * Menge
        * z.B. *1*

#### User Story 8: Kommentare erfassen (Prio 'Could')

Als Familienmitglied kann ich auf Mahlzeiten Kommentare erfassen und Kommentare anderer Personen sehen.

**Akzeptanzkriteren**

Für die Erfassung eines neuen Kommentars muss ich folgende Felder angeben können:
* Kommentar (Muss-Feld)
    * z.B. *Geht auch 15min später?*
* Neben den Eingaben müssen folgende Informationen bei der Erfassung einer neuen Mahlzeit hinterlegt werden
    * Informationen zum Erfasser (Link auf Person)
    * Erfassungsdatum

Kommentare werden mit Erfasser und Datum angezeigt.

#### Nicht-Funktionale Anforderungen

* Der **Kochplaner** soll neben der Desktop-Ansicht, auch für die Mobile-Ansicht optimiert sein.
* Der **Kochplaner** soll innert 1s geladen sein.
* Sämtliche Änderungen an Mahlzeiten-Einträgen sollen historisiert sein.

## Technologie-Stack
* Node.js
* Express
* Angular
* MongoDB
