(function () {
  "use strict";

  var app = document.getElementById("app");
  var modalRoot = document.getElementById("modal-root");
  var liveRegion = document.getElementById("live-region");
  var SAVE_KEY = "sentence-stacker-save-v1";

  var TOPICS = {
    "present-simple": {
      name: "Present Simple",
      short: "Routines, facts, and repeated actions",
      formula: "Subject + base verb / verb-s",
      use: "Use it for habits, routines, facts, and states.",
      examples: ["I walk to school every day.", "Maya does not drink coffee.", "Does he work on Saturdays?"],
      mistake: "Remember: he, she, and it usually take -s. Use do/does with questions and negatives."
    },
    "past-simple": {
      name: "Past Simple",
      short: "Finished actions in the past",
      formula: "Subject + past form",
      use: "Use it for completed actions and states at a finished past time.",
      examples: ["We visited Petra last year.", "She did not call yesterday.", "Did they finish the project?"],
      mistake: "After did or did not, use the base form of the verb.",
      verbNote: "Regular verbs normally form the Past Simple with -ed: work → worked, live → lived, study → studied. Irregular verbs have a special past form that must be learned: go → went, see → saw, write → wrote, take → took, have → had. The verb be changes to was or were."
    },
    "future-simple": {
      name: "Future Simple",
      short: "Predictions, promises, and decisions",
      formula: "Subject + will + base verb",
      use: "Use will for predictions, promises, offers, spontaneous decisions, and future facts.",
      examples: ["I will help you.", "It will not rain tomorrow.", "Will they arrive on time?"],
      mistake: "Use the base verb after will. Do not add -s, -ed, or to."
    },
    "present-continuous": {
      name: "Present Continuous",
      short: "Actions happening right now",
      formula: "Subject + am/is/are + verb-ing",
      use: "Use it for actions happening now, temporary situations, and changing situations.",
      examples: ["I am reading now.", "They are not waiting outside.", "Is she building a tower?"],
      mistake: "Always include am, is, or are before the -ing form."
    },
    "present-perfect-simple": {
      name: "Present Perfect Simple",
      short: "Experience and present results",
      formula: "Subject + have/has + past participle",
      use: "Use it for life experience, recent results, unfinished time, and actions connected to now.",
      examples: ["I have visited Rome twice.", "He has not finished yet.", "Have you ever seen the Great Wall?"],
      mistake: "Use has with he, she, or it. Do not use Present Perfect with a finished past time."
    },
    "objects-and-prepositions": {
      name: "This, These & Prepositions",
      short: "Objects, number, and position",
      formula: "What's this? It's … / What are these? They are … / in, on, under, next to",
      use: "Use this for one object and these for more than one. Use in, on, under, and next to to describe an object's position.",
      examples: ["What's this? It's a pencil.", "What are these? They are pencils.", "The pencils are in the pencil case."],
      mistake: "Use this with one object and these with plural objects. To identify visible plural objects, ask “What are these?”, not “What are there?” Keep the complete preposition next to together."
    }
  };

  var LEVELS = [
    { level: 1, target: 10, seconds: 180, theme: "theme-timber", tower: "Timber Worksite" },
    { level: 2, target: 10, seconds: 180, theme: "theme-timber", tower: "Timber Worksite" },
    { level: 3, target: 12, seconds: 150, theme: "theme-steel", tower: "Steel City Frame" },
    { level: 4, target: 12, seconds: 150, theme: "theme-steel", tower: "Steel City Frame" },
    { level: 5, target: 15, seconds: 120, theme: "theme-glass", tower: "Skyglass Tower" },
    { level: 6, target: 15, seconds: 120, theme: "theme-glass", tower: "Skyglass Tower" },
    { level: 7, target: 15, seconds: 120, theme: "theme-final", tower: "Wonder Spire" },
    { level: 8, target: 10, seconds: 180, theme: "theme-timber", tower: "Timber Worksite II" },
    { level: 9, target: 10, seconds: 180, theme: "theme-timber", tower: "Timber Worksite II" },
    { level: 10, target: 12, seconds: 150, theme: "theme-steel", tower: "Steel City Frame II" },
    { level: 11, target: 12, seconds: 150, theme: "theme-steel", tower: "Steel City Frame II" },
    { level: 12, target: 15, seconds: 120, theme: "theme-glass", tower: "Skyglass Tower II" },
    { level: 13, target: 15, seconds: 120, theme: "theme-glass", tower: "Skyglass Tower II" },
    { level: 14, target: 15, seconds: 120, theme: "theme-final", tower: "World Wonder Spire" }
  ];

  var WONDERS = [
    { id: "great-pyramid", group: "Ancient Wonder", sprite: 0, name: "Great Pyramid of Giza", place: "Giza, Egypt", period: "Completed around 2560 BCE", fact: "The oldest Ancient Wonder and the only one still substantially standing was built as a royal tomb for Pharaoh Khufu." },
    { id: "hanging-gardens", group: "Ancient Wonder", sprite: 1, name: "Hanging Gardens of Babylon", place: "Traditionally Babylon, Iraq", period: "Traditionally dated to the 6th century BCE", fact: "Ancient writers described spectacular tiered gardens, although their exact location and even their existence remain debated." },
    { id: "statue-zeus", group: "Ancient Wonder", sprite: 2, name: "Statue of Zeus", place: "Olympia, Greece", period: "Created around 435 BCE", fact: "The sculptor Phidias created a monumental seated Zeus from ivory and gold for the temple at Olympia." },
    { id: "temple-artemis", group: "Ancient Wonder", sprite: 3, name: "Temple of Artemis", place: "Ephesus, modern Türkiye", period: "Rebuilt around 550 BCE", fact: "This enormous marble sanctuary was rebuilt several times and was celebrated for its scale and rich decoration." },
    { id: "mausoleum", group: "Ancient Wonder", sprite: 4, name: "Mausoleum at Halicarnassus", place: "Bodrum, modern Türkiye", period: "Completed around 350 BCE", fact: "The elaborate tomb of Mausolus gave the word mausoleum to later monumental burial buildings." },
    { id: "colossus", group: "Ancient Wonder", sprite: 5, name: "Colossus of Rhodes", place: "Rhodes, Greece", period: "Completed around 280 BCE", fact: "A giant bronze statue of the sun god Helios stood for only a few decades before an earthquake toppled it." },
    { id: "lighthouse", group: "Ancient Wonder", sprite: 6, name: "Lighthouse of Alexandria", place: "Alexandria, Egypt", period: "Completed around 280 BCE", fact: "Built on the island of Pharos, the lighthouse guided ships into Alexandria’s harbour for many centuries." },
    { id: "great-wall", group: "New Wonder", sprite: 7, name: "Great Wall of China", place: "Northern China", period: "7th century BCE–17th century CE", fact: "A vast network of fortifications built and rebuilt by several dynasties across northern China." },
    { id: "petra", group: "New Wonder", sprite: 8, name: "Petra", place: "Ma’an, Jordan", period: "From the 4th century BCE", fact: "The Nabataean city is famous for monuments carved directly into rose-coloured sandstone cliffs." },
    { id: "colosseum", group: "New Wonder", sprite: 9, name: "The Colosseum", place: "Rome, Italy", period: "Completed in 80 CE", fact: "Rome’s great amphitheatre once hosted public spectacles for tens of thousands of spectators." },
    { id: "chichen-itza", group: "New Wonder", sprite: 10, name: "Chichén Itzá", place: "Yucatán, Mexico", period: "Major centre around 600–1200 CE", fact: "This Maya city combines impressive architecture with advanced knowledge of astronomy and mathematics." },
    { id: "machu-picchu", group: "New Wonder", sprite: 11, name: "Machu Picchu", place: "Cusco Region, Peru", period: "Built in the 15th century", fact: "The Inca citadel sits high in the Andes among terraces, temples, and dramatic mountain peaks." },
    { id: "taj-mahal", group: "New Wonder", sprite: 12, name: "Taj Mahal", place: "Agra, India", period: "Completed around 1653", fact: "Emperor Shah Jahan commissioned this white-marble mausoleum in memory of Mumtaz Mahal." },
    { id: "christ-redeemer", group: "New Wonder", sprite: 13, name: "Christ the Redeemer", place: "Rio de Janeiro, Brazil", period: "Completed in 1931", fact: "The Art Deco monument stands on Corcovado Mountain overlooking Rio de Janeiro." }
  ];

  var defaults = {
    version: 1,
    highestUnlockedLevel: 1,
    completedLevels: [],
    bestScores: {},
    unlockedWonderIds: [],
    wonderOrder: [],
    selectedTopics: ["present-simple"],
    recentTaskIds: {},
    settings: { musicVolume: 0.25, effectsVolume: 0.7, reducedMotion: false, muted: false }
  };

  function loadSave() {
    try {
      var raw = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!raw || raw.version !== 1) return JSON.parse(JSON.stringify(defaults));
      var merged = Object.assign({}, defaults, raw, { settings: Object.assign({}, defaults.settings, raw.settings || {}) });
      if ((merged.completedLevels || []).indexOf(7) >= 0 && merged.highestUnlockedLevel < 8) merged.highestUnlockedLevel = 8;
      return merged;
    } catch (error) {
      return JSON.parse(JSON.stringify(defaults));
    }
  }

  var save = loadSave();
  var selectedTopics = save.selectedTopics.slice();
  var pendingLevel = 1;
  var wonderPage = 0;
  var currentGame = null;
  var modalReturnFocus = null;
  var audioContext = null;
  var musicStarted = false;
  var backgroundMusic = new Audio("assets/audio/blueprint-bounce.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.preload = "auto";
  backgroundMusic.volume = save.settings.muted ? 0 : save.settings.musicVolume;

  document.body.classList.toggle("reduced-motion", save.settings.reducedMotion);
  repairWonderRewards();

  function repairWonderRewards() {
    var completedCount = Math.min(14, new Set(save.completedLevels || []).size);
    while (save.unlockedWonderIds.length < completedCount) {
      var locked = WONDERS.filter(function (wonder) { return save.unlockedWonderIds.indexOf(wonder.id) < 0; });
      if (!locked.length) break;
      var wonder = locked[Math.floor(Math.random() * locked.length)];
      save.unlockedWonderIds.push(wonder.id);
      save.wonderOrder.push(wonder.id);
    }
    persist();
  }

  function persist() {
    save.selectedTopics = selectedTopics.slice();
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  }

  function announce(message) {
    liveRegion.textContent = "";
    window.setTimeout(function () { liveRegion.textContent = message; }, 20);
  }

  function tone(frequency, duration, type) {
    if (save.settings.muted || save.settings.effectsVolume <= 0) return;
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      var oscillator = audioContext.createOscillator();
      var gain = audioContext.createGain();
      oscillator.type = type || "square";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(save.settings.effectsVolume * 0.09, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {}
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
    });
  }

  function topbar(backAction) {
    return '<header class="topbar">' +
      '<div class="brand-mini"><span class="mark">S</span><span>Sentence Stacker</span></div>' +
      '<div class="icon-actions">' +
      musicControl() +
      (backAction ? '<button class="icon-btn" data-action="' + backAction + '" aria-label="Back">←</button>' : '') +
      '<button class="icon-btn" data-action="guide" aria-label="Open Grammar Guide" title="Grammar Guide (G)">G</button>' +
      '<button class="icon-btn" data-action="mute" aria-label="' + (save.settings.muted ? "Unmute" : "Mute") + '" title="Mute (M)">' + (save.settings.muted ? "🔇" : "🔊") + '</button>' +
      '</div></header>';
  }

  function bindCommonActions() {
    app.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", handleAction);
    });
    bindMusicControls();
  }

  function musicControl() {
    return '<label class="music-control" title="Music volume"><span aria-hidden="true">♫</span>' +
      '<input type="range" min="0" max="1" step="0.05" value="' + save.settings.musicVolume + '" data-music-volume aria-label="Music volume"></label>';
  }

  function bindMusicControls() {
    document.querySelectorAll("[data-music-volume]").forEach(function (slider) {
      if (slider.dataset.musicBound === "true") return;
      slider.dataset.musicBound = "true";
      slider.value = save.settings.musicVolume;
      slider.addEventListener("input", function () { setMusicVolume(Number(slider.value)); });
      slider.addEventListener("change", persist);
    });
  }

  function setMusicVolume(value) {
    save.settings.musicVolume = Math.max(0, Math.min(1, value));
    backgroundMusic.volume = save.settings.muted ? 0 : save.settings.musicVolume;
    document.querySelectorAll("[data-music-volume]").forEach(function (slider) { slider.value = save.settings.musicVolume; });
    var output = document.getElementById("music-volume-output");
    if (output) output.textContent = Math.round(save.settings.musicVolume * 100) + "%";
    startMusic();
  }

  function startMusic() {
    if (save.settings.muted || save.settings.musicVolume <= 0) return;
    musicStarted = true;
    backgroundMusic.volume = save.settings.musicVolume;
    var playback = backgroundMusic.play();
    if (playback && playback.catch) playback.catch(function () {});
  }

  function handleAction(event) {
    var action = event.currentTarget.dataset.action;
    if (action === "menu") renderMenu();
    if (action === "guide") openGuide();
    if (action === "mute") toggleMute();
    if (action === "wonders") renderWonders();
    if (action === "how") openHowTo();
    if (action === "settings") openSettings();
    if (action === "new") renderTopicSelection(1);
    if (action === "continue") renderTopicSelection(save.highestUnlockedLevel);
  }

  function toggleMute() {
    save.settings.muted = !save.settings.muted;
    backgroundMusic.volume = save.settings.muted ? 0 : save.settings.musicVolume;
    if (!save.settings.muted) startMusic();
    persist();
    tone(440, 0.08);
    document.querySelectorAll('[data-action="mute"]').forEach(function (button) {
      button.textContent = save.settings.muted ? "🔇" : "🔊";
      button.setAttribute("aria-label", save.settings.muted ? "Unmute" : "Mute");
    });
  }

  function renderMenu() {
    stopGame();
    closeModal(false);
    var completed = save.completedLevels.length;
    app.innerHTML = '<section class="screen menu-screen">' + topbar("") +
      '<div class="menu-wrap">' +
      '<div class="hero-copy"><p class="eyebrow">English grammar • arcade challenge</p>' +
      '<h1 class="logo">Sentence <span>Stacker</span></h1>' +
      '<p>Choose the correct sentence. Build the tower. Beat the tractor. Discover all fourteen Wonders.</p>' +
      '<div class="progress-rail" aria-label="' + completed + ' of 14 levels completed">' +
      LEVELS.map(function (item) { return '<span class="progress-node ' + (save.completedLevels.indexOf(item.level) >= 0 ? "done" : "") + '"></span>'; }).join("") +
      '</div></div>' +
      '<aside class="menu-panel"><h2>Ready to build?</h2>' +
      '<p class="progress-copy">' + completed + '/14 towers complete · ' + save.unlockedWonderIds.length + '/14 Wonders found</p>' +
      '<div class="menu-buttons">' +
      '<button class="btn btn-primary btn-wide" data-action="new">▶ Start from Level 1</button>' +
      '<button class="btn btn-teal btn-wide" data-action="continue" ' + (completed ? "" : "disabled") + '>↗ Continue campaign</button>' +
      '<button class="btn btn-ghost btn-wide" data-action="wonders">✦ Wonders collection</button>' +
      '<button class="btn btn-ghost btn-wide" data-action="how">? How to play</button>' +
      '<button class="btn btn-ghost btn-wide" data-action="settings">⚙ Settings</button>' +
      '</div></aside></div></section>';
    bindCommonActions();
  }

  function renderTopicSelection(level) {
    stopGame();
    pendingLevel = Math.max(1, Math.min(14, level));
    var config = LEVELS[pendingLevel - 1];
    app.innerHTML = '<section class="screen topic-screen"><div class="panel-screen">' + topbar("menu") +
      '<div class="paper-panel"><div class="section-heading"><div>' +
      '<p class="eyebrow">Level ' + pendingLevel + ' · ' + config.tower + '</p>' +
      '<h1>Choose your grammar</h1><p>Select one or more topics. You can change them after every level.</p>' +
      '</div><div><strong>' + config.target + ' blocks</strong><br><span>' + formatTime(config.seconds) + ' to build</span></div></div>' +
      '<div class="topic-grid">' +
      Object.keys(TOPICS).map(function (key, index) {
        var topic = TOPICS[key];
        var active = selectedTopics.indexOf(key) >= 0;
        return '<button class="topic-card" data-topic="' + key + '" aria-pressed="' + active + '">' +
          '<span class="topic-number">0' + (index + 1) + '</span><span class="check">✓</span>' +
          '<strong>' + topic.name + '</strong><small>' + topic.short + '</small></button>';
      }).join("") +
      '</div><div class="selection-footer"><span class="helper" id="selection-help">' + selectedTopics.length + ' topic' + (selectedTopics.length === 1 ? "" : "s") + ' selected</span>' +
      '<div class="selection-actions"><button class="btn btn-ghost" data-action="guide">Grammar Guide</button>' +
      '<button class="btn btn-primary" id="build-button" ' + (selectedTopics.length ? "" : "disabled") + '>Build Level ' + pendingLevel + ' →</button></div></div>' +
      '</div></div></section>';
    bindCommonActions();
    app.querySelectorAll("[data-topic]").forEach(function (card) {
      card.addEventListener("click", function () {
        var key = card.dataset.topic;
        var index = selectedTopics.indexOf(key);
        if (index >= 0) selectedTopics.splice(index, 1); else selectedTopics.push(key);
        card.setAttribute("aria-pressed", String(index < 0));
        var helper = document.getElementById("selection-help");
        helper.textContent = selectedTopics.length ? selectedTopics.length + " topic" + (selectedTopics.length === 1 ? "" : "s") + " selected" : "Choose at least one topic to continue.";
        helper.classList.toggle("error", !selectedTopics.length);
        document.getElementById("build-button").disabled = !selectedTopics.length;
        persist();
        tone(520, 0.06);
      });
    });
    document.getElementById("build-button").addEventListener("click", openLevelIntro);
  }

  function openLevelIntro() {
    var config = LEVELS[pendingLevel - 1];
    showModal('<h2>Level ' + config.level + '</h2>' +
      '<p class="eyebrow">' + config.tower + '</p>' +
      '<p>Build a tower of <strong>' + config.target + ' blocks</strong> before the ' + formatTime(config.seconds) + ' timer runs out. The tractor takes the bottom block every 10 seconds—and it never waits.</p>' +
      '<div class="stats-grid"><div class="stat"><strong>' + config.target + '</strong><small>Blocks</small></div>' +
      '<div class="stat"><strong>' + formatTime(config.seconds) + '</strong><small>Time</small></div>' +
      '<div class="stat"><strong>10s</strong><small>Tractor</small></div>' +
      '<div class="stat"><strong>' + selectedTopics.length + '</strong><small>Topics</small></div></div>' +
      '<div class="modal-actions"><button class="btn btn-ghost" data-modal-close>Not yet</button>' +
      '<button class="btn btn-primary" id="start-level">Start building →</button></div>');
    document.getElementById("start-level").addEventListener("click", function () {
      closeModal(false);
      startLevel(pendingLevel);
    });
  }

  function actionSets() {
    return [
      ["walk to school", "walks to school", "walked to school", "walked to school"],
      ["play tennis", "plays tennis", "played tennis", "played tennis"],
      ["watch the news", "watches the news", "watched the news", "watched the news"],
      ["study English", "studies English", "studied English", "studied English"],
      ["cook dinner", "cooks dinner", "cooked dinner", "cooked dinner"],
      ["review the report", "reviews the report", "reviewed the report", "reviewed the report"],
      ["write emails", "writes emails", "wrote emails", "written emails"],
      ["take the bus", "takes the bus", "took the bus", "taken the bus"],
      ["visit the museum", "visits the museum", "visited the museum", "visited the museum"],
      ["finish the project", "finishes the project", "finished the project", "finished the project"],
      ["clean the kitchen", "cleans the kitchen", "cleaned the kitchen", "cleaned the kitchen"],
      ["buy fresh bread", "buys fresh bread", "bought fresh bread", "bought fresh bread"],
      ["call a friend", "calls a friend", "called a friend", "called a friend"],
      ["make breakfast", "makes breakfast", "made breakfast", "made breakfast"],
      ["learn new words", "learns new words", "learned new words", "learned new words"],
      ["drink tea", "drinks tea", "drank tea", "drunk tea"],
      ["see the mountains", "sees the mountains", "saw the mountains", "seen the mountains"],
      ["send a message", "sends a message", "sent a message", "sent a message"],
      ["meet the new teacher", "meets the new teacher", "met the new teacher", "met the new teacher"],
      ["build a model", "builds a model", "built a model", "built a model"],
      ["open the shop", "opens the shop", "opened the shop", "opened the shop"],
      ["help the neighbours", "helps the neighbours", "helped the neighbours", "helped the neighbours"]
    ];
  }

  function objectPlaceScenes() {
    return [
      ["a pencil", "pencils", "pencil", "in", "the pencil case"],
      ["a book", "books", "book", "on", "the desk"],
      ["a ball", "balls", "ball", "under", "the chair"],
      ["a lamp", "lamps", "lamp", "next to", "the sofa"],
      ["a cat", "cats", "cat", "under", "the table"],
      ["a cup", "cups", "cup", "on", "the shelf"],
      ["a toy", "toys", "toy", "in", "the box"],
      ["a bag", "bags", "bag", "next to", "the door"],
      ["an apple", "apples", "apple", "in", "the basket"],
      ["a shoe", "shoes", "shoe", "under", "the bed"],
      ["a notebook", "notebooks", "notebook", "on", "the table"],
      ["a ruler", "rulers", "ruler", "in", "the school bag"],
      ["a dog", "dogs", "dog", "next to", "the tree"],
      ["a picture", "pictures", "picture", "on", "the wall"],
      ["a bike", "bikes", "bike", "next to", "the house"],
      ["a key", "keys", "key", "in", "the drawer"],
      ["a phone", "phones", "phone", "on", "the sofa"],
      ["a doll", "dolls", "doll", "in", "the cupboard"],
      ["a hat", "hats", "hat", "on", "the chair"],
      ["a mouse", "mice", "mouse", "under", "the cupboard"]
    ];
  }

  function task(id, topic, correct, distractor, explanation, subtype) {
    return { id: id, topic: topic, correct: correct, distractor: distractor, explanation: explanation, subtype: subtype || "verb-form" };
  }

  function buildTasks() {
    var tasks = {};
    Object.keys(TOPICS).forEach(function (key) { tasks[key] = []; });
    var actions = actionSets();
    var people = ["Maya", "Leo", "Anna", "Sam", "My brother", "Our teacher"];
    actions.forEach(function (a, i) {
      var person = people[i % people.length];
      var baseVerb = a[0].split(" ")[0];
      var irregularPastVerbs = ["write", "take", "buy", "make", "drink", "see", "send", "meet", "build"];
      var pastVerbType = irregularPastVerbs.indexOf(baseVerb) >= 0 ? "irregular" : "regular";
      tasks["present-simple"].push(
        task("ps-a-" + i, "present-simple", person + " " + a[1] + " every morning.", person + " " + a[0] + " every morning.", "Use the third-person singular form with he, she, it, or one person."),
        task("ps-n-" + i, "present-simple", person + " does not " + a[0] + " on Sundays.", person + " does not " + a[1] + " on Sundays.", "Use the base verb after does not.", "negative"),
        task("ps-q-" + i, "present-simple", "Does " + person.toLowerCase() + " " + a[0] + " every week?", "Does " + person.toLowerCase() + " " + a[1] + " every week?", "Use the base verb after does.", "question"),
        task("ps-p-" + i, "present-simple", "They " + a[0] + " after work.", "They " + a[1] + " after work.", "A plural subject takes the base verb."),
        task("ps-do-" + i, "present-simple", "We do not " + a[0] + " every day.", "We does not " + a[0] + " every day.", "Use do, not does, with we.", "negative")
      );
      tasks["past-simple"].push(
        task("pa-a-" + i, "past-simple", person + " " + a[2] + " yesterday.", person + " " + a[0] + " yesterday.", "Use the past form for a completed action yesterday. “" + baseVerb + "” is a " + pastVerbType + " verb."),
        task("pa-n-" + i, "past-simple", person + " did not " + a[0] + " last week.", person + " did not " + a[2] + " last week.", "Use the base verb after did not. Did already carries the past meaning; “" + baseVerb + "” is " + pastVerbType + ".", "negative"),
        task("pa-q-" + i, "past-simple", "Did they " + a[0] + " yesterday?", "Did they " + a[2] + " yesterday?", "Use the base verb after did. “" + baseVerb + "” is a " + pastVerbType + " verb.", "question"),
        task("pa-time-" + i, "past-simple", "We " + a[2] + " two days ago.", "We " + a[0] + " two days ago.", "A finished past time needs the Past Simple form. “" + baseVerb + "” is a " + pastVerbType + " verb.", "time-marker"),
        task("pa-did-" + i, "past-simple", "I " + a[2] + " last Saturday.", "I did " + a[2] + " last Saturday.", "In an affirmative Past Simple sentence, use the past verb without did. “" + baseVerb + "” is " + pastVerbType + ".")
      );
      tasks["future-simple"].push(
        task("fu-a-" + i, "future-simple", "I will " + a[0] + " tomorrow.", "I will " + a[1] + " tomorrow.", "Use the base verb after will."),
        task("fu-n-" + i, "future-simple", person + " will not " + a[0] + " next week.", person + " will not " + a[2] + " next week.", "Use the base verb after will not.", "negative"),
        task("fu-q-" + i, "future-simple", "Will they " + a[0] + " later?", "Will they will " + a[0] + " later?", "Use will only once in a Future Simple question.", "question"),
        task("fu-s-" + i, "future-simple", person + " will " + a[0] + " soon.", person + " wills " + a[0] + " soon.", "The modal verb will does not change with the subject."),
        task("fu-to-" + i, "future-simple", "We will " + a[0] + " next month.", "We will to " + a[0] + " next month.", "Do not use to after will.")
      );
      var ing = makeIng(a[0]);
      tasks["present-continuous"].push(
        task("pc-a-" + i, "present-continuous", person + " is " + ing + " now.", person + " " + ing + " now.", "Present Continuous needs a form of be before the -ing verb."),
        task("pc-p-" + i, "present-continuous", "They are " + ing + " at the moment.", "They is " + ing + " at the moment.", "Use are with they."),
        task("pc-n-" + i, "present-continuous", "I am not " + ing + " right now.", "I am not " + a[0] + " right now.", "Use am not + verb-ing for a current action.", "negative"),
        task("pc-q-" + i, "present-continuous", "Is " + person.toLowerCase() + " " + ing + " now?", "Does " + person.toLowerCase() + " " + ing + " now?", "Begin a Present Continuous question with am, is, or are.", "question"),
        task("pc-we-" + i, "present-continuous", "We are " + ing + " today.", "We are " + a[0] + " today.", "Use the -ing form after am, is, or are.")
      );
      tasks["present-perfect-simple"].push(
        task("pp-a-" + i, "present-perfect-simple", "I have " + a[3] + " already.", "I have " + a[0] + " already.", "Use the past participle after have."),
        task("pp-s-" + i, "present-perfect-simple", person + " has " + a[3] + " this week.", person + " have " + a[3] + " this week.", "Use has with one person, he, she, or it."),
        task("pp-n-" + i, "present-perfect-simple", "They have not " + a[3] + " yet.", "They have not " + a[0] + " yet.", "Use have not + past participle with yet.", "negative"),
        task("pp-q-" + i, "present-perfect-simple", "Have you ever " + a[3] + "?", "Have you ever " + a[0] + "?", "Use have + past participle to ask about life experience.", "question"),
        task("pp-time-" + i, "present-perfect-simple", "We have " + a[3] + " three times so far this month.", "We have " + a[0] + " three times so far this month.", "Use have + past participle with so far in an unfinished time period.", "time-marker")
      );
    });
    objectPlaceScenes().forEach(function (scene, i) {
      var singularAnswer = scene[0];
      var plural = scene[1];
      var singular = scene[2];
      var preposition = scene[3];
      var place = scene[4];
      var singularIdentityError = i % 2 === 0
        ? "What this is? It's " + singularAnswer + "."
        : "What's this? They are " + singularAnswer + ".";
      var pluralIdentityError = i % 2 === 0
        ? "What is these? They are " + plural + "."
        : "What are these? It is " + plural + ".";
      tasks["objects-and-prepositions"].push(
        task("op-this-" + i, "objects-and-prepositions", "What's this? It's " + singularAnswer + ".", singularIdentityError, i % 2 === 0 ? "In a question, put is before this: What's this?" : "Use it is (it's) for one object, not they are.", i % 2 === 0 ? "word-order" : "number"),
        task("op-these-" + i, "objects-and-prepositions", "What are these? They are " + plural + ".", pluralIdentityError, i % 2 === 0 ? "Use are with these and a plural answer." : "Use they are for more than one object, not it is.", "number"),
        task("op-this-statement-" + i, "objects-and-prepositions", "This is " + singularAnswer + ".", "These is " + singularAnswer + ".", "Use this for one object.", "number"),
        task("op-these-statement-" + i, "objects-and-prepositions", "These are " + plural + ".", "This are " + plural + ".", "Use these for more than one object.", "number"),
        task("op-preposition-" + i, "objects-and-prepositions", "The " + singular + " is " + preposition + " " + place + ".", "The " + singular + " " + preposition + " is " + place + ".", "Put the preposition after is: is " + preposition + " " + place + ".", "word-order")
      );
    });
    return tasks;
  }

  function makeIng(phrase) {
    var parts = phrase.split(" ");
    var verb = parts[0];
    var irregular = { write: "writing", make: "making", take: "taking", see: "seeing", meet: "meeting", build: "building", sit: "sitting", run: "running" };
    var ing = irregular[verb] || (verb.endsWith("e") ? verb.slice(0, -1) + "ing" : verb + "ing");
    return [ing].concat(parts.slice(1)).join(" ");
  }

  var TASKS = buildTasks();

  function chooseTask(game) {
    var counts = game.topicCounts;
    var minimum = Math.min.apply(null, selectedTopics.map(function (key) { return counts[key] || 0; }));
    var topicPool = selectedTopics.filter(function (key) { return (counts[key] || 0) <= minimum + 1 && key !== game.lastTopic; });
    if (!topicPool.length) topicPool = selectedTopics.slice();
    var topic = topicPool[Math.floor(Math.random() * topicPool.length)];
    counts[topic] = (counts[topic] || 0) + 1;
    game.lastTopic = topic;
    var recent = (save.recentTaskIds[topic] || []).slice(-30);
    var available = TASKS[topic].filter(function (item) { return game.seen.indexOf(item.id) < 0 && recent.indexOf(item.id) < 0; });
    if (!available.length) available = TASKS[topic].filter(function (item) { return game.seen.indexOf(item.id) < 0; });
    if (!available.length) { game.seen = []; available = TASKS[topic].slice(); }
    var picked = available[Math.floor(Math.random() * available.length)];
    game.seen.push(picked.id);
    save.recentTaskIds[topic] = (save.recentTaskIds[topic] || []).concat(picked.id).slice(-30);
    persist();
    return picked;
  }

  function startLevel(level) {
    var config = LEVELS[level - 1];
    currentGame = {
      config: config, active: true, locked: false, remaining: config.seconds, tractorRemaining: 10,
      tower: 0, score: 0, streak: 0, correct: 0, mistakes: 0, removals: 0,
      totalResponse: 0, questionStarted: performance.now(), seen: [], topicCounts: {}, lastTopic: "",
      lastFrame: performance.now(), raf: 0, tractorDriving: false
    };
    app.innerHTML = '<section class="screen game-screen ' + config.theme + '"><header class="game-hud">' +
      '<div class="brand-mini"><span class="mark">S</span><span>Sentence Stacker</span></div>' +
      hudPill("Level", String(level), "level-value") +
      hudPill("Tower", "0 / " + config.target, "tower-value") +
      hudPill("Time", formatTime(config.seconds), "time-value") +
      '<div class="hud-pill score-pill"><small>Score · streak</small><strong id="score-value">0 · ×0</strong></div>' +
      '<div class="hud-pill topic-pill"><small>Grammar</small><strong id="topic-value">—</strong></div>' +
      '<div class="icon-actions">' + musicControl() + '<button class="icon-btn" id="pause-button" aria-label="Pause">Ⅱ</button><button class="icon-btn" data-action="guide" aria-label="Grammar Guide">G</button><button class="icon-btn" data-action="mute" aria-label="Mute">' + (save.settings.muted ? "🔇" : "🔊") + '</button></div>' +
      '</header><div class="game-area">' +
      '<div class="choice-row" id="choice-row"></div>' +
      '<div class="tower-zone"><div class="tower-glow"></div><div class="stack" id="tower-stack"></div><div class="tower-foundation"></div></div>' +
      '<div class="tractor-warning" id="tractor-warning" hidden>⚠ Tractor incoming!</div>' +
      '<div class="tractor-lane"><div class="tractor" id="tractor"><div class="tractor-cab"></div><div class="tractor-window"></div><div class="tractor-body"></div><div class="tractor-arm"></div><div class="tractor-scoop"></div><div class="wheel one"></div><div class="wheel two"></div></div></div>' +
      '<div id="feedback-zone"></div></div></section>';
    bindCommonActions();
    document.getElementById("pause-button").addEventListener("click", openPause);
    nextQuestion();
    currentGame.raf = requestAnimationFrame(gameTick);
    announce("Level " + level + " started. Build " + config.target + " blocks.");
  }

  function hudPill(label, value, id) {
    return '<div class="hud-pill"><small>' + label + '</small><strong id="' + id + '">' + value + '</strong></div>';
  }

  function gameTick(now) {
    var game = currentGame;
    if (!game) return;
    var delta = Math.min((now - game.lastFrame) / 1000, 0.1);
    game.lastFrame = now;
    if (game.active) {
      game.remaining -= delta;
      game.tractorRemaining -= delta;
      updateHud();
      if (game.tractorRemaining <= 3 && !game.tractorDriving) {
        document.getElementById("tractor-warning").hidden = false;
        document.getElementById("time-value").closest(".hud-pill").classList.toggle("warning", game.tractorRemaining <= 1);
      }
      if (game.tractorRemaining <= 0) {
        game.tractorRemaining += 10;
        driveTractor();
      }
      if (game.remaining <= 0) {
        finishLevel(false);
        return;
      }
    }
    game.raf = requestAnimationFrame(gameTick);
  }

  function updateHud() {
    if (!currentGame) return;
    var time = document.getElementById("time-value");
    var tower = document.getElementById("tower-value");
    var score = document.getElementById("score-value");
    if (time) time.textContent = formatTime(Math.max(0, currentGame.remaining));
    if (tower) tower.textContent = currentGame.tower + " / " + currentGame.config.target;
    if (score) score.textContent = currentGame.score + " · ×" + currentGame.streak;
  }

  function nextQuestion() {
    var game = currentGame;
    if (!game) return;
    game.locked = false;
    var picked = chooseTask(game);
    game.question = picked;
    game.questionStarted = performance.now();
    var correctLeft = Math.random() < 0.5;
    game.correctSide = correctLeft ? "left" : "right";
    var leftText = correctLeft ? picked.correct : picked.distractor;
    var rightText = correctLeft ? picked.distractor : picked.correct;
    document.getElementById("topic-value").textContent = TOPICS[picked.topic].name;
    document.getElementById("feedback-zone").innerHTML = "";
    var row = document.getElementById("choice-row");
    row.innerHTML = sentenceButton("left", leftText, "←") + sentenceButton("right", rightText, "→");
    row.querySelectorAll(".sentence-block").forEach(function (button) {
      button.addEventListener("click", function () { answer(button.dataset.side); });
    });
  }

  function sentenceButton(side, text, key) {
    return '<button class="sentence-block ' + side + '" data-side="' + side + '" aria-label="' + side + ' answer: ' + escapeHtml(text) + '">' +
      '<span class="key-hint" aria-hidden="true">' + key + '</span>' + escapeHtml(text) + '</button>';
  }

  function answer(side) {
    var game = currentGame;
    if (!game || !game.active || game.locked) return;
    game.locked = true;
    var isCorrect = side === game.correctSide;
    game.totalResponse += (performance.now() - game.questionStarted) / 1000;
    var buttons = document.querySelectorAll(".sentence-block");
    buttons.forEach(function (button) {
      button.classList.add("locked");
      if (button.dataset.side === side) button.classList.add(isCorrect ? "correct" : "wrong");
    });
    if (isCorrect) {
      game.correct += 1;
      game.streak += 1;
      var speed = Math.max(0, 50 - Math.floor((performance.now() - game.questionStarted) / 200));
      game.score += 100 + speed + (game.streak >= 3 ? 25 : 0);
      showFeedback("good", "Perfect fit!", "Block secured.");
      tone(660, 0.13);
      window.setTimeout(function () {
        if (!currentGame) return;
        currentGame.tower += 1;
        renderTower();
        if (currentGame.tower >= currentGame.config.target) {
          window.setTimeout(function () { finishLevel(true); }, 450);
        } else {
          window.setTimeout(nextQuestion, 390);
        }
      }, 250);
    } else {
      game.mistakes += 1;
      game.streak = 0;
      showFeedback("bad", "Not quite", game.question.explanation);
      tone(180, 0.2, "sawtooth");
      window.setTimeout(nextQuestion, 950);
    }
  }

  function showFeedback(kind, heading, message) {
    var zone = document.getElementById("feedback-zone");
    if (zone) zone.innerHTML = '<div class="feedback ' + kind + '" role="status"><strong>' + heading + '</strong><span>' + escapeHtml(message) + '</span></div>';
    announce(heading + " " + message);
  }

  function renderTower() {
    if (!currentGame) return;
    var stack = document.getElementById("tower-stack");
    if (!stack) return;
    stack.innerHTML = Array.from({ length: currentGame.tower }, function (_, index) {
      return '<div class="tower-block" aria-hidden="true" style="animation-delay:' + Math.min(index * 0.012, 0.12) + 's"></div>';
    }).join("");
    updateHud();
  }

  function driveTractor() {
    var game = currentGame;
    if (!game || game.tractorDriving) return;
    game.tractorDriving = true;
    document.getElementById("tractor-warning").hidden = true;
    document.getElementById("time-value").closest(".hud-pill").classList.remove("warning");
    var tractor = document.getElementById("tractor");
    tractor.classList.remove("driving");
    void tractor.offsetWidth;
    tractor.classList.add("driving");
    tone(90, 0.35, "sawtooth");
    window.setTimeout(function () {
      if (!currentGame) return;
      if (currentGame.tower > 0) {
        var bottom = document.querySelector(".tower-block");
        if (bottom) bottom.classList.add("removing");
        currentGame.tower -= 1;
        currentGame.removals += 1;
        updateHud();
        announce("The tractor took the bottom block.");
        tone(110, 0.22);
        window.setTimeout(renderTower, 550);
      }
    }, 1250);
    window.setTimeout(function () {
      if (!currentGame) return;
      currentGame.tractorDriving = false;
      tractor.classList.remove("driving");
    }, 2850);
  }

  function openPause() {
    if (!currentGame) return;
    setPaused(true);
    showModal('<h2>Building paused</h2><p>The level timer and tractor are waiting for you.</p>' +
      '<div class="modal-actions"><button class="btn btn-ghost" id="pause-menu">Main menu</button>' +
      '<button class="btn btn-ghost" id="pause-guide">Grammar Guide</button>' +
      '<button class="btn btn-primary" id="resume-game">Resume</button></div>', false);
    document.getElementById("resume-game").addEventListener("click", function () { closeModal(false); setPaused(false); });
    document.getElementById("pause-guide").addEventListener("click", function () { openGuide(null, true); });
    document.getElementById("pause-menu").addEventListener("click", renderMenu);
  }

  function setPaused(paused) {
    if (!currentGame) return;
    currentGame.active = !paused;
    currentGame.lastFrame = performance.now();
  }

  function finishLevel(won) {
    var game = currentGame;
    if (!game) return;
    game.active = false;
    cancelAnimationFrame(game.raf);
    var snapshot = game;
    currentGame = null;
    if (!won) {
      tone(130, 0.45, "sawtooth");
      showModal('<h2>Time is up</h2><p>The tower needed ' + snapshot.config.target + ' blocks. You reached ' + snapshot.tower + '. Every builder gets another try.</p>' +
        resultStats(snapshot) +
        '<div class="modal-actions"><button class="btn btn-ghost" id="failed-menu">Main menu</button>' +
        '<button class="btn btn-ghost" id="failed-guide">Grammar Guide</button>' +
        '<button class="btn btn-primary" id="retry-level">Retry Level ' + snapshot.config.level + '</button></div>', false);
      document.getElementById("failed-menu").addEventListener("click", renderMenu);
      document.getElementById("failed-guide").addEventListener("click", openGuide);
      document.getElementById("retry-level").addEventListener("click", function () { closeModal(false); startLevel(snapshot.config.level); });
      return;
    }
    snapshot.score += Math.floor(snapshot.remaining) * 5;
    var level = snapshot.config.level;
    var firstCompletion = save.completedLevels.indexOf(level) < 0;
    if (firstCompletion) {
      save.completedLevels.push(level);
      save.completedLevels.sort();
      save.highestUnlockedLevel = Math.min(14, Math.max(save.highestUnlockedLevel, level + 1));
    }
    save.bestScores[level] = Math.max(save.bestScores[level] || 0, snapshot.score);
    var wonder = firstCompletion ? awardWonder(level) : null;
    persist();
    tone(784, 0.18);
    window.setTimeout(function () { tone(988, 0.28); }, 140);
    if (wonder) {
      showWonderReveal(snapshot, wonder);
    } else {
      showModal('<h2>Tower complete!</h2><p>You improved your Level ' + level + ' result. This Wonder was already collected.</p>' +
        resultStats(snapshot) + completionActions(level), false);
      bindCompletionActions(level);
    }
  }

  function awardWonder(level) {
    var locked = WONDERS.filter(function (wonder) { return save.unlockedWonderIds.indexOf(wonder.id) < 0; });
    if (!locked.length) return null;
    var wonder = locked.length === 1 ? locked[0] : locked[Math.floor(Math.random() * locked.length)];
    save.unlockedWonderIds.push(wonder.id);
    save.wonderOrder.push(wonder.id);
    return wonder;
  }

  function showWonderReveal(game, wonder) {
    showModal('<div class="wonder-reveal"><p class="eyebrow">' + wonder.group + ' discovered</p><div class="reveal-icon">' + wonderSpriteHtml(wonder, "reveal-sprite") + '</div>' +
      '<h2>' + wonder.name + '</h2><p><strong>' + wonder.place + ' · ' + wonder.period + '</strong></p><p>' + wonder.fact + '</p>' +
      (save.unlockedWonderIds.length === 7 ? '<p class="chapter-message"><strong>First collection complete!</strong><br>Seven more Wonders are waiting. Continue building to discover them all.</p>' : '') + '</div>' +
      resultStats(game) + completionActions(game.config.level), false);
    bindCompletionActions(game.config.level);
  }

  function resultStats(game) {
    var attempts = game.correct + game.mistakes;
    var accuracy = attempts ? Math.round(game.correct / attempts * 100) : 0;
    var average = attempts ? (game.totalResponse / attempts).toFixed(1) : "0.0";
    return '<div class="stats-grid"><div class="stat"><strong>' + accuracy + '%</strong><small>Accuracy</small></div>' +
      '<div class="stat"><strong>' + game.score + '</strong><small>Score</small></div>' +
      '<div class="stat"><strong>' + average + 's</strong><small>Avg. answer</small></div>' +
      '<div class="stat"><strong>' + game.removals + '</strong><small>Blocks taken</small></div></div>';
  }

  function completionActions(level) {
    return '<div class="modal-actions"><button class="btn btn-ghost" id="complete-menu">Main menu</button>' +
      '<button class="btn btn-ghost" id="view-wonders">View Wonders</button>' +
      (level < 14 ? '<button class="btn btn-primary" id="next-level">' + (level === 7 ? "Continue — 7 more Wonders →" : "Level " + (level + 1) + " →") + '</button>' : '<button class="btn btn-primary" id="finish-campaign">See complete collection →</button>') + '</div>';
  }

  function bindCompletionActions(level) {
    document.getElementById("complete-menu").addEventListener("click", renderMenu);
    document.getElementById("view-wonders").addEventListener("click", renderWonders);
    var next = document.getElementById("next-level");
    if (next) next.addEventListener("click", function () { closeModal(false); renderTopicSelection(level + 1); });
    var finish = document.getElementById("finish-campaign");
    if (finish) finish.addEventListener("click", renderWonders);
  }

  function renderWonders() {
    stopGame();
    closeModal(false);
    var unlocked = save.wonderOrder.map(function (id) {
      return WONDERS.find(function (wonder) { return wonder.id === id; });
    }).filter(Boolean);
    save.unlockedWonderIds.forEach(function (id) {
      if (!unlocked.some(function (wonder) { return wonder.id === id; })) {
        var item = WONDERS.find(function (wonder) { return wonder.id === id; });
        if (item) unlocked.push(item);
      }
    });
    var pageCount = 2;
    wonderPage = Math.max(0, Math.min(wonderPage, pageCount - 1));
    var exhibits = unlocked.slice(wonderPage * 7, wonderPage * 7 + 7);
    app.innerHTML = '<section class="screen wonders-screen">' + topbar("menu") +
      '<div class="wonders-wrap"><div class="wonders-title"><p class="eyebrow">Your discovery gallery</p><h1>Fourteen Wonders</h1>' +
      '<p>' + save.unlockedWonderIds.length + ' of 14 discovered · Hover, focus, or tap an exhibit</p></div>' +
      '<div class="pedestal-stage" aria-label="World Wonders gallery">' +
      Array.from({ length: 7 }, function (_, index) {
        var wonder = exhibits[index];
        if (!wonder) return '<div class="wonder-exhibit empty-exhibit exhibit-' + index + '" aria-hidden="true"><span class="empty-slot">?</span></div>';
        return '<button class="wonder-exhibit exhibit-' + index + '" aria-label="' + escapeHtml(wonder.name) + '. ' + escapeHtml(wonder.fact) + '">' +
          wonderSpriteHtml(wonder, "") +
          '<span class="wonder-tooltip"><small>' + wonder.group + '</small><strong>' + wonder.name + '</strong><em>' + wonder.place + ' · ' + wonder.period + '</em><span>' + wonder.fact + '</span></span></button>';
      }).join("") +
      '</div><div class="gallery-controls">' +
      '<button class="btn btn-dark btn-small" id="previous-gallery" ' + (wonderPage === 0 ? "disabled" : "") + '>← Previous exhibits</button>' +
      '<span>Gallery ' + (wonderPage + 1) + ' / ' + pageCount + '</span>' +
      '<button class="btn btn-dark btn-small" id="next-gallery" ' + (wonderPage >= pageCount - 1 ? "disabled" : "") + '>Next exhibits →</button>' +
      '</div></div></section>';
    bindCommonActions();
    document.querySelectorAll(".wonder-exhibit").forEach(function (exhibit) {
      exhibit.addEventListener("click", function () {
        var willOpen = !exhibit.classList.contains("open");
        document.querySelectorAll(".wonder-exhibit.open").forEach(function (item) { item.classList.remove("open"); });
        exhibit.classList.toggle("open", willOpen);
      });
    });
    document.getElementById("previous-gallery").addEventListener("click", function () { wonderPage -= 1; renderWonders(); });
    document.getElementById("next-gallery").addEventListener("click", function () { wonderPage += 1; renderWonders(); });
  }

  function wonderSpriteHtml(wonder, extraClass) {
    return '<span class="wonder-sprite ' + (extraClass || "") + '" aria-hidden="true"><img src="assets/wonders/' + wonder.id + '.png" alt="" draggable="false"></span>';
  }

  function openGuide(topicKey, returnToPause) {
    var wasPlaying = currentGame && currentGame.active;
    if (currentGame) setPaused(true);
    var active = topicKey || (currentGame && currentGame.question ? currentGame.question.topic : selectedTopics[0]) || "present-simple";
    showModal('<h2>Grammar Guide</h2><p>Quick rules and examples for every topic in the game.</p>' +
      '<div class="guide-tabs" role="tablist">' + Object.keys(TOPICS).map(function (key) {
        return '<button class="guide-tab" role="tab" data-guide-topic="' + key + '" aria-selected="' + (key === active) + '">' + TOPICS[key].name + '</button>';
      }).join("") + '</div><div id="guide-content"></div>', true, function () {
        if (returnToPause && currentGame) openPause();
        else if (wasPlaying && currentGame) setPaused(false);
      });
    renderGuideContent(active);
    modalRoot.querySelectorAll("[data-guide-topic]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        modalRoot.querySelectorAll("[data-guide-topic]").forEach(function (item) { item.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        renderGuideContent(tab.dataset.guideTopic);
      });
    });
  }

  function renderGuideContent(key) {
    var topic = TOPICS[key];
    var container = document.getElementById("guide-content");
    if (!container) return;
    container.innerHTML = '<section class="guide-content" role="tabpanel"><h3>' + topic.name + '</h3><p>' + topic.use + '</p>' +
      '<div class="formula">' + topic.formula + '</div><ul class="example-list">' +
      topic.examples.map(function (example) { return '<li>' + example + '</li>'; }).join("") +
      '</ul>' + (topic.verbNote ? '<p class="verb-note"><strong>Regular and irregular verbs:</strong> ' + topic.verbNote + '</p>' : '') +
      '<p><strong>Common mistake:</strong> ' + topic.mistake + '</p></section>';
  }

  function openHowTo() {
    showModal('<h2>How to play</h2><p>Two sentence blocks enter from opposite sides. Choose the grammatically correct sentence and it becomes part of your tower.</p>' +
      '<div class="guide-content"><h3>Controls</h3><ul class="example-list"><li><strong>← or A:</strong> choose the left block</li>' +
      '<li><strong>→ or D:</strong> choose the right block</li><li><strong>G:</strong> open the Grammar Guide</li><li><strong>Esc:</strong> pause</li><li><strong>M:</strong> mute</li></ul>' +
      '<p><strong>Watch out:</strong> the tractor removes the bottom block every 10 seconds, even while a question is on screen.</p></div>');
  }

  function openSettings() {
    showModal('<h2>Settings</h2><p>Make the worksite comfortable for you.</p>' +
      '<div class="guide-content"><label class="settings-range"><strong>Music volume</strong><span><input type="range" min="0" max="1" step="0.05" value="' + save.settings.musicVolume + '" data-music-volume aria-label="Music volume"><output id="music-volume-output">' + Math.round(save.settings.musicVolume * 100) + '%</output></span></label><br>' +
      '<label><input type="checkbox" id="reduced-motion" ' + (save.settings.reducedMotion ? "checked" : "") + '> Reduce motion and camera effects</label><br><br>' +
      '<label><input type="checkbox" id="mute-setting" ' + (save.settings.muted ? "checked" : "") + '> Mute all sound effects</label></div>' +
      '<div class="modal-actions"><button class="btn btn-ghost" id="reset-progress">Reset progress</button><button class="btn btn-primary" data-modal-close>Save settings</button></div>');
    bindMusicControls();
    document.getElementById("reduced-motion").addEventListener("change", function (event) {
      save.settings.reducedMotion = event.target.checked;
      document.body.classList.toggle("reduced-motion", event.target.checked);
      persist();
    });
    document.getElementById("mute-setting").addEventListener("change", function (event) {
      save.settings.muted = event.target.checked;
      backgroundMusic.volume = save.settings.muted ? 0 : save.settings.musicVolume;
      if (!save.settings.muted) startMusic();
      persist();
    });
    document.getElementById("reset-progress").addEventListener("click", function () {
      showModal('<h2>Reset everything?</h2><p>This removes level scores, recent questions, and all discovered Wonders from this browser.</p>' +
        '<div class="modal-actions"><button class="btn btn-ghost" data-modal-close>Cancel</button><button class="btn btn-primary" id="confirm-reset">Reset progress</button></div>');
      document.getElementById("confirm-reset").addEventListener("click", function () {
        save = JSON.parse(JSON.stringify(defaults));
        selectedTopics = save.selectedTopics.slice();
        persist();
        renderMenu();
      });
    });
  }

  function showModal(html, closable, onClose) {
    if (closable === undefined) closable = true;
    modalReturnFocus = document.activeElement;
    modalRoot.innerHTML = '<div class="modal-backdrop" role="presentation"><section class="modal" role="dialog" aria-modal="true">' +
      (closable ? '<button class="icon-btn modal-close" data-modal-close aria-label="Close">×</button>' : "") + html + '</section></div>';
    modalRoot._onClose = onClose || null;
    modalRoot.querySelectorAll("[data-modal-close]").forEach(function (button) { button.addEventListener("click", function () { closeModal(true); }); });
    var focusable = modalRoot.querySelector("button, input");
    if (focusable) focusable.focus();
  }

  function closeModal(callCallback) {
    var callback = modalRoot._onClose;
    modalRoot.innerHTML = "";
    modalRoot._onClose = null;
    if (callCallback && callback) callback();
    if (modalReturnFocus && document.contains(modalReturnFocus)) modalReturnFocus.focus();
  }

  function stopGame() {
    if (currentGame) cancelAnimationFrame(currentGame.raf);
    currentGame = null;
  }

  function formatTime(seconds) {
    var total = Math.max(0, Math.ceil(seconds));
    return String(Math.floor(total / 60)).padStart(2, "0") + ":" + String(total % 60).padStart(2, "0");
  }

  window.addEventListener("keydown", function (event) {
    var key = event.key.toLowerCase();
    if (key === "m") { toggleMute(); return; }
    if (key === "g" && !modalRoot.firstChild) { openGuide(); return; }
    if (event.key === "Escape") {
      if (modalRoot.firstChild) {
        if (modalRoot.querySelector("[data-modal-close]")) closeModal(true);
      } else if (currentGame) openPause();
      return;
    }
    if (!currentGame || !currentGame.active || modalRoot.firstChild) return;
    if (event.key === "ArrowLeft" || key === "a") { event.preventDefault(); answer("left"); }
    if (event.key === "ArrowRight" || key === "d") { event.preventDefault(); answer("right"); }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      backgroundMusic.pause();
      if (currentGame && currentGame.active) openPause();
    } else if (musicStarted) {
      startMusic();
    }
  });

  document.addEventListener("pointerdown", startMusic, { once: true });
  document.addEventListener("keydown", startMusic, { once: true });

  renderMenu();
})();
