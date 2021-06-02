# Dexie JS vs. window.localStorage

* Status: Accpeted
* Deciders: Amanda, Pablo, Alec, Steven
* Date: 2021-06-02

## Context and Problem Statement

Back-end group needed to decide how notes are going to be stored while considering time constraint.

## Considered Options

* Dexie JS
* window localStorage

## Decision Outcome

Chosen option: Dexie JS

## Pros and Cons of the Options <!-- optional -->

### dexie JS

* Good, because there is a library of functions that will be useful for what we need
* Bad, because the team is not familiar with Dexie and it's gonna require a lot of time to learn

### window localStorage

* Good, because it mwould be easier to work with compared to Dexie
* Bad, images take up too much storage
