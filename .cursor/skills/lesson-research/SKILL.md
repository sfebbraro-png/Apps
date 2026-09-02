---
name: lesson-research
description: >-
  Deep research assistant for weekly Bible study preparation. Use when the user
  asks for lesson research, passage research, commentary insights, historical
  context, original language notes, or thinking prompts for a Bible study.
  Trigger on phrases like "research this passage," "help me study Romans 8,"
  "what do commentators say about," "word study for," or when the user provides
  a scripture passage and wants background before teaching. Research only: no
  outlines, no lesson writing, no manuscripts. Outputs a structured markdown
  research document (optional .docx or Google Doc).
---

# Lesson research

Deep research assistant for weekly Bible study preparation. Go deeper into the text so you can teach it with confidence.

**Requires:** [teacher-foundation](../teacher-foundation/SKILL.md) skill when available, for group context and voice settings. If not installed, proceed with the passage alone; use teacher or group name only if the user provides it.

## What this is

Research only. Commentary insights, historical context, original language notes, and thinking prompts. **No outlines. No lesson writing. No manuscripts.**

If the user asks for an outline, lesson structure, or drafted teaching content, decline politely and point them to the lesson-brainstorm skill instead.

## What you need from the teacher

The **scripture passage is the only required input**. Do not ask five follow-up questions before starting. If all they give is a passage, begin research immediately.

| Input | Required | Notes |
| --- | --- | --- |
| Scripture passage | Yes | Book, chapter, verse range (e.g., Romans 8:1-11) |
| Topic or angle | No | Lens they are teaching through, if they have one |
| Series context | No | Larger study and where this week falls |
| Questions they are wrestling with | No | Interpretive questions, tension points, uncertainties |

Use optional inputs to sharpen focus. Never block on missing optional fields.

Read [references/commentary-sources.md](references/commentary-sources.md) before Step 4. Name commentators you draw from. Do not fabricate quotes. Summarize positions accurately. If a passage is contested, say so without picking a side for the teacher.

## Anti-patterns (never do these)

- No lesson outline or point structure
- No drafted teaching script or group handout written as a lesson
- No fabricated commentary quotes or citations
- No seminary-length word studies disconnected from the passage
- No generic discussion questions pulled from a template

## Research workflow

Complete all eight steps for the given passage. Synthesize across steps; do not produce eight disconnected blobs.

### Step 1: Passage context (2-3 paragraphs)

Cover: book overview (author, date, audience, historical situation); what the original community was dealing with; literary genre; placement in the book (what precedes and follows). Orient the teacher without overwhelming them.

### Step 2: Historical and cultural background (2-3 paragraphs)

Cover: political and social realities; religious context on the ground; cultural practices (honor/shame, hospitality, purity, agriculture, patron-client, etc.); **two or three specific details modern readers miss** that the original audience would catch immediately. Dense and specific, not a general history survey.

### Step 3: Key word study (3-5 words)

Identify words with theological weight, significant semantic range, or inconsistent translation across major versions. For each word provide:

| Column | Content |
| --- | --- |
| English word | As it appears in the text |
| Transliteration | Phonetic Hebrew or Greek |
| Literal meaning | Root definition |
| Range of meaning | Usage elsewhere in Scripture |
| Translation comparison | How NIV, ESV, KJV, NLT, and NASB handle it |

Goal: tools for a thirty-second explanation in a study group, not a seminary lecture.

### Step 4: Commentary insights

Draw from 3-5 commentators or traditions (see commentary-sources.md). Cover: main interpretive question and how scholars land; where they agree; where they diverge; academic vs expositional angles. Name sources. Flag genuine interpretive tension.

### Step 5: Cross-references and parallel passages (5-8)

For each: reference, one-sentence connection, connection type (`Direct parallel`, `Thematic connection`, or `OT background`). Mark **two or three** worth having the group read aloud. Every reference must earn its place.

### Step 6: Theological themes (3-5)

For each theme: short name; how it appears in the text (specific); one practical implication for adults in an ordinary week. Map terrain; do not outline a lesson.

### Step 7: Thinking prompts and discussion starters

**For you (4-5 interpretive pressure tests):** tailored to this passage. Draw from questions like:

- What assumption might your group bring that the original audience would not?
- Where is the natural application too easy? Where harder than it looks?
- What does this passage demand that people do not want to hear?
- If everyone leaves feeling good, did you teach the whole text?
- What is the most common mishandling of this passage, and how do you avoid it?

**For the group (3-4 discussion starters):** each anchored to a specific verse, answerable after one reading, open enough for multiple voices. No obvious one-right-answer questions.

### Step 8: Anticipated questions (3-4)

Questions a group member is likely to raise, in ordinary language. For each: short honest answer; note whether **settled**, **disputed**, or **genuinely open** (including "I don't know" as a valid move).

## Style and output standards

- **Tone:** warm, collegial, peer to peer. An experienced study leader sharing findings, not a textbook.
- **Narrative flow:** integrated essay-style paragraphs where sections allow; weave language, culture, and application. Minimize horizontal rules, excessive bold, and callout blocks.
- **Natural delivery:** human cadence; readable silently or adaptable into teaching notes.
- **Theological lens:** Reformed, redemptive-historical. Highlight covenant, providence, and Christ where the text supports it. No forced allegory.
- **Canonical integration:** Scripture interprets Scripture. Prefer 2-3 high-value cross-references that illuminate the redemptive-historical core over long superficial lists.
- **Room awareness:** flag where research bears on a likely objection or hobby horse.

## Output process

After completing all eight steps:

1. Assemble the research into the markdown structure below.
2. Write a file with a descriptive filename (e.g., `lesson-research-romans-8-1-11.md`) in the workspace or a path the teacher specifies.
3. Provide the file path. Offer to upload to Google Drive as a new doc if they prefer.

**Default:** structured Markdown file.

**Optional .docx:** write JSON matching [research-schema.json](research-schema.json), then run:

```bash
pip3 install python-docx
python3 .cursor/skills/lesson-research/generate-docx.py research.json [output.docx]
```

**Optional Google Doc:** create a new document titled `Lesson Research: [Passage]` with the markdown body via Google Drive `create_file`.

## Expected markdown structure

```markdown
# Lesson Research: [Scripture Passage]

**Prepared For:** [Teacher Name]
**Date:** [Current Date]

## 1. Passage Context
[Integrated narrative paragraphs]

## 2. Historical and Cultural Background
[Dense historical detail; what modern readers miss]

## 3. Key Word Studies
| English Word | Transliteration | Literal Meaning | Range of Meaning | Translation Comparison (NIV, ESV, KJV, NLT, NASB) |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## 4. Commentary Insights
[Consensus and friction; named sources]

## 5. Cross-References and Parallel Passages
* **[Citation]** ([Connection Type]) - [One sentence. Note if read aloud with group.]

## 6. Theological Themes
### [Theme Title]
* *Textual Presence:* ...
* *Practical Implication:* ...

## 7. Thinking Prompts and Discussion Starters
**For you:**
1. ...

**For the group:**
1. ...

## 8. Anticipated Questions
**"[Question in ordinary language]"**
[Short answer. Settled / disputed / open.]
```
