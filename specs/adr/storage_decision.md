# indexDB vs. window.localStorage


## Date
05/16/2021

## Status 
Accepted

## Context
Back-end group needed to decide how notes are going to be stored.

## Decision
window.localStorage

## Consequences
- localStorage would be easier to work compared to indexedDB
- con: images take up too much storage (potential solution: user just adds a link to the image instead of uploading the image)