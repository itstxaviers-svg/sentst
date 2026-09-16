# Sentence Stacker — Game Design and Implementation Guide

## 1. Product Summary

**Sentence Stacker** is a fast-paced English grammar game in which the player builds towers from blocks containing correctly formed sentences. Two sentence blocks enter the screen from opposite sides. The player must quickly identify the correct sentence and send that block into the tower.

The central challenge is time pressure. A tractor runs on its own independent schedule and removes the lowest block from the tower approximately every 10 seconds. It never waits for the current question or for the player's answer. The player wins a level by reaching the required tower height before the level timer expires.

The game contains fourteen sequential levels in two seven-level chapters. Difficulty is built into the level progression rather than selected from a separate difficulty menu. Players collect one unique Wonder after completing each level: seven Ancient Wonders and seven New Wonders in total.

All visible game content must be in English, including menus, instructions, sentence tasks, grammar references, feedback, accessibility labels, and Wonder descriptions.

## 2. Confirmed Product Decisions

- There are **14 sequential levels** in two chapters.
- Levels 1–2 and 8–9 require 10 blocks in 3 minutes.
- Levels 3–4 and 10–11 require 12 blocks in 2 minutes 30 seconds.
- Levels 5–7 and 12–14 require 15 blocks in 2 minutes.
- The tractor attempts to remove the bottom block every 10 seconds.
- The tractor timer runs independently from questions, answers, block animations, and the tower height.
- The player can select one or several grammar topics before Level 1.
- The grammar selection can be changed between levels.
- The supported grammar topics are:
  - Present Simple
  - Past Simple
  - Future Simple
  - Present Continuous
  - Present Perfect Simple
  - This, These & Prepositions
- Each grammar topic has its own expandable task library.
- Recent tasks must not repeat for the same player.
- Levels 1–2 share one tower visual theme, Levels 3–4 share a second theme, and Levels 5–6 share a third theme.
- Level 7 uses a unique final tower.
- Every newly completed level awards one randomly selected locked Wonder without duplication.
- Completing Level 7 opens the seventh Wonder and displays an invitation to continue because seven more Wonders remain.
- Completing Level 14 opens the final Wonder and completes the full collection.
- The visual direction is an original, colorful 2D platform-game aesthetic. It may evoke classic arcade construction games, but it must not copy Mario characters, logos, sounds, level layouts, or branded visual assets.

## 3. Learning Goal

The player should learn to recognize natural, grammatically correct English sentences quickly and repeatedly. Gameplay must reward both correctness and response speed without hiding the grammar rule being practised.

The game is primarily recognition-based, but its data model should support future task types such as word ordering, missing-word selection, and sentence correction.

## 4. Core Game Loop

1. Show the current grammar rule in a compact reference panel.
2. Select a task from one of the active grammar libraries.
3. Display two sentence blocks, one entering from the left and one from the right.
4. Exactly one block is correct.
5. The player chooses a block using the keyboard, mouse, or touch.
6. If the answer is correct:
   - the chosen block travels toward the center;
   - the block lands on top of the tower;
   - the tower height and score increase by one;
   - short positive feedback appears;
   - the next task begins.
7. If the answer is incorrect:
   - the chosen block cracks, shakes, or falls away;
   - the tower does not grow;
   - concise corrective feedback explains the relevant rule;
   - the next task begins after a short delay.
8. Every 10 seconds, the tractor crosses the foreground and attempts to take the bottom block.
9. If the tower contains blocks, the lowest block is removed and all remaining blocks settle downward.
10. If the tower is empty, the tractor still passes and the next 10-second cycle begins normally.
11. The player wins when the tower reaches the target height.
12. The player loses when the level timer reaches zero before the target height is reached.

The game should feel quick. A normal transition to the next question should take no more than 600–900 ms. The player must never be forced to wait for the tractor animation before answering.

## 5. Level Structure

| Levels | Tower target | Time limit | Tractor cycle | Tower visual | Gameplay role |
|---|---:|---:|---:|---|---|
| 1–2 and 8–9 | 10 blocks | 03:00 | 10 seconds | Timber Worksite | Introduction or chapter restart |
| 3–4 and 10–11 | 12 blocks | 02:30 | 10 seconds | Steel City Frame | Faster decisions and longer recovery |
| 5–6 and 12–13 | 15 blocks | 02:00 | 10 seconds | Skyglass Tower | High pressure and sustained accuracy |
| 7 | 15 blocks | 02:00 | 10 seconds | Wonder Spire | First chapter finale and continue invitation |
| 14 | 15 blocks | 02:00 | 10 seconds | World Wonder Spire | Full collection finale |

Level difficulty may also increase through distractor quality, but it must never introduce grammar that the player did not select.

Suggested distractor progression:

- Levels 1–2: obvious word-order, auxiliary, and agreement errors.
- Levels 3–4: more natural-looking errors involving time markers, verb forms, and negatives.
- Levels 5–7: subtle errors that remain unambiguous to a proficient teacher.

Do not shorten the tractor interval by level unless later playtesting shows that the approved balance is too easy. The initial implementation must use 10 seconds for every level.

## 6. Grammar Selection

### Initial selection

Before starting Level 1, show six selectable grammar cards. The player may activate one or several topics. At least one topic must be active before the **Start Game** button becomes available.

Each card should contain:

- grammar topic name;
- one-sentence explanation;
- one short correct example;
- selected/unselected state;
- keyboard-focus state.

### Between levels

After the Wonder reward screen and before the next level, show the same grammar selector. Preserve the previous selection, but allow the player to add or remove topics.

Suggested English interface text:

- Heading: **Choose your grammar topics**
- Supporting text: **Select one or more topics. You can change them after every level.**
- Validation: **Choose at least one topic to continue.**
- Action: **Build the next tower**

### Task distribution

When multiple topics are selected:

- distribute questions evenly across active topics;
- do not ask the same topic more than three times consecutively unless only one topic is selected;
- give priority to topics with fewer appearances in the current level;
- optionally give slightly more weight to topics on which the player recently made mistakes;
- never change the player's selected topic list automatically.

## 7. Grammar Reference Library

The game must include an accessible **Grammar Guide** from the main menu, pause menu, grammar selection screen, and results screen. Opening the guide during a level should pause all gameplay timers, including the tractor timer.

Each topic page must contain:

- purpose and common uses;
- affirmative structure;
- negative structure;
- question structure;
- short answers where relevant;
- time markers;
- spelling or verb-form notes;
- at least three correct examples;
- common mistakes;
- a compact comparison note where confusion with another supported tense is likely.

### Present Simple

Cover habits, routines, repeated actions, facts, and states. Include third-person singular `-s/-es`, `do/does`, `do not/does not`, frequency adverbs, and stative verbs.

Reference formulas:

- Affirmative: `subject + base verb` or `subject + verb-s`.
- Negative: `subject + do/does not + base verb`.
- Question: `Do/Does + subject + base verb?`

### Past Simple

Cover completed past actions and past states. Include regular `-ed` forms, common irregular verbs, `did/did not`, and the special behaviour of `was/were`.

Reference formulas:

- Affirmative: `subject + past form`.
- Negative: `subject + did not + base verb`.
- Question: `Did + subject + base verb?`

### Future Simple

Cover predictions, spontaneous decisions, promises, offers, and future facts using `will`. Do not mix `be going to` into a Future Simple task unless the task is explicitly a comparison item.

Reference formulas:

- Affirmative: `subject + will + base verb`.
- Negative: `subject + will not + base verb`.
- Question: `Will + subject + base verb?`

### Present Continuous

Cover actions happening now, temporary situations, and changing situations. Include forms of `be`, verb `-ing` spelling, and common stative verbs that are normally not used in continuous forms.

Reference formulas:

- Affirmative: `subject + am/is/are + verb-ing`.
- Negative: `subject + am/is/are not + verb-ing`.
- Question: `Am/Is/Are + subject + verb-ing?`

### Present Perfect Simple

Cover life experience, recent results, unfinished time periods, and actions continuing up to now where appropriate. Include `have/has`, past participles, common irregular participles, and markers such as `already`, `yet`, `just`, `ever`, `never`, `since`, and `for`.

Reference formulas:

- Affirmative: `subject + have/has + past participle`.
- Negative: `subject + have/has not + past participle`.
- Question: `Have/Has + subject + past participle?`

The guide must clearly distinguish Present Perfect Simple from Past Simple, especially when a finished past time is stated.

### This, These & Prepositions

