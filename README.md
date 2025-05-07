# Kirby TabsField plugin

A tabs field for the panel, to use with `when` conditions in field and section blueprints.

Features:
 - Uses the native `k-tabs` panel component (slightly extended).
 - Remembers the last open tab (using the browser's local storage).
 - The field value is never saved in the content file (but present in the panel's form values).
 - The field value is available for usage with `when` conditions (javascript).
 - Tabs can have labels and icons.

 Note: _As of version 1.0.0, this plugin doesn't use `KirbyContentHackModule` anymore. Thanks to Kirby4 panel changes, the implementation is way cleaner now._

![Screenshot of Kirby plugin: TabsField](tabsfield.gif)

## Requirements

Please refer to the following Kirby version compatibility table.

| ------------- | ----------------------- |
| Kirby version | TabsField version |
| ------------- | ----------------------- |
| Kirby 3.6+    | TabsField 0.1.0-beta+   |
| Kirby 4.0+    | _Unsupported_           |
| Kirby 5.0+    | TabsField 1.0.0+        |
| ------------- | ----------------------- |

## Installation

- **Manually**: Download and copy this repository to `/site/plugins/tabsfield`.
- **Git submodule**: `git submodule add https://github.com/daandelange/kirby-tabsfield.git site/plugins/tabsfield`
- **Composer**: `composer require daandelange/tabsfield`

## Setup
Everything is scriptable trough blueprints.

1. Add one or multiple `tabs` field(s) to your fields sections, providing each of them with some `tabs`. [More information on native Kirby Tabs](https://getkirby.com/docs/guide/blueprints/layout#tabs).  
*Note: As any kirby field, every tab field must have a unique key within your blueprint setup.
2. Add corresponding `when:` conditions to your [fields](https://getkirby.com/docs/guide/blueprints/fields#conditional-fields) and/or [sections](https://getkirby.com/docs/reference/panel/sections/pages#conditional-sections).

**Example / Tutorial:**
````yml
sections:
  fields:
    type: fields
    sticky: true
    fields:
      sidebartab:
        type: tabs
        # Tabs must have a name and a both optional label and icon
        tabs: 
          - name: metainfo
            icon: tag
            label: Info
          - name: files
            icon: file
            label: Files
      categories:
        type: tags
        label: Categories
        # Shows this individual field when the metainfo tab is active
        when:
          sidebartab: metainfo
      author:
        type: users
        label: Author
        min: 1
        required: true
        # Shows this individual field when the metainfo tab is active
        when:
          sidebartab: metainfo
  files:
    type: files
    headline: File Manager
    # Shows this individual field when the files tab is active
    # (the same can be done with a files section)
    when:
      sidebartab: files
````

## Options

There are no options available yet. Would you like to contribute some ?

## Development

- `pnpm install` : Install the required dependencies.
- `pnpm run dev` : Develop mode (listen/compile).
- `pnpm run build` : Compile for publishing.

## License

MIT - Free to use, free to improve !

However, for usage in commercial projects, please consider to improve the plugin a little and contribute back the changes with a PR, or hire someone to do so.

## Credits
In loving memory of the Kirby 2 alternative : [Kirby-Tabs-Field](https://github.com/afbora/Kirby-Tabs-Field) by @afbora.

Author: [Daan de Lange](https://daandelange.com/)
