# 6. File Structure

* Date: 2021-02-13
* Status [Accepted]

## Context and Problem Statement

* Developers found that it is hard to find the section for their parts of implementation.
* Taking time to look through the code.
* Hard to navigate throughout the file.


* Putting all the functions and styles in the project main files and .


## Considered Options

* Still using styles.css, main.js for the project and have more detail documentation: 
  * [+] Less files inside the projects. 
  * [+] Easy to reach to the file.
  * [+] Able to see other developer's work in the same file.
  * [+] Able to navigate through keywords and documentation in the file.
  * [-] Too many functions inside the main JavaScript and CSS files. 
  * [-] May still increase the cost of maintaining the code and hinder the process of further implementation
  
* Separate styles and funcitons by the components.
  * [+] Avoid too many lines in single file.
  * [+] Easy categorization and more precise on the purpose of files.
  * [+] Developers can focus on their tasks without going over the code for the other components first. 
  * [-] Developer may not notice changes in other component files.
  * [-] May create too many files, since each component will have one file for style and one for funcitons.


## Decision Outcome

Chosen option: "Separate styles and funcitons by the components", because
* Developers can focus on their tasks and have more flexibility on testing the functionality of combining other components.
* Enhance the communication within team; other teammate can easy access to the corresponding components files.

## Consequences
We will still use index.html as the base to include all components files.
We will have two files for each of the components of our project; one css file for the styles, and one JavaScript file for functionality.
The components are header, timer, task, and main for all the modals.
