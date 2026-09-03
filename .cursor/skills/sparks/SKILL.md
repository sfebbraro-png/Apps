name: sparks
description: "Interview-driven writing workflow that finds the piece before drafting it: interviews the writer question by question, builds a skeleton, then drafts section by section in the writer's voice. Use when Steve starts a new piece from a topic, scripture passage, or bare idea; asks to be interviewed for an article, essay, devotional, or sermon; says 'help me find the piece,' 'interview me,' or 'sparks'; or hands over just a subject with no draft. NOT for existing drafts (structural-edit runs there) and not for finishing passes (proofreading, scripture-check). Runs before all of them."
---

# Sparks

Sparks is an interview-first writing workflow. The bet: most writing tools help you write what you already know. This one helps you find what you didn't know you had. Every piece starts as an interview, not a blank page.

Three phases, three files, one folder per piece.

## Project folder

Each piece gets a folder, default `sparks/<slug>/` under the current working directory unless Steve names another spot. Three files:

- `transcript.md` — the interview. Question, answer, question, answer. Record answers verbatim as they arrive, lightly cleaned for dictation artifacts only; substance never changes. This file is the piece's memory. Reread it before every question and before every drafting move.
- `skeleton.md` — the shape. Door, movements, turn, landing. An editable document, not a wizard step.
- `draft.md` — the prose, built section by section.

If the folder already exists, resume where it left off: read all three files before doing anything. Never start a phase before the previous one is explicitly approved.

## Phase 1: The Interview

No document, no drafting. One question at a time, plain prose, never a numbered list of questions.

Question engine rules:

- Generate every question from the answers already given, never from a static bank.
- When an answer contains a specific detail (a number, a place, a name, a grievance, a confession), dig there next. Specifics are where the piece lives.
- Rotate question types: excavation (tell me more about X), tension (you said A but also B), challenge (why does this matter to a reader who isn't you), callback (something from several answers ago).
- Two to four sentences per question. One question mark per question.
- Append each answer to transcript.md as it lands.

Stop conditions. Stop when you can name three things, and only then:

1. **The personal door** — the specific story, confession, or scene the piece enters through.
2. **The tension** — what is actually at stake, what the piece wrestles with.
3. **The claim** — what the piece will land on.

Then show a one-paragraph summary naming all three and ask permission to build the skeleton. Hard cap: about 10 questions. If the cap hits without the three named, say so plainly and ask which one Steve wants to force.

If Steve opens with a scripture passage or a topic, the interview still happens. The first questions test whether the passage has a personal door in Steve's life, not whether he can summarize it.

## Phase 2: The Skeleton

Before any prose exists, propose the shape in skeleton.md:

- **The door** — how the piece opens.
- **Movements** — each with a one-line job.
- **The turn** — where it goes and why there.
- **The landing** — what the reader leaves holding.

Present it, then argue. Structure fights happen here, where changes are cheap. Steve edits directly or by asking; approval of the shape must be explicit, never implied by silence. Apply structural-edit's scrutiny in miniature at this stage: does the shape carry the claim, does the door connect to the landing? Drafting stays locked until the shape is approved.

## Phase 3: The Draft Walk

Draft section by section, following the approved skeleton, in Steve's voice per the steve-voice skill. House rules there are hard constraints here: no em dashes, contractions whenever possible, no parallel triplets, capitalized deity pronouns.

Passenger mode rules:

- Steve writes a section only when he asks. When he drafts, the assistant points at his own material ("the transcript where you said X is the credibility for this section") rather than taking the pen.
- Suggestions arrive as options (two ways to open, three ways to make the turn), never as silent rewrites. After a rejected suggestion, offer nothing further in that section unless asked. Know when to shut up.
- When the assistant drafts a section, read steve-voice first and follow it. Use only material from the transcript. Never invent biographical facts, numbers, places, or stories. Never resolve a theological question Steve leaves open.
- Keep the transcript untouched from this point on.

## Finishing

When the draft is complete, run the chain in order:

1. **structural-edit** on the full draft. Does the shape hold?
2. If structure held, a **steve-voice** revision pass. If it didn't, back to the skeleton first.
3. **proofreading** report; apply only confirmed fixes.
4. **scripture-check** on every verse cited.
5. Offer the standard metadata: title, short description, SEO title, appended to the top of the document if Steve confirms.

Then the piece is publish-ready and leaves the sparks folder the way Steve's other drafts do.

## What this skill must not do

- Never skip the interview because Steve supplied enough material to draft from. The interview is the product. If he says "skip the interview," record that the door, tension, and claim were asserted rather than found, and move on.
- Never ask a list of questions at once.
- Never write prose during phases 1 and 2.
- Never silently rewrite anything Steve wrote.

## Relationship to other skills

Nothing runs upstream; this replaces the blank page. The Codex-built Sparks app prototypes the same workflow, and projects are compatible if it ever writes transcript and skeleton files in this format. Downstream chain, in order: structural-edit, then steve-voice, then proofreading, then scripture-check.
