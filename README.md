# Carbon.Code2Chart

Convert JavaScript code snippets into visual flowcharts directly inside Neos.

This package provides a Neos content element that lets editors enter code in the inspector and renders a flowchart on the frontend. Optional syntax highlighting for the source code is included.

## Features

- Neos content element for code-to-flowchart rendering
- Uses js2flowchart for SVG flowchart generation
- Optional JavaScript syntax highlighting with highlight.js
- Configurable diagram root label
- Configurable max name length for flowchart nodes
- Optional source-code visibility
- Backend notifications for missing or invalid code

## Requirements

- Neos: `^8.4 || ^9.0`
- PHP package dependencies:
    - `carbon/notification` (`^2.4 || ^3.0`)
    - `carbon/fileloader` (`^0.1`)
- Frontend runtime dependencies:
    - `highlight.js` (`^11.11.1`)
    - `js2flowchart` (`^1.3.5`)
- Frontend toolchain:
    - `pnpm` `11.6.0`
    - `eslint` `^10.5.0`
    - `stylelint` `^17.13.0`
    - `postcss` `^8.5.15`
    - `cssnano` `^8.0.2`
    - `esbuild` `^0.28.1`

## Installation

Install the package in your Neos distribution (for example via Composer path repository or VCS workflow):

```bash
composer require carbon/code2chart
```

Then install frontend dependencies in this package and build assets:

```bash
pnpm install
pnpm build
```

## Usage In Neos

After installation, add the content element in the Neos backend:

- Node type: `Carbon.Code2Chart:Content.Item`

Inspector properties:

- `label`: Custom root label for the flowchart (fallback is `Program`)
- `maxNameLength`: Maximum text length for rendered node names
- `showCode`: Toggle whether source code is shown
- `code`: JavaScript source code to visualize

Item props (Fusion):

- `label`: Read from node property `label`; falls back to node property `title`
- `code`: Read from node property `code`
- `showCode`: Read from node property `showCode`
- `maxNameLength`: Read from node property `maxNameLength`
- `includeJS`: Whether to load `Main.js` via Carbon.FileLoader (default: `true`)
- `includeCSS`: Whether to load `Main.css` via Carbon.FileLoader (default: `true`)

The package auto-includes its Fusion and translation configuration.

## Frontend Build And Development

Available scripts:

```bash
pnpm lint
pnpm css
pnpm js
pnpm build
pnpm start
```

What they do:

- `lint`: Runs ESLint for JS and Stylelint for PostCSS
- `css`: Compiles `Resources/Private/Fusion/Main.pcss` to `Resources/Public/Main.css`
- `js`: Bundles `Resources/Private/Fusion/Main.js` to `Resources/Public/Main.js`
- `build`: Runs CSS and JS builds
- `start`: Alias for `build`

## Project Structure

- `Configuration/NodeTypes.Content.yaml`: Public content node type
- `Configuration/NodeTypes.Mixin.Item.yaml`: Inspector properties and UI config
- `Resources/Private/Fusion/Integration/Item.fusion`: Node integration
- `Resources/Private/Fusion/Presentation/FlowChart.fusion`: Render component
- `Resources/Private/Fusion/Main.js`: Flowchart + highlight runtime logic
- `Resources/Private/Fusion/Main.pcss`: Styling source
- `Resources/Public/Main.js`: Built JavaScript asset
- `Resources/Public/Main.css`: Built CSS asset

## License

GPL-3.0
