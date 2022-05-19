# 8. VanillaJS

* Date: 2021-02-23
* Status [Active]

## Context and Problem Statement

* Some of the components of the task-item is using JQuery which is for the dropdown menu in Bootstrap. There is no other components is using external JS libraries other than VanillaJS. Need to decide using plain JavaScript (VanillaJS) or keep using the JQuery for one component.

## Considered Options

* Keep using plain JavaScript VanillaJS
  * [+] Can be use across different components of the project.
  * [+] The code of components can be reused for other project.
  * [+] Enhance the knowledge in JavaScript which can apply to working with different framework 
  * [-] Need to re-create the functionality of the components in VanillaJS
  * [-] May increase the development cost.
  
* [Bootstrap](https://getbootstrap.com/)
  * [+] Easy implementation for predefined Bootstrap components.
  * [+] Faster the development process and move on to the other components.
  * [-] The exteral JS libraries for bootstrap components may lower the page performance.
  * [-] Using external JS libraries for only one or two components is not a good practices.
  * [-] Hidden cost which may cause unexpected behavior in testing.
  
## Decision Outcome

Chosen option: [VanillaJS] because
* Keeping consistance for no exterial JS libraries like JQuery for the whole project.
* Enhance the developers familities and knowledge in plain JavaScript.


## Consequences
We will use VanillaJS across the project. We will split the functionalities from the dropdown menu by 2 buttons. It can keep up with the developement process and lower the time cost.