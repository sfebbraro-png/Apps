---
name: proofreading
description: >-
  Use this skill whenever the user asks to proofread, copyedit, check, or "give
  this a once-over" for a document, blog post, essay, sermon or lesson draft,
  app-adjacent doc, or any other prose. Trigger on phrases like "proofread this,"
  "check this for errors," "does this read clean," "fix the grammar," "any typos
  in here," or when the user hands over a finished-feeling draft and wants it
  checked before publishing. Also trigger when the user asks whether a paragraph
  is too long, too crammed, or should be split. This skill finds spelling, grammar,
  punctuation, and consistency errors, and evaluates paragraph construction
  (unity, length, whether paragraphs should be split or merged) — but it does NOT
  rewrite for voice or restructure arguments. It always reports findings and asks
  for confirmation before editing the document.
---

# Proofreading

Proofreading is the last-mile pass on a piece of writing: catching the mechanical errors and structural rough edges that distract a reader from the content, without touching the author's ideas, argument, or voice. This skill treats that as a firm boundary, not a suggestion — a proofreader who rewrites a sentence because they'd have phrased it differently has stopped proofreading and started ghostwriting, and that's not what this skill is for. If a passage's content or voice is off, flag it as a note; don't silently rewrite it.

## Scope: what this is and isn't

**In scope (fix candidates):**
- Spelling, typos, and word-usage errors (their/there, affect/effect, etc.)
- Grammar: subject-verb agreement, verb tense consistency, pronoun agreement, article usage, parallelism
- Punctuation: comma splices, run-ons, fragments (when accidental), apostrophes, quotation marks, dashes/hyphens
- Capitalization and number formatting
- Internal consistency: spelling variants (British/American), terminology, serial-comma usage, heading/list style, quote-mark style
- Paragraph construction — see below

**Out of scope (flag, don't fix):**
- Rewriting for voice, tone, or style preference
- Restructuring arguments, cutting content, or changing what the piece says
- Fact-checking or theological/substantive review

If something in scope shades into something out of scope — e.g., a paragraph's sentences are all grammatically fine but the paragraph rambles across three unrelated ideas — call it out in the report as a structural note, and let the user decide what to do with it. Don't fix it yourself unless they ask.

Read [references/checklist.md](references/checklist.md) for the full category-by-category checklist (grammar, punctuation, consistency) before writing the report — it's the detailed reference for *why* something is an error, not just a list to skim.

## Paragraph construction

Mechanical correctness isn't the whole job — a paragraph can be grammatically flawless and still fail the reader. For each paragraph, check:

- **Unity**: does it develop one idea? A paragraph that pivots to a second, unrelated point partway through is a candidate for splitting at the pivot.
- **Length and pacing**: is it a wall of text that would benefit from a break, or a run of choppy one- and two-sentence paragraphs that could be combined into a fuller thought? Neither long nor short is inherently wrong — judge it against how the piece reads elsewhere (a sermon or essay with intentionally punchy short paragraphs shouldn't be flagged for having short paragraphs).
- **Topic clarity**: can a reader tell what the paragraph is about from its opening sentence, or does it take a few sentences to find its footing?
- **Transitions**: does the paragraph connect to the one before and after, or does it land abruptly?

When you recommend a split or merge, say exactly where (quote the sentence the split would fall before/after) and why. This is a suggestion the user weighs, not an automatic fix — paragraph splits are more judgment call than grammar rule, so hold them to the same "report first" bar as everything else.

## Workflow

1. **Read the target document** in full before evaluating anything — errors and paragraph issues are often only visible in context (a pronoun's antecedent, a consistency check against earlier terminology, whether a paragraph's length is unusual for *this* piece).

2. **Produce a report**, not edits. Never touch the file in this step. Use this structure:

```
## Proofreading report: <document name>

### Spelling, grammar & punctuation
1. [location/quote] — issue → suggested fix
2. ...

### Consistency
1. [location/quote] — issue → suggested fix
2. ...

### Paragraph structure
1. [location/quote] — issue → suggestion (split/merge/reorder) → reasoning
2. ...

### Notes (not fixed, flagged only)
- anything structural/voice-related that's outside proofreading scope
```

   Number every item — the user will reference these numbers to select which to apply. If a category has nothing to report, say so briefly rather than omitting the section (it tells the user that category was actually checked).

3. **Ask before editing.** After the report, explicitly ask whether to apply the corrections — e.g., "Want me to apply these? You can say 'all', give me a list like '1, 3, 5-7', or 'none.'" Do not edit the file until the user responds.

4. **Apply only what's confirmed.** If the user says "all," apply every numbered fix. If they name a subset, apply only those. If they say no, stop — the report stands on its own as the deliverable. When applying paragraph splits/merges, make only the structural change requested (where the break goes) — don't also smooth wording while you're in there unless that specific fix was also confirmed.

5. **Confirm what changed.** After editing, briefly summarize what was applied and what was left alone (declined items, or "notes" that were never fix candidates).

## Working with the document

Read the actual file with the Read tool rather than asking the user to paste text, when a file path is available. Apply confirmed edits with StrReplace (or Write, for changes touching most of the file). Preserve the original formatting conventions of the document (Markdown syntax, existing heading levels, etc.) — proofreading fixes formatting *errors*, it doesn't impose a new format.

When the document is a Google Doc or Drive file and a path isn't available, read it with the Google Drive tools. Present the report in chat first. After confirmation, apply fixes by creating a revised copy (the Drive tools cannot surgically edit an existing Doc body) unless the user asks for find/replace blocks in chat only.