Cover singular and plural object identification with `this/these`, `it/they`, and `is/are`, as well as object positions with `in`, `on`, `under`, and `next to`. Questions must place `is` or `are` before the subject.

Reference formulas:

- Singular identity: `What's this? It's + singular noun.`
- Plural identity: `What are these? They are + plural noun.`
- Singular position: `Where is + singular noun? It is + preposition + place.`
- Plural position: `Where are + plural noun? They are + preposition + place.`

The guide must explicitly explain that `What are these?` identifies visible plural objects. `What are there?` does not pair with `They are ...`; questions about what exists in a place normally use `What is there?` followed by `There is/are ...`.

## 8. Exercise Library

### Content requirements

Create a separate data file for every grammar topic. The initial production-ready library should contain at least **100 reviewed tasks per topic**. A prototype may start with 30 tasks per topic, but it must preserve the same data structure and be explicitly marked as incomplete content.

Every task must:

- have exactly one unambiguously correct answer;
- use natural modern English;
- avoid culturally sensitive assumptions and unnecessarily difficult vocabulary;
- match the declared CEFR level;
- include a short explanation of the error;
- be reviewed by an English teacher before production release;
- avoid relying only on punctuation or capitalisation to distinguish answers;
- avoid answer pairs that can both be acceptable in different dialects or contexts;
- provide enough context for the intended tense to be identifiable.

Suggested content mix per grammar topic:

- 25% affirmative sentences;
- 20% negative sentences;
- 20% questions;
- 15% third-person or auxiliary agreement where relevant;
- 10% word order;
- 10% time markers, spelling, or irregular forms.

### Recommended task schema

```ts
type GrammarTopic =
  | "present-simple"
  | "past-simple"
  | "future-simple"
  | "present-continuous"
  | "present-perfect-simple"
  | "objects-and-prepositions";

interface SentenceTask {
  id: string;
  topic: GrammarTopic;
  cefr: "A1" | "A2" | "B1" | "B2";
  subtype:
    | "affirmative"
    | "negative"
    | "question"
    | "word-order"
    | "number"
    | "verb-form"
    | "time-marker";
  correct: string;
  distractor: string;
  explanation: string;
  ruleKey: string;
  tags: string[];
}
```

Example:

```json
{
  "id": "present-simple-a2-001",
  "topic": "present-simple",
  "cefr": "A2",
  "subtype": "verb-form",
  "correct": "Maya walks to school every morning.",
  "distractor": "Maya walk to school every morning.",
  "explanation": "Use -s with a third-person singular subject in the Present Simple.",
  "ruleKey": "present-simple.third-person-singular",
  "tags": ["routine", "third-person", "affirmative"]
}
```

### Randomisation and repetition prevention

- Randomise whether the correct answer appears on the left or right.
- Shuffle tasks with a seeded shuffle so a session can be reproduced during debugging.
- Do not repeat a task within the same level.
- Store the last 30 task IDs shown for each topic in local storage.
- Prefer unseen task IDs across later sessions.
- If the unseen pool is exhausted, recycle the least recently shown tasks first.
- Do not generate grammar tasks dynamically with an AI model during ordinary gameplay; use the reviewed local library for predictable accuracy and offline support.
- Keep content separate from game logic so teachers can add tasks without editing the engine.

### Content validation

Add a development script that checks:

- unique IDs;
- supported topic and subtype values;
- non-empty strings;
- correct and distractor values are different;
- valid CEFR values;
- minimum task count per topic;
- absence of exact duplicate sentence pairs;
- referenced `ruleKey` exists in the Grammar Guide data.

## 9. Controls and Interaction

### Keyboard

- `Left Arrow` or `A`: choose the left block.
- `Right Arrow` or `D`: choose the right block.
- `Space` or `Enter`: confirm a currently focused block if focus navigation is enabled.
- `Escape`: pause or resume.
- `G`: open the Grammar Guide and pause gameplay.
- `M`: mute or unmute audio.

### Mouse and touch

- Click or tap a sentence block to select it.
- Increase the block slightly on hover or focus.
- Do not require drag-and-drop for the primary interaction.
- Use large touch targets and keep both choices readable on tablet screens.

Ignore answer input after a choice has been locked and until the next question is ready. This prevents accidental double answers.

## 10. Tractor Behaviour

The tractor is a gameplay system, not merely a decorative animation.

- Start its first 10-second countdown when the level begins.
- Do not reset this countdown when a new question appears.
- Do not reset it after correct or incorrect answers.
- Do not pause it during feedback or block landing animations.
- Pause it only when the whole game is paused, when the Grammar Guide is open, or when the browser tab is not active.
- Show a warning approximately 3 seconds before arrival through sound, ground vibration, dust, a flashing indicator, or a combination of these.
- Let the player continue answering during the warning and tractor animation.
- At the scheduled removal moment, remove the lowest tower block if one exists.
- Animate remaining blocks settling without blocking input.
- Continue the cycle even if the tower is empty.
- Use a monotonic elapsed-time calculation rather than relying on accumulated `setInterval` calls, so timing remains accurate after frame drops.

If the correct answer lands at the same instant as removal, process events using timestamps. Apply the earlier event first. If timestamps are equal within one frame, process the tractor removal first and then add the new block. Document this rule in automated tests.

## 11. Scoring and Feedback

Tower height determines level completion. Score is a secondary motivator and should not replace the required block count.

Suggested score model:

- Correct answer: +100 points.
- Speed bonus: up to +50 points based on response time.
- Three-answer streak and above: +25 points per answer.
- Incorrect answer: no score deduction in the first version.
- Tractor removal: no direct score deduction; losing the block is already the penalty.
- Level completion time bonus: remaining whole seconds × 5.

Feedback must remain short enough not to interrupt the rhythm:

- Correct: **Perfect fit!** / **Strong sentence!** / **Block secured!**
- Incorrect: show **Not quite** followed by the task explanation.
- Tractor warning: **Tractor incoming!**
- Removed block: **The tractor took the bottom block!**

After an incorrect answer, highlight the specific corrected fragment if the data supports token-level markup. Never use colour alone to explain correctness.

## 12. World Wonders Collection

Use a fourteen-item collection containing the traditional **Seven Wonders of the Ancient World** and the **New Seven Wonders of the World**.

Ancient Wonders:

1. Great Pyramid of Giza
2. Hanging Gardens of Babylon
3. Statue of Zeus at Olympia
4. Temple of Artemis at Ephesus
5. Mausoleum at Halicarnassus
6. Colossus of Rhodes
7. Lighthouse of Alexandria

New Wonders:

1. Great Wall of China
2. Petra
3. The Colosseum
4. Chichén Itzá
5. Machu Picchu
6. Taj Mahal
7. Christ the Redeemer

Keep Wonder content in a separate configuration file so the set can later be replaced by Ancient Wonders or another teacher-approved collection without changing game logic.

### Reward rules

- On every first-time level completion, randomly award one locked Wonder.
- Never award a duplicate.
- After Level 7, show **Seven more Wonders are waiting** and offer to continue to Level 8.
- On completing Level 14, award the only remaining Wonder and complete the collection.
- Save unlocked Wonders and their award order in local storage.
- A failed or restarted level must not award a Wonder.
- Replaying a completed level may improve the score but must not award another Wonder.

### Collection screen

Display unlocked Wonders as separate illustrated landmark figures standing directly on fixed pedestal positions in the gallery background. Show seven exhibits per gallery page: three on the upper row and four on the lower row. The full collection therefore uses two gallery pages. Align every landmark by its bottom edge so it visibly stands on its pedestal. Do not place permanent information cards over the scene.

Locked card:

- silhouette or covered postcard;
- label **Undiscovered Wonder**;
- no factual description.

Unlocked exhibit:

- Wonder name;
- location and country;
- approximate construction period or completion date;
- 30–50 word fact;
- accessible **Learn more** action for touch and keyboard users.

Keep the information hidden by default. On desktop, reveal it when the cursor hovers over the landmark. The same information must appear on keyboard focus and tap for accessibility.

Suggested data schema:

```ts
interface Wonder {
  id: string;
  name: string;
  location: string;
  country: string;
  period: string;
  shortFact: string;
  image: string;
  imageAlt: string;
}
```

All historical facts must be source-checked before release. Avoid presenting disputed dates as certain.

## 13. Screens and User Flow

```text
Loading
  → Main Menu
      → New Game
          → Grammar Selection
              → Level Introduction
                  → Gameplay
                      → Level Complete
                          → Wonder Reward
                              → Grammar Selection
                                  → Next Level
                      → Level Failed
                          → Retry / Grammar Guide / Main Menu
      → Continue
      → Grammar Guide
      → Wonders Collection
      → How to Play
      → Settings
```

