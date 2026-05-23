# Layout Composer Method

The layout composer translates the current slide plan into editable slide specifications.

## Supported production modes

1. `direct-clone-replace-text`
2. `clean-clone-remove-content-rebuild`
3. `hybrid-source-composition`
4. `creative-composition-from-primitives`

## Default behavior

The engine defaults to:

- `hybrid-source-composition`
- `creative-composition-from-primitives`

It does not default to direct clone.

## Composer responsibilities

- keep the slide self-contained
- preserve source-deck hierarchy
- use source-deck tokens and assets
- ban inherited irrelevant text
- describe elements clearly enough for runner generation
