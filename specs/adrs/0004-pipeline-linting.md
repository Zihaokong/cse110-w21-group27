# 4. Pipeline Linting

* Date: 2021-02-06 
* Status [Accepted]

## Context and Problem Statement

* Decide which Linting tool to use.

## Considered Options

IDEs:
* [JSLint](https://jslint.com/) 
  * [+] Comes preconfigured / easy to set up
  * [-] Highly opinionated
  * [-] Does not work with Prettier
  
* [ESLint](https://eslint.org/)
  * [+] Very high configuration
  * [+] Works with Prettier
  * [+] More compatibility with VSCode
  * [-] Higher learning curve compared to JSLint
  * [-] Some configuration may seems confusing.
  
## Decision Outcome

Chosen option: "ESLint", because
* More configuration options to allow us to fine tune the linting to our needs.
* Much more compatible with VSCode than JSLint
* Works well with Pretteir, which is a useful styling tool.


## Consequences
By using ESLint/Prettier as a team, our code will be uniform in appearance, 
allowing for a much higher degree of readability. However, this means everyone 
in the group must install the appropriapte extensions on the VSCode and install
the packages locally. Additionally, because it is more configurable, we need,
to come toegether and formalize a useful way of styling and linting code.
