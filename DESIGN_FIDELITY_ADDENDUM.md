# DESIGN_FIDELITY_ADDENDUM.md

## Main rule

We are not generating an approximately similar deck.

We are designing new Figma Design presentation slides that must repeat the existing Figma file’s visual solutions exactly or almost exactly.

Creativity is welcome only as an extension of existing rules and source patterns.

## Quality criterion

A new slide must look as if it was made by the same design team, in the same file, in the same system, for the same presentation.

## Mandatory reference matching

For each new slide, select existing Figma reference frame(s) before generating the slide.

Every pilot slide must specify:

- primaryReferenceFrameId
- secondaryReferenceFrameId when needed
- what is borrowed from each reference
- visual_fidelity_score from 1 to 5

Minimum acceptable pilot score: 4/5.

## Generation chain

Correct chain:

```txt
PPTX meaning
→ classify semantic role
→ select closest Figma source pattern
→ copy compositional logic
→ replace content
→ adjust only where content requires
→ preserve hierarchy
→ create editable Figma frame
```

Incorrect chain:

```txt
PPTX meaning
→ invent new layout
→ make it dark
→ add red glow
```

## Forbidden

- Generic PowerPoint.
- Generic AI deck.
- Random premium dark style.
- White consulting slides.
- Screenshots as slide backgrounds.
- New visual language.
- Unreferenced layouts.
- Uncontrolled creativity.