### Main Menu

Show the logo, **New Game**, **Continue**, **Grammar Guide**, **Wonders**, **How to Play**, and **Settings**. Disable **Continue** when no save exists.

### Level introduction

Show the level number, tower target, time limit, selected grammar topics, tower preview, and the tractor rule. Keep this screen skippable after the first viewing.

### Gameplay HUD

The HUD must show:

- level number;
- remaining time;
- current tower height and target, for example `7 / 12`;
- score and streak;
- active grammar topic for the current task;
- tractor countdown or a clearly understandable incoming indicator;
- pause, sound, and Grammar Guide buttons.

### Results

The completion screen should show accuracy, correct answers, mistakes, average response time, tractor removals, score, and personal best. The failure screen should explain whether the timer expired and offer an immediate retry.

## 14. Visual Direction

Use a polished original 2D arcade-platform style with construction-site storytelling. Prefer layered static illustrations with selective animation over making every object move. Motion should communicate state and reward actions rather than create constant distraction.

### Recommended visual system

- High-resolution illustrated background layers with WebP/AVIF delivery and PNG fallback where transparency is required.
- Parallax sky, distant city, cranes, and foreground platform.
- WebGL-rendered blocks, particles, lighting accents, and sprite animations.
- Slight perspective and squash-and-stretch when a block lands.
- Tower sway that increases subtly with height but never affects answer readability.
- Dust puffs, bolt sparks, impact rings, and small debris particles.
- Animated tractor wheels, suspension, exhaust puffs, and foreground camera shake.
- Distinct tower materials for the four visual themes.
- Colour-coded sentence blocks, but randomise colour independently from correctness.
- Strong text contrast using a dark translucent sentence plate or outline.
- Reduced decorative movement while the player is reading.

### Motion hierarchy

Use animation for:

1. block entrances and selections;
2. correct block placement;
3. incorrect block rejection;
4. tractor warning, arrival, and removal;
5. tower completion;
6. Wonder reveal.

Background characters or machinery may use slow looping animation, but these loops must pause under the reduced-motion setting.

### Responsive composition

- Every game screen must fit completely inside the current viewport with **no page-level horizontal or vertical scrolling**.
- Support narrow phones, tablets, laptops, desktop monitors, classroom projectors, and common 4:3 and 16:9 presentation resolutions.
- Treat the viewport as a fixed game stage. Reflow grids, reduce decorative spacing, shorten non-essential labels, and scale artwork within safe limits instead of allowing the document to grow beyond the screen.
- Keep gameplay HUD controls, both sentence choices, tower target, timer, tractor warning, primary action, and modal close action visible at the same time.
- Menus must switch to compact multi-column button and topic-card layouts on short or narrow screens.
- Collection galleries must preserve the illustrated stage aspect ratio and scale all pedestal coordinates together so landmarks remain standing on their bases.
- Dialogs must reflow and compact their content to the viewport; they must not create document scrolling behind the game.
- Test at minimum at 320×568, 390×844, 768×1024, 1024×768, 1366×768, 1920×1080, and 1920×1200.
- Desktop: sentence choices enter from left and right with the tower in the centre.
- Tablet: keep the same layout if sentence width remains readable.
- Narrow mobile: place choices in the lower left and lower right or stack them vertically while preserving explicit left/right controls.
- Do not scale sentence text below 16 CSS pixels.
- Respect safe-area insets on mobile devices.

## 15. Audio Direction

Use original or properly licensed audio only.

- Short mechanical click when a choice gains focus.
- Strong but pleasant placement sound for a correct block.
- Soft crumble sound for an incorrect block.
- Distant engine cue before the tractor appears.
- Distinct removal impact.
- Short musical sting for tower completion and Wonder reveal.
- Low-intensity looping construction ambience.

Provide separate music and sound-effect volume controls, a mute control, and persistent settings. The game must remain fully understandable without audio.

## 16. Recommended Technology Stack

Build the initial game as a responsive web application:

