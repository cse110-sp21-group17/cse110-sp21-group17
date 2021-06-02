# indexedDB vs. window.localStorage

* Status: Depricated
* Deciders: Amanda, Pablo, Jason
* Date: 2021-05-16

## Context and Problem Statement

Back-end group needed to decide how notes are going to be stored.

## Decision Drivers <!-- optional -->

* localStorage would be easier to work compared to indexedDB
* con: images take up too much storage (potential solution: user just adds a link to the image instead of uploading the image)

## Considered Options

* IndexedDB
* window localStorage

## Decision Outcome

Chosen option: window.localStorage

## Pros and Cons of the Options <!-- optional -->

### IndexedDB

* Good, because it's able to store strings, images, and audio
* Bad, because it can get complicated

### window localStorage

* Good, because it mwould be easier to work with compared to indexedDB
* Bad, images take up too much storage
