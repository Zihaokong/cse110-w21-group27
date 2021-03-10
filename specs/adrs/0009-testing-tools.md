# 9. Testing Tools

* Date: 2021-03-06 
* Status [Active]

## Context and Problem Statement

* Decide which testing tool to use for unit and end to end testing with high code coverage.

## Considered Options

Tools:
* [Jest](https://jestjs.io/) 
  * [+] Compatible for different tools and JavaScript libraries.
  * [+] Easy to setup
  * [+] Able to test each small part of the components and functions.
  * [+] Simulate the structure and test for functions directly manipulate with the DOM.
  * [-] Hard to mimick the user behaviors with different status of page.
  * [-] Multiple error messages for same error.
  
* [Cypress](https://www.cypress.io/)
  * [+] Wait for the web page to reach to the state before moving on the next test
  * [+] Easy to mimick the web page functionality as in runtime.
  * [+] Executes the vast majority of its commands inside the browser
  * [-] Hard to test each of the properties and attributes inside the components.
  * [-] Does not support multiple browsers

  
## Decision Outcome

Chosen option: [Jest] and [Cyprss]
* Using [Jest] for unit testing and [Cypress] for end to end (E2E) testing. 
* Jest is good for testing small part of the components and functions. 
* Cypress can simulate user behaviors with the web page functionality as in runtime.

## Consequences
Jest will be the unit testing tool which extensively testing the web components and Cypress will be the E2E testing tool for manipulate the user interactions.