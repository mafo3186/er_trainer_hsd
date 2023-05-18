/**
 * @overview data-based resources of ccmjs-based web component for training relations in an ER diagram
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * app configuration
 * @type {Object}
 */
export const config = {
  "css.1.1": "./resources/styles.css",  // (austauschbares) Layout
  "feedback": true,       // Zu jeder abgeschickten Phrase gibt es ein direktes Feedback
  "legend": true,         // Aufrufbare Legende mit einer Übersicht aller Notationen
//"number": 5,            // Anzahl zufällig abgefragter Phrasen (keine Angabe: alle Phrasen)
  "retry": true,          // Eine Phrase kann nachträglich korrigiert werden.
  "skip": true,           // Eine Phrase kann übersprungen werden
  "show_solution": true,  // Aufrufbare Musterlösung
  "shuffle": true,        // Phrasen werden gemischt
  "anytime_finish": true, // Neustart jederzeit möglich

  // Die Ergebnisse werden offline-fähig lokal gespeichert und man kann dort weitermachen, wo man das letzte Mal aufgehört hat.
  "data": {
    "store": [ "ccm.store", { "name": "eild" } ],
    "key": "er_trainer"
  },
  "onchange": async event => {
    if ( event.event !== 'next' ) return;
    const results = event.instance.getValue();
    results.sections.pop();
    event.instance.helper.onFinish( {
      store: {
        settings: { name: 'eild' },
        key: 'er_trainer'
      }
    }, results );
  },
  "onfinish": {
    "callback": async ( results, instance ) => {
      await instance.data.store.del( instance.data.key );
      instance.start();
    }
  }
};

/**
 * default phrases data
 * @type {Object[]}
 */
