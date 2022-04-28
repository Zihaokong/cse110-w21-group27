# 7. Styles

* Date: 2021-02-13
* Status [Active]

## Context and Problem Statement

* Need to implement the design as soon as possible for further development.
* Finalize the position and strictly follow the design may hinder the development process and increase the load in communication.
* Not all developer has sufficient experience in front-end development using plain CSS, and Vanilla.JS.

## Considered Options

* Keep using plain CSS
  * [+] Can be use across different components and projects
  * [+] Can enhance the knowledge and experience in CSS
  * [-] Time cost for all of the developer to be familiar with CSS
  * [-] Forcing to use CSS for implementing the whole design may take longer than expectation.
  
* [Bootstrap](https://getbootstrap.com/)
  * [+] Easy implementation by adding the preset to the classname. 
  * [+] Still require some knowledge in CSS to make adjustment.
  * [+] Lower the stress on implementing the design.
  * [-] Need to spend some time to be familiar with the bootstrap library.
  * [-] The preset may not always work in our design and implementation.
  
## Decision Outcome

Chosen option: [Bootstrap] because
* Bootstrap help to implement the design faster without building every sub-components from scratch.
* The framework is customizable and allow developer to adjust the preset into our design.
* It does not require to be downloaded; this can be done by including the CDN in the index.html


## Consequences
We will use Bootstrap to enhance the development process of implementing the design. We still create a css file for each components to make adjustment to make the implementation close the our design.
