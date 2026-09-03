---
name: steve-voice
description: >-
  Write or revise any text in Steve's actual voice, derived from recorded speech
  samples, project files, and direct observation. Trigger whenever Steve asks to
  write "in my voice," draft a personal essay, Substack article, devotional, sermon
  material, Bible lesson, or first-person reflection, asks to make something "sound
  like me," or hands over a rough draft, bullet notes, or a scripture passage to
  turn into finished prose. Also use when revising a draft that sounds generic or
  AI-written and Steve wants it corrected toward his real voice. This skill replaces
  humanskill and thats-me, which are now folded into it. Covers both composing new
  pieces and editing existing theological writing for voice, clarity, and human cadence.
---

# Steve voice

Write or revise prose so it sounds like Steve wrote it: warm, spoken, theologically serious, concrete, and human. This skill replaces **humanskill** and **thats-me**.

**Not this skill:**

- [structural-edit](../structural-edit/SKILL.md) — shape and ambition first; run that before a full rewrite when the draft may not hold together
- [proofreading](../proofreading/SKILL.md) — mechanics only, after voice is settled
- [reformed-exposition](../reformed-exposition/SKILL.md) — full expository treatment; when Steve wants that content *in his voice*, draft with exposition method then pass through this skill, or compose here using [teacher-foundation](../teacher-foundation/SKILL.md) guardrails

**Requires:** Apply [teacher-foundation](../teacher-foundation/SKILL.md) theological guardrails and Scripture citation rules when the piece is Bible teaching or devotion. Voice preferences in this skill win on cadence and phrasing.

Read [references/voice-profile.md](references/voice-profile.md) and [references/banned-patterns.md](references/banned-patterns.md) before drafting or revising. When possible, refresh against recent samples in Drive (Substack drafts, published pieces, voice notes) rather than inventing a generic "warm Christian writer" voice.

## What this skill does

1. **Compose** new pieces from a passage, bullets, notes, transcript, or brief.
2. **Revise** existing drafts toward Steve's voice: cut AI cadence, restore spoken rhythm, keep his theology and claims intact.
3. **Humanize** text that reads generic without changing the argument.

Always preserve Steve's meaning. Voice work is not permission to invent stories, soften Reformed convictions, or add biography he did not provide.

## Source of truth for the voice

Prefer evidence over stereotype, in this order:

1. Steve's own draft, bullets, or spoken notes in the current request
2. Recent published or near-published pieces (e.g. Substack Upside Down series, "The Holy But")
3. Dictated voice notes and interview transcripts (speech patterns: "I mean," self-correction, ordinary words)
4. [references/voice-profile.md](references/voice-profile.md)
5. Teacher-foundation voice rules and banned patterns

If a new sample contradicts the profile, trust the sample and update the profile when Steve confirms.

## Core voice traits

Write like a sharp friend teaching a living-room Bible study, not like a brand or a seminary paper.

- **Spoken cadence.** Contractions. Direct. "I don't think that's what's going on." "I mean, think about that." Occasional self-correction that actually clarifies.
- **Concrete first.** Open with a scene, object, loan, commercial break, garden, or ordinary situation before the claim. Abstract thesis paragraphs feel like someone else.
- **Mixed sentence length.** In every stretch of three or more sentences, vary length on purpose. Include short lines (under 10 words) and longer ones that carry a condition or consequence. Fragments are fine when they earn their place.
- **You-address in application.** When the piece calls for response, speak to the reader. Specific Monday-morning moves beat "grow in faith."
- **Theology without Christianese.** Reformed and clear. Name doctrines when the text requires them. Prefer plain English over buzzwords. Westminster and confessional language is allowed when it is the clearest tool, then briefly explained.
- **Scripture on the page.** Quote the preferred translation (default ESV per teacher-foundation). Cite book, chapter, verse. Greek or Hebrew only when it earns thirty seconds of clarity: transliterate, gloss, say why it matters.
- **Honest objections.** Name what the room will push back on, in ordinary words, then answer from the text.
- **Frame that returns.** If the opening sets a device (loan, ad sermon, little word "but"), bring it back at the end without a tidy slogan restatement.
- **No padding.** Every sentence earns its place. End on a sharp final line and stop.

## Hard constraints (never violate)

- **No em dashes or en dashes as rhetorical bridges.** Use a period, comma, colon, or parentheses. Hyphens in compound words are fine.
- **No markdown decoration in finished prose** unless Steve asks for formatted notes (no headers, bullets, bold, or asterisks in Substack/essay output by default).
- **No AI slop.** See [references/banned-patterns.md](references/banned-patterns.md) and teacher-foundation's banned list. Also refuse: "delve," "unpack," "lean into," "deep dive," "game-changer," "at the end of the day," "here's the thing" as a stock opener (Steve sometimes uses near-spoken pivots; prefer "Here's where it gets interesting" only if it matches a real turn, not as filler).
- **No fake biography.** Do not invent childhood scenes, Italian-family color, or personal anecdotes Steve did not supply. If a piece needs a personal hook and none is given, use a general concrete scenario or ask him.
- **No read-aloud teaching script** for Bible study rooms (teacher-foundation Rule 4). Exposition-in-his-voice is study material he will make his own.
- **Do not announce** that you are writing in his voice or avoiding AI style. Just write.

## Workflow: compose

1. Confirm form: Substack article, devotion, personal essay, sermon notes, lesson material, memoir scene, etc.
2. Gather inputs: passage, angle, bullets, brief from lesson-brainstorm, research notes, any must-keep lines.
3. If the ask is a full draft from thin notes and the shape is unclear, offer a quick structural fork first (or run structural-edit if a draft already exists). Do not bury a muddy argument under pretty voice.
4. Draft in Steve's voice per this skill.
5. Self-check against voice-profile and banned-patterns. Read aloud mentally for rhythm.
6. Deliver the piece. If Steve wants a Drive file, create `[Title] (steve-voice)` or the title he specifies via Google Docs.

## Workflow: revise

1. Read the whole draft once.
2. Separate **keep** (claims, citations, protected concrete passages) from **voice problems** (AI cadence, flat rhythm, generic openers, soft closers).
3. If structure is broken (dropped frame, buried hinge, diluted ending), say so briefly and recommend structural-edit before a full voice pass, unless Steve explicitly wants voice-only cleanup.
4. Revise toward his voice without changing meaning. Quote any line you cut for voice reasons only if he asks for a diff.
5. Default deliverable when working from a Google Doc: new Doc titled `[Original] (steve-voice)` with the full revised text (same pattern as proofreading). Offer find/replace only if he asks.

## Relationship to other skills

| Stage | Skill |
| --- | --- |
| Clarify lesson before writing | lesson-brainstorm |
| Research the passage | lesson-research |
| Full expository treatment | reformed-exposition → then steve-voice if he wants it to sound like him |
| Does the draft hold together? | structural-edit |
| Sound like Steve | **steve-voice** (this skill) |
| Mechanics | proofreading |

Order for a full piece: research/brainstorm as needed → draft → structural-edit if needed → steve-voice → proofreading.

## Output defaults

- **Substack / essay / devotion:** plain prose, no markdown chrome, section breaks by blank line only.
- **Teaching notes he will adapt:** may use light structure if he asks; still sound spoken.
- **Memoir / personal:** first person, concrete sensory detail only from his material; reverence for real people.
- End without "In conclusion," "Ultimately," or a thesis restatement. Land the last true sentence and stop.

When finishing a pass, one optional line of process note is allowed in chat (not in the piece): what you changed for voice, and whether proofreading should run next.
