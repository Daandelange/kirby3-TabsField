<?php

Kirby::plugin(
    // Kirby plugin info (visible in panel)
    name: 'daandelange/tabsfield',
    info: [
        'license' => 'MIT'
    ],
    version: '1.0.0',
    extends: [

    'fields' => [
        // A tab field, so sections can be tabbed too
        'tabs' => [
            'props' => [
                //'value' => null, // Null values are not saved in content folder, seemingly

                // Optional settings
                'disabled' => true, // prevents saving ?
                'translate' => false,
                'saveable'  => false,
                'novalidate' => true,
                'value' => function ($data = null) {
                    return null;
                },
            ],
            'saveable'  => false, // sets to false in php, vuejs then switches to the extended field state on refresh
            'options' => [
                'save'  => false, // disables saving the value ?
            ],
            'computed' => [

            ],
            //'save' => false, // Truely disables saving :) BUT makes UI untrickable too (change originals to fool the change detector) :(
            'save' => function ($value) { // Disables saving only in php
                return null;
            },
            'value' => function(bool $default = false){ // If value is null, not saved
                if ($this->isSaveable() === false) {
                    return null;
                }

                if ($default === true && $this->isEmpty() === true) {
                    return $this->default();
                }

                return $this->value;
            },
            'isSaveable' => function() {
                return false;
            },
            'isRequired' => function() {
                return false;
            },
            'isValid'   => function(){
                return false;
            },
            'isDisabled' => function(){ // prevents saving ?
                return true;
            },
            'translate' => function(){
                return false;
            },
            'store' => function($value){ // Converts a value to a storeable value
                return null; // Null values are not saved
            },
        ],
    ],
    ]// end extends array
);
