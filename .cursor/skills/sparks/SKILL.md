---
name: sparks
description: >-
  Interview-driven writing workflow that speaks the draft as it goes: interviews
  the writer question by question while shaping the answers into the article live.
  Use when Steve starts a new piece from a topic, scripture passage, or bare idea;
  asks to be interviewed for an article, essay, devotional, or sermon; says 'help
  me find the piece,' 'interview me,' or 'sparks'; or hands over just a subject
  with no draft. NOT for existing drafts (structural-edit runs there) and not for
  finishing passes (proofreading, scripture-check). Runs before all of them.
---

# Sparks

Sparks is an interview-first writing workflow, and the draft is written live during the interview. The bet: most writing tools help you write what you already know. This one helps you find what you didn't know you had. Steve speaks the article; the interview finds it and shapes it as it lands.

The interview is also the ordering mechanism. Because each answer responds to one question at a time, the article comes out in order by construction: Steve thinks the piece into shape as he speaks it, instead of dumping a jumbled brainstorm and untangling it afterward.

One pass, three files, one folder per piece.

## Entry points

Sparks starts from a bare subject: a topic, a hunch, a verse reference Steve isn't even sure is the right one. That is the whole input; the interview does the rest.

If Steve arrives with an existing rough draft or a jumbled brainstorm from Obsidian, that is not sparks. The material already exists, so the job is organizing and revising what's there, not interviewing. Don't run the five W's on a finished jumble; shape it directly.

When Steve cites a verse he's unsure about, verify the reference early, before the draft leans on it, then move on. The interview is not a Bible study.

## Project folder

Each piece gets a folder, default `sparks/<slug>/` under the current working directory unless Steve names another spot. Three files:

- `transcript.md` — the raw log. Question, verbatim answer, question, verbatim answer. Shaping may trim and reorder later, but the original words live here untouched. This is the piece's memory; reread it before every question and before every shaping move.
- `skeleton.md` — the living outline. Started as soon as the trigger, intent, and audience are named, then updated as sections accumulate. Not a gate.
- `draft.md` — the article as it's being built, section by section.

The transcript is append-only. New Q&A blocks go on the end of the file, never inserted or rewritten in place. The safe pattern is to append, not to string-replace inside existing blocks; if an edit to the transcript errors or the file looks scrambled, stop and re-read the whole file, verify the Q&A order against the conversation, and repair by rewriting the full file only if needed. The record matters more than the editing method.

If the folder already exists, resume where it left off: read all three files before doing anything.

## The interview-draft loop

One question at a time, plain prose, never a numbered list of questions. After each answer, shape it into article prose on the spot, show the shaped version, then move to the next question unless Steve adjusts.

How shaping works:

- A substantial answer (a paragraph or more) is already article material. Shape it immediately: apply the house rules (no em dashes, contractions whenever possible, no parallel triplets, capitalized deity pronouns), tighten cadence, cut dictation artifacts. Show the shaped prose, then append it to `draft.md` under a working heading.
- A sparse answer (a few words) is a seed. Build on it: expand what Steve gave into a candidate passage, staying inside his words, and show it for his reaction.
- Shaping means cadence, order, and house rules. It never means new facts. Use only material from the transcript. Never invent biographical details, numbers, places, or stories. Never resolve a theological question Steve leaves open.
- Assistant-authored lines get flagged. Shaping goes beyond house-rule cleanup the moment it adds a line Steve didn't say (a coined phrase, a sharpened sentence, an added contrast). That's allowed, but each such line is explicitly flagged as assistant-authored and gets a keep-or-cut decision from Steve before it stays in the draft. Silent insertion is a violation.
- The verbatim answer goes into `transcript.md` as it lands, before any shaping.
- After a rejected shaping, offer nothing further on that passage unless asked. Know when to shut up.

Question engine rules:

- Generate every question from the answers already given, never from a static bank.
- When an answer contains a specific detail (a number, a place, a name, a grievance, a confession), dig there next. Specifics are where the piece lives.
- Rotate question types: excavation (tell me more about X), tension (you said A but also B), challenge (why does this matter to the reader you just named), callback (something from several answers ago).
- The claim objection is mandatory. Once the piece's load-bearing claim becomes visible, the interview isn't finished until its strongest objection has been raised and answered. Ask it as Steve's smartest reader would raise it, and let the answer become a section of the draft. A piece that never faced its best counterargument in the interview will meet it in the comments section instead.
- If Steve opens with a scripture passage or a topic, the interview still happens. The first questions find the trigger and whether the passage connects to something Steve has actually lived or actually noticed, not whether he can summarize it.

## The five W's

The interview's coverage checklist, folded in as questions arise rather than asked in order:

- **What** — the trigger. The moment, incident, or overheard thing that started the piece. Every piece has one; find it early.
- **Why** — the intent. Why write it, and what should change in the reader who finishes it.
- **Who** — the audience. Who the article is for.
- **When** and **Where** — the context that grounds the trigger in a real time and place.

Track coverage as you go. When one is still missing and the draft needs it, ask for it. The old door-tension-claim trio is retired: for a personal piece the door is the trigger, for a teaching or opinion piece there may be no door at all, only a noticing. Either way the five W's carry the load.

## The living outline

Start `skeleton.md` as soon as the trigger, intent, and audience are named. Sketch the shape emerging from what's been spoken, then update it as sections accumulate. Reordering is expected and cheap; do it in the outline, not by silently rearranging prose. When all five W's are covered and the landing is visible (the ending knows what it lands on), say so plainly and settle the final draft order.

The skeleton carries a decisions log as a standing section. Every keep-or-cut call Steve makes during the session lands there: approved lines, settled questions, chosen directions (landing approach, kept phrases, corrections noted). Without it, a resumed session re-litigates settled questions. Append to it as decisions happen, don't reconstruct it from memory.

## Finishing

When the last section is shaped and the order is settled, run the chain in order:

1. **structural-edit** on the assembled draft. Does the shape hold?
2. If structure held, a **steve-voice** revision pass. If it didn't, reorder and reshape first.
3. **proofreading** report; apply only confirmed fixes.
4. **scripture-check** on every verse cited.
5. Offer the standard metadata: title, short description, SEO title, appended to the top of the document if Steve confirms.

Then the piece is publish-ready and leaves the sparks folder the way Steve's other drafts do.

## What this skill must not do

- Never front-load all questions before drafting. The interview and the draft are the same activity. If Steve asks for a piece to run ask-first-draft-later, honor it as a variant for that piece only.
- Never ask a list of questions at once.
- Never invent material, ever. Steve's words are the only source.
- Never apply a shaping silently. Every reshaped passage is shown before it lands in the draft.
- Never delete or rewrite the transcript. It is the record of what was actually said.

## Relationship to other skills

Nothing runs upstream; this replaces the blank page. Downstream chain, in order: structural-edit, then steve-voice, then proofreading, then scripture-check. The Codex-built Sparks app prototypes the same workflow; projects are compatible if it writes transcript and skeleton files in this format.
