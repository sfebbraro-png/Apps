---
name: proofreading
description: >-
  Last-mile proofreading for documents, blog posts, essays, sermons, lesson drafts,
  and other prose. Use when the user asks to proofread, copyedit, check, or "give
  this a once-over"; phrases like "proofread this," "check this for errors,"
  "does this read clean," "fix the grammar," "any typos in here"; when they hand
  over a finished-feeling draft before publishing; or when they ask whether a
  paragraph is too long, too crammed, or should be split. Finds spelling, grammar,
  punctuation, consistency, and paragraph-construction issues. Does NOT rewrite for
  voice or restructure arguments. Always reports findings and asks for confirmation
  before editing.
---

# Proofreading

Proofreading is the last-mile pass on a piece of writing: catching the mechanical errors and structural rough edges that distract a reader from the content, without touching the author's ideas, argument, or voice.

This skill treats that as a firm boundary, not a suggestion. A proofreader who rewrites a sentence because they'd have phrased it differently has stopped proofreading and started ghostwriting. If a passage's content or voice is off, flag it as a note; don't silently rewrite it.

Read [checklist.md](checklist.md) for the full category-by-category checklist before writing the report. It is the detailed reference for why something is an error, not just a list to skim.

## Scope: what this is and isn't

### In scope (fix candidates)

- Spelling, typos, and word-usage errors (their/there, affect/effect, etc.)
- Grammar: subject-verb agreement, verb tense consistency, pronoun agreement, article usage, parallelism
- Punctuation: comma splices, run-ons, fragments (when accidental), apostrophes, quotation marks, dashes/hyphens
- Capitalization and number formatting
- Internal consistency: spelling variants (British/American), terminology, serial-comma usage, heading/list style, quote-mark style
- Paragraph construction (see below)

### Out of scope (flag, don't fix)

- Rewriting for voice, tone, or style preference
- Restructuring arguments, cutting content, or changing what the piece says
- Fact-checking or theological/substantive review

If something in scope shades into something out of scope (e.g., a paragraph's sentences are grammatically fine but rambles across three unrelated ideas), call it out in the report as a structural note and let the user decide. Don't fix it unless they ask.

## Paragraph construction

Mechanical correctness isn't the whole job. A paragraph can be grammatically flawless and still fail the reader. For each paragraph, check:

- **Unity:** Does it develop one idea? A paragraph that pivots to a second, unrelated point partway through is a candidate for splitting at the pivot.
- **Length and pacing:** Is it a wall of text that would benefit from a break, or a run of choppy one- and two-sentence paragraphs that could be combined? Neither long nor short is inherently wrong. Judge against how the piece reads elsewhere (a sermon or essay with intentionally punchy short paragraphs shouldn't be flagged for having short paragraphs).
- **Topic clarity:** Can a reader tell what the paragraph is about from its opening sentence, or does it take a few sentences to find its footing?
- **Transitions:** Does the paragraph connect to the one before and after, or does it land abruptly?

When recommending a split or merge, say exactly where (quote the sentence the split would fall before/after) and why. Paragraph splits are more judgment call than grammar rule, so hold them to the same "report first" bar as everything else.

## Workflow

1. **Read the target document in full** before evaluating anything. Errors and paragraph issues are often only visible in context (a pronoun's antecedent, a consistency check against earlier terminology, whether a paragraph's length is unusual for this piece).

2. **Produce a report, not edits.** Never touch the file in this step. Use this structure:

```markdown
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

Number every item. The user will reference these numbers to select which to apply. If a category has nothing to report, say so briefly rather than omitting the section.

3. **Ask before editing.** After the report, explicitly ask whether to apply the corrections, e.g. "Want me to apply these? You can say 'all', give me a list like '1, 3, 5-7', or 'none.'" Do not edit until the user responds.

4. **Apply only what's confirmed.** If the user says "all," apply every numbered fix. If they name a subset, apply only those. If they say no, stop; the report stands on its own. When applying paragraph splits/merges, make only the structural change requested. Don't also smooth wording unless that specific fix was also confirmed.

5. **Confirm what changed.** After editing, briefly summarize what was applied and what was left alone (declined items, or "notes" that were never fix candidates).

## Working with the document

### Local files

Read the actual file with the Read tool rather than asking the user to paste text when a file path is available. Apply confirmed edits with StrReplace or Write (for changes touching most of the file). Preserve the original formatting conventions (Markdown syntax, existing heading levels, etc.). Proofreading fixes formatting errors; it doesn't impose a new format.

### Google Docs

When the user provides a Google Docs or Google Drive URL (or asks to proofread a Drive document):

1. Read the document with the Google Drive `read_file_content` tool using the file ID from the URL.
2. Follow the same report-first workflow. Present findings in chat; do not edit the original in place.
3. After the user confirms which fixes to apply, create a **new** Google Doc titled `[Original Title] (proofread)` in the same parent folder as the source (use `get_file_metadata` for the folder ID, then `create_file` with `textContent` and the corrected full body).
4. Tell the user where the revised doc is and link to it. They can copy from the new doc into the original or use the revised doc directly.

The Drive integration cannot surgically edit an existing Google Doc's body. Creating a revised copy is the default apply path unless the user asks for find/replace blocks in chat only.

## Reminders

- Report first. Always.
- Fix mechanics and paragraph structure only when confirmed.
- Flag voice, argument, and substance issues; don't rewrite them.
- Number every finding so the user can cherry-pick.
