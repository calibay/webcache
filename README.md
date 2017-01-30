## Synopsis

API for caching a website's HTML content.

## Motivation

Be able to cache a website's content and save to a database for use later.

## Installation

NPM and node required.

git clone https://github.com/calibay/webcache.git
npm install
node index.js

## API Reference

Submit a URL for caching either by using the interface or directly as a query parameter.
API will return a JSON object containing the data, id, and status.

POST example:
http://localhost:3004/api?url=www.google.com

Job ID get example:
http://localhost:3004/api?id=f32f3sf

Get all Jobs:
http://localhost:3004/api
