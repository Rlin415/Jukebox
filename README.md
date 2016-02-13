# Jukebox
A web application that allows users to search for songs according to their favorite genre.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)

## Usage

Application has not yet been deployed. To use, you must clone down the repository and obtain a key from SoundCloud. After you've
successfully done that, replace the fake key inside the client/config/config.js file with your registered key. 

### Website

This application uses React, Babel, Browserify, and Twitter bootstrap for a responsive design.

## Requirements

- React 0.14.3
- Babelify 7.2.0
- Babel-Preset-React 6.3.13
- Browserify 12.0.1
- jQuery 2.1.4
- Bootstrap 3.3.6
- SoundCloud API key

## Development

### Installing Dependencies

From within the root directory:

`npm install`

From within the client directory:

`bower install`

### Compiling JSX to JavaScript and bundling it up

Run this in your CLI inside your client directory:

`browserify -t [ babelify --presets [react] ] views/app.js -o bundle.js`