- **Vite** for development and production bundling.
- **TypeScript** with strict mode for reliable game-state and content models.
- **Phaser 3** for the 2D WebGL/Canvas renderer, scene lifecycle, sprites, particles, input, camera effects, and tweens.
- **React** for menus, settings, Grammar Guide, results, and collection screens if the wider product benefits from component-based UI. Keep the live Phaser canvas isolated behind a small integration layer. For a smaller build, semantic HTML overlays can replace React.
- **Zustand** or a small typed state machine for cross-screen progress and settings. Do not duplicate live gameplay state between React and Phaser every frame.
- **Howler.js** for robust audio management, or the Web Audio API if dependency size is a priority.
- **Vitest** for unit tests.
- **Playwright** for end-to-end keyboard, mouse, pause, timer, and progression tests.
- **ESLint** and **Prettier** for code quality.

Use Phaser's built-in tween and particle systems for gameplay motion. Add GSAP only if the menu and Wonder-reveal choreography cannot be expressed cleanly with the existing animation system; avoid maintaining two animation engines without a clear need.

Progressive enhancement requirements:

- use WebGL when available;
- fall back to Canvas rendering;
- load compressed assets through an asset manifest;
- lazy-load tower and Wonder art that is not needed for the current level;
- use service-worker caching only after the core game is stable;
- keep an HTML UI layer for readable, accessible sentence text and menus where practical.

## 17. Suggested Project Structure

```text
src/
  app/
    App.tsx
    routes.ts
    store.ts
  game/
    config.ts
    scenes/
      BootScene.ts
      PreloadScene.ts
      LevelScene.ts
      ResultsScene.ts
    systems/
      QuestionSystem.ts
      TowerSystem.ts
      TractorSystem.ts
      LevelTimer.ts
      ScoringSystem.ts
    objects/
      SentenceBlock.ts
      Tower.ts
      Tractor.ts
    events.ts
  content/
    grammar/
      present-simple.json
      past-simple.json
      future-simple.json
      present-continuous.json
      present-perfect-simple.json
    grammar-guide.json
    wonders.json
    levels.json
  ui/
    MainMenu/
    GrammarSelector/
    GrammarGuide/
    GameplayHud/
    WonderCollection/
    Settings/
  services/
    progressStorage.ts
    taskSelector.ts
    audio.ts
  styles/
  tests/
scripts/
  validate-content.ts
public/
  assets/
    backgrounds/
    towers/
    tractor/
    blocks/
    wonders/
    audio/
```

## 18. Game State Model

Use explicit states to prevent overlapping inputs and timer bugs:

```text
BOOT
MENU
TOPIC_SELECTION
LEVEL_INTRO
QUESTION_ENTERING
AWAITING_ANSWER
RESOLVING_ANSWER
LEVEL_COMPLETE
LEVEL_FAILED
WONDER_REVEAL
PAUSED
```

The tractor is a parallel timed system inside active level states. It must be able to animate while the question state moves from `AWAITING_ANSWER` to `RESOLVING_ANSWER` and back.

The level timer and tractor scheduler should share a single pause-aware game clock. Do not use CSS animation completion events as the source of gameplay truth.

## 19. Save Data

Persist locally:

- highest unlocked level;
- completed levels;
- best score and statistics per level;
- unlocked Wonders and award order;
- active grammar topics;
- recent task IDs per topic;
- sound, music, language, motion, and display settings;
- optional anonymous player profile name.

Version the save format so future releases can migrate old data.

```ts
interface SaveDataV1 {
  version: 1;
  highestUnlockedLevel: number;
  completedLevels: number[];
  bestScores: Record<string, number>;
  unlockedWonderIds: string[];
  selectedTopics: GrammarTopic[];
  recentTaskIds: Partial<Record<GrammarTopic, string[]>>;
  settings: {
    musicVolume: number;
    effectsVolume: number;
    reducedMotion: boolean;
  };
}
```

## 20. Accessibility

- Meet WCAG 2.2 AA contrast targets for UI and sentence text.
- Make every action available by keyboard.
- Show visible focus rings.
- Provide text alternatives for Wonder and decorative artwork.
- Do not communicate right/wrong state only with red and green.
- Include a reduced-motion option and respect `prefers-reduced-motion` by default.
- Stop camera shake and minimise large travel animations under reduced motion.
- Use semantic HTML for menus and grammar reference content.
- Use polite live announcements for score, correct/incorrect feedback, tractor removal, and level completion without reading the entire HUD repeatedly.
- Pause when the browser tab becomes hidden; resume only after the player confirms.
- Keep timed gameplay unchanged for the initial mode, but design the level configuration so an untimed classroom accessibility mode can be added later.