export const phrases = [

  {
    "text": "Auf einer Konferenz sollen die Teilnehmer die Möglichkeit haben beim Einlass ein Namensschild zu bekommen.",
    "entities": [ "Namensschild", "Teilnehmer" ],
    "relation": "gehört zu",
    "solution": [ "1", "c" ],
    "comments": [
      "Jedes Namensschild gehört zu genau einem Teilnehmer.",
      "Ein Teilnehmer hat ein oder kein Namensschild."
    ]
  },

  {
    "text": "Bei der Bauplanung eines Mehrfamilienhauses soll für einen entsprechenden Aufpreis auch ein Fahrstuhl möglich sein.",
    "entities": [ "Haus", "Aufzug" ],
    "relation": "hat",
    "solution": [ "c", "1" ],
    "comments": [
      "Ein Haus hat einen oder keinen Aufzug.",
      "Ein Aufzug gehört zu genau einem Haus."
    ]
  },

  {
    "text": "Bei einer Weltraumsimulation kann ein Planet Monde haben, die ihn umkreisen.",
    "entities": [ "Planet", "Mond" ],
    "relation": "hat",
    "solution": [ "cn", "1" ],
    "comments": [
      "Ein Planet hat keinen, einen oder mehrere Monde.",
      "Ein Mond gehört immer zu genau einem Planeten."
    ]
  },

  {
    "text": "Beim Einwohnermeldeamt muss jeder Bürger seinen Wohnsitz anmelden. Obdachlose werden als 'ohne festen Wohnsitz' geführt und es können neben dem Hauptwohnsitz auch weitere Nebenwohnsitze gemeldet werden.",
    "entities": [ "Bürger", "Wohnsitz" ],
    "relation": "meldet an",
    "solution": [ "cn", "n" ],
    "comments": [
      "Ein Bürger hat keinen, einen oder mehrere Wohnsitze.",
      "Zu einem gemeldeten Wohnsitz gibt es mindestens einen Bürger, der dort wohnhaft ist."
    ]
  },

  {
    "text": "Eine Bibliothek möchte die einzelnen Seiten ausgewählter Bücher digitalisieren.",
    "entities": [ "Buch", "Seite" ],
    "relation": "hat",
    "solution": [ "n", "1" ],
    "comments": [
      "Ein Buch hat mehrere Seiten.",
      "Eine Seite gehört zu genau einem Buch."
    ]
  },

  {
    "text": "In einer neuen Hochschule sollen Studenten Lehrveranstaltungen besuchen und am Ende des Semesters von einem Professor geprüft werden.",
    "entities": [ "Student", "Professor", "Lehrveranstaltung" ],
    "relation": "wird geprüft",
    "solution": [ "cn", "cn", "cn" ],
    "comments": [
      "Ein Student wurde entweder noch gar nicht, einmal oder bereits mehrmals geprüft.",
      "Ein Professor hat entweder noch gar nicht, einmal oder bereits mehrmals geprüft.",
      "In einer Lehrveranstaltung wurde noch gar nicht, einmal oder bereits mehrmals geprüft."
    ]
  },

  {
    "text": "Ein Team von Programmierern möchte den Quelltext ihrer Programme versionieren, so dass bei jedem Speichern von Änderungen automatisch eine neue Version vom Quelltext separat gespeichert wird.",
    "entities": [ "Programmierer", "Quelltext", "Version" ],
    "relation": "speichert",
    "solution": [ "cn", "n", "1" ],
    "comments": [
      "Ein Programmierer hat noch keine, eine oder bereits mehrere Versionen eines Quelltexts gespeichert.",
      "Zu einem gespeicherten Quelltext gibt es mindestens eine Version und mindestens einen Programmierer.",
      "Zu einer Version gibt es genau einen zugehörigen Quelltext und genau einen zugehörigen Programmierer."
    ]
  },

  {
    "text": "Verwaltet werden sollen die Besucher einer Gründermesse, auf der vor allem Unternehmensgründer und Sponsoren zusammenkommen.",
    "entities": [ "Besucher", "Gründer", "Sponsor" ],
    "solution": [ "p", "n" ],
    "comments": [
      "Neben Gründer und Sponsoren können auch andere Personengruppen (z.B. Ideengeber) die Messe besuchen.",
      "Ein Gründer kann auch gleichzeitig ein Sponsor und ein Sponsor selbst auch ein Gründer sein."
    ]
  },
  {
    "text": "Für eine Hundeshow sollen die teilnehmenden Hunde verwaltet werden. Zur Zeit sind vor allem Schäferhund, Mops und Dackel im Trend. Mischlinge aus diesen Rassen werden nicht als separate Hunderasse im System verwaltet.",
    "entities": [ "Hund", "Schäferhund", "Mops", "Dackel" ],
    "solution": [ "p", "n" ],
    "comments": [
      "An der Hundeshow nehmen auch vereinzelt andere Hunderassen teil, die weder Schäferhund, noch Mops oder Dackel sind.",
      "Neben den reinrassigen Hunden nehmen auch Mischlinge teil (z.B. ein Mops-Dackel-Mix). Ein Hund kann daher auch mehreren Hunderassen angehören."
    ]
  },

  {
    "text": "Für ein Krankenhaus sollen die verschiedenen Personengruppen verwaltet werden. Unterschieden wird dabei zwischen Besuchern, Patienten und Personal.",
    "entities": [ "Person", "Besucher", "Patient", "Personal" ],
    "solution": [ "t", "n" ],
    "comments": [
      "Im Krankenhaus gibt es nur Besucher, Patienten und Personal. Andere Personengruppen können nicht vorkommen.",
      "Eine Person kann auch mehreren Personengruppen angehören. Jemand vom Personal kann z.B. auch Patient oder Besucher sein."
    ]
  }
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "correct": "Ihre letzte Antwort war richtig!",
  "correct_solution": "Richtige Lösung:",
  "disjoint": "disjunkt",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "heading": "Bitte wählen Sie den zu der Phrase passenden Beziehungstyp in der Auswahlbox aus!",
  "non_disjoint": "nicht-disjunkt",
  "notation": "Notation:",
  "legend": "Legende",
  "next": "Weiter",
  "partial": "partiell",
  "phrase": "Phrase",
  "retry": "Korrigieren",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "skip": "Überspringen",
  "solution": "Zeige Lösung",
  "submit": "Abschicken",
  "title": "ER-Trainer",
  "total": "total"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "correct": "Your last answer was correct!",
  "correct_solution": "Correct solution:",
  "current_state": "You answered %% of %% phrases correctly!",
  "disjoint": "disjoint",
  "failed": "Your last answer was wrong!",
  "finish": "Restart",
  "heading": "Please select the relationship type in the selection box that matches the phrase!",
  "non_disjoint": "non-disjoint",
  "notation": "Notation:",
  "legend": "Legend",
  "next": "Next",
  "partial": "partial",
  "phrase": "Phrase",
  "retry": "Retry",
  "selection": [ "Please Choose", "simple", "conditional", "many", "conditional many" ],
  "skip": "Skip",
  "solution": "Show Solution",
  "submit": "Submit",
  "title": "ER-Trainer",
  "total": "total"
};

