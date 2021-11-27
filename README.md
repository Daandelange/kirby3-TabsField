# Kirby tabsfield plugin

A tabs field for the panel, to use with $field->when() conditions.

Features:
 - Remembers the last open tab.
 - The field value is never saved in the content file.
 - The field value is available for usage with `when` conditions (javascript).
 - Tabs can have labels and icons.

![Screenshot of Kirby 3 plugins TabsField](tabsfield.gif)

## Requirements
This plugin requires Kirby 3.6 or later.

## Installation

### Download

Download and copy this repository to `/site/plugins/tabsfield`.

### Git submodule

```
git submodule add https://github.com/daandelange/kirby3-tabsfield.git site/plugins/tabsfield
```

<!-- Not available !
### Composer
composer require daandelange/tabsfield
-->

## Setup
Everything is scriptable trough blueprints.

1. Add one or multiple `tabs` fields to your fields sections, providing each of them with some `tabs`.  
*Note: As any kirby field, every tab field must have a unique key within your blueprint setup.
2. Add corresponding `when:` conditions to your [fields](https://getkirby.com/docs/guide/blueprints/fields#conditional-fields) and/or [sections](https://getkirby.com/docs/reference/panel/sections/pages#conditional-sections).

**Example:**
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

## Easteregg
This plugin also provides a javascript method for removing panel change notifications of a field by writing the changes to the originals object.
Used internally by this plugin to make the field value available for `when` conditions without triggering a change notification.

````js
this.$store.dispatch('content/ignorechanges', this.$attrs.name||'myfieldkey');
````

## Options
There are no options available yet. Would you like to contribute some ?

## Development
In order to re-use the KTabs component, you need to make some symlinks to kirby's panel src folder in the `src` folder :
````bash
# First ensure the plugin's path is myWebsite/site/plugins/tabsfield
# Ensure kirby's path is myWebsite/kirby
# Otherwise change the relative path according to your kirby setup.
cd site/plugins/tabsfield
ln -s ../../../../kirby/panel/src/ ./src/panel
#ln -s ../../../../kirby/panel/src/mixins ./src/mixins
#ln -s ../../../../kirby/panel/src/helpers ./src/helpers
````

- `npm install` : Install the required dependencies.
- `npm run dev` : Develop mode (listen/compile).
- `npm run build` : Compile for publishing.

## License

MIT - Free to use, free to improve !

However, for usage in commercial projects, please consider to improve the plugin a little and contribute back the changes with a PR, or hire someone to do so.

## Credits
In loving memory of the Kirby 2 alternative : [Kirby-Tabs-Field](https://github.com/afbora/Kirby-Tabs-Field) by @afbora.

Author: [Daan de Lange](https://getkirby.com/plugins/daandelange)
