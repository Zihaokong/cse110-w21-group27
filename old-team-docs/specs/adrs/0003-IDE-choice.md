# 3. IDE in Development

* Date: 2021-01-30 
* Status [Accepted]

## Context and Problem Statement

* Decide which IDE we are going to use for the project and testing the behaviors.

## Considered Options

IDEs:
* [Atom](https://atom.io/) 
  * [+] Free and open source.
  * [+] Simple interfaces and very similar to text editor.
  * [+] Allow users to add extension and packages.
  * [-] Does not support team collaborations.
  * [-] Does not have built-in command line.
  * [-] Not very friendly on visualization when working GitHub.
  * [-] Hard for testing features.
  
* [VSCode](https://code.visualstudio.com/)
  * [+] Allow team collaborations through extension.
  * [+] Having functionality on run and debug, built-in Git.
  * [+] Built-in command line that is easy for working with GitHub like cloning, add, commit, push.
  * [-] Require some time to be familiar with the environment.
  * [-] Some configuration may seems confusing.
  
  
## Decision Outcome

Chosen option: "VSCode", because
* Recommended in the Lab assignment. 
* Having extension "Live Server" which serve our project propuse on web application.
* Every team member are familiar with the VSCode environment while working in the lab assignemnt.
* The built-in terminal benefits development teams' practices. 


## Consequences
We will use VSCode as our main IDE for the project because it eliminates any other compatibility along working with different IDEs. 
Every team members are expected to have VSCode installed with "Live Server" extension.