/**
 * default notations data
 * @type {Object.<string,Object>}
 */
export const notations = {
  "abrial": {
    "key": "abrial",
    "title": "Abrial",
    "centered": true,
    "comment": "Die Abrial bzw. (min,max)-Notation gibt für jeden an einer Beziehung beteiligten Entitätentyp an, mit wie vielen Entitäten auf der anderen Seite eine Entität dieses Typs mindestens und höchstens in Beziehung steht. Beispiel \"Mond hat Planet\": Ein Planet hat keinen, einen oder mehrere Monde. -> Ein Planet nimmt bedingt mehrfach an der Beziehung zu Mond teil. -> Notation (0, *) auf der Planetenseite. Ein Mond gehört immer zu genau einem Planeten -> Ein Mond nimmt einfach an der Beziehung zu Planet teil. -> Notation (1,1) auf der Mondseite."
  },
  "arrow": {
    "key": "arrow",
    "title": "Pfeilnotation",
    "swap": true,
    "left": "mirrored"
  },
  "chen": {
    "key": "chen",
    "title": "Chen",
    "swap": true,
    "centered": true,
    "comment": "In der Chen-Notation sind nur einfache und mehrfache Beziehungstypen (1 und N) darstellbar, da die Beziehungsmengen bei Chen nur in ihrer Maximalaussage genannt werden. Der ER-Trainer bewertet nur die Lösung als korrekt, in der bei gleicher Notation außerdem die richtige Auswahl für bedingte oder nicht bedingte Beziehungstypen getroffen wird. Empfohlen wird die Auswahl des Beziehungstyps in einer anderen Notation und ein anschließender Wechsel zur Chen-Notation nur zur Ansicht. Beispiel \"Mond hat Planet\": Ein Planet hat keinen, einen oder mehrere Monde. -> Ein Planet nimmt bedingt mehrfach an der Beziehung zu Mond teil. -> Notation N auf Mondseite. Ein Mond gehört immer zu genau einem Planeten -> Ein Mond nimmt einfach an der Beziehung zu Planet teil. -> Notation 1 auf Planetenseite. "
  },
  "crow": {
    "key": "crow",
    "title": "Krähenfuß",
    "swap": true,
    "left": "mirrored"
  },
  "mc": {
    "key": "mc",
    "swap": true,
    "title": "MC"
  },
  "uml": {
    "key": "uml",
    "swap": true,
    "title": "UML",
    "comment": "Die UML-Notation gibt für jeden an einer Beziehung beteiligten Entitätentyp an, wie viele Entitäten dieses Typs mit Entitäten des Typs auf der anderen Seite mindestens und höchstens in Beziehung stehen. Beispiel \"Mond hat Planet\": Ein Planet hat keinen, einen oder mehrere Monde. -> Ein Planet nimmt bedingt mehrfach an der Beziehung zu Mond teil. -> Notation 0..* auf der Mondseite. Ein Mond gehört immer zu genau einem Planeten -> Ein Mond nimmt einfach an der Beziehung zu Planet teil. -> Notation 1..1) auf der Planetenseite."
  }
};