## 21. Performance Targets

- Maintain 60 FPS on a typical modern laptop and 30+ FPS on a mid-range mobile device.
- Keep initial compressed download below approximately 5 MB; load later tower and Wonder assets on demand.
- Largest Contentful Paint below 2.5 seconds on a reasonable broadband connection after the first production optimisation pass.
- Avoid layout shifts when the HUD, tooltips, or feedback text appears.
- Pool particles and frequently created block objects.
- Cap device pixel ratio for the game canvas on high-density mobile screens.

## 22. Testing Requirements

### Unit tests

- level configuration returns the correct target and duration for all fourteen levels;
- multi-topic selection distributes questions fairly;
- question history prevents immediate repetition;
- correct side randomisation is balanced over a large sample;
- tractor removes only the lowest block;
- tractor cycle is independent of question changes;
- pause freezes both clocks and resume preserves remaining durations;
- completing a level awards exactly one locked Wonder;
- Level 7 displays the continue invitation after the seventh unique Wonder;
- Level 14 awards the final remaining Wonder;
- failed and replayed levels do not duplicate rewards;
- save migration and corrupted-save recovery work safely.

### End-to-end tests

- complete a level using only the keyboard;
- complete a level using mouse clicks;
- choose multiple grammar topics and receive tasks from all of them;
- open the Grammar Guide mid-level and confirm that timers stop;
- answer while the tractor animation is running;
- lose a block and continue playing without input lock;
- fail at zero time and retry;
- unlock all fourteen Wonders across the full campaign;
- open Wonder facts through hover, focus, and touch;
- enable reduced motion and confirm that essential state remains visible.

### Content QA

- automated schema validation passes;
- all 500 production tasks receive teacher review;
- every task has one defensible answer;
- every explanation corresponds to a published Grammar Guide rule;
- all Wonder facts and image licences are recorded.

## 23. Implementation Phases

### Phase 1 — Playable core

- Implement one level, one tower visual, one grammar topic, keyboard/mouse input, a timer, and the independent tractor cycle.
- Use placeholder art only where final assets are unavailable.
- Validate that answering remains possible during tractor activity.

### Phase 2 — Content and progression

- Add all fourteen level configurations.
- Add multi-topic selection and all six grammar libraries.
- Add save data, results, retry, and between-level selection.

### Phase 3 — Collection and reference

- Add the complete Grammar Guide.
- Add Wonder rewards, collection screen, hover/focus/tap facts, and final collection completion.

### Phase 4 — Visual and audio polish

- Replace placeholders with final tower, block, tractor, background, particle, and Wonder assets.
- Add parallax, impact effects, Wonder reveals, responsive layouts, music, and sound effects.

### Phase 5 — QA and optimisation

- Complete accessibility testing, content validation, automated tests, device testing, asset compression, and performance work.
- Conduct teacher review and student playtesting before production release.

## 24. Definition of Done

The first production release is complete when:

- all fourteen levels follow the approved targets and time limits;
- the tractor removes the bottom block every 10 active gameplay seconds without waiting for the player;
- keyboard, mouse, and touch controls are usable;
- one or several grammar topics can be selected initially and between levels;
- all six Grammar Guide sections are complete;
- each topic has at least 100 validated and teacher-reviewed tasks;
- tasks do not repeat within a level and recent cross-session repetition is minimised;
- each newly completed level unlocks one unique Wonder, Level 7 offers the second chapter, and Level 14 completes the collection;
- Wonder information works on hover, focus, and tap;
- game UI and educational content are entirely in English;
- progress and settings survive a page reload;
- accessibility and performance targets are met;
- no copyrighted game characters, logos, music, sound effects, or copied layouts are used.

## 25. Future Extensions

The architecture should allow, but the first release does not require:

- teacher-created task packs;
- classroom codes and student progress dashboards;
- additional CEFR filters;
- word-order and fill-the-gap modes;
- more Wonder collections;
- daily challenges;
- cloud saves;
- multilingual interface localisation;
- an untimed practice mode;
- optional adaptive difficulty based on error patterns.

These extensions must not complicate or delay the core fourteen-level version.
