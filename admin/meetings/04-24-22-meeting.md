# Team 8: Cre8tors Agenda and Meeting Minutes

## Details
**Meeting Type:** Sprint Planning

**Time/Date** 04/24/2022 4-5PM  

**Location:** [ZOOM](https://ucsd.zoom.us/j/7331475769)  

## Announcements Recap
* Roles for the most part are finalized (the only exception being Sohum, who is on the fence between testing and development.)
* Agreed to about an eight hour standard for working on the project for CSE 112.
* We agreed that we will be focused on refinemnet before focusing on taking on risky endeavours like the chrome extension.

## Agenda
1. **Continue Development of the Product.** Continue delving into our values for the product as a team, find a niche for the product, and develop a vision and roadmap for the app (Points of conversation taken from previous agenda meeting notes).  
    1. **Agree on our values**. Basically, we'll be deciding where our app should land on the **two axes** listed above.
    2. **Find a niche for the product.** Who would be using our app, and why?
        * We don't have to actually make a brilliant product that will attract venture capital, but we should have some sort of vision for who the product is serving, and why they would be using our app (avoid comparing our app to others' for the sake of this project). This is just so that we make consistent, reasoned design decisions rather than WAGing.
    3. **Develop a vision and roadmap for the app**. We have some non-negotiable work (testing, refactor, UI), but we can still decide on extra features, the overall direction and style of the app. These features will be based on the values and niche we decide to focus on.
2. **Chunk the roadmap**. Chunk up the roadmap in the reasonable sections for each sprint. Focus on the first sprint section and actualize the goals we want.

## Meeting Minutes/Notes
Meeting date: 4/24  
MM Taker: Chad

### In Attendance:
- [ ] Calvin Chen
- [x] Chad Wall
- [x] Dzhangir Bayandarov
- [ ] Fenghao Yang
- [ ] Jaime Izabal
- [ ] James Larsen
- [x] Kaiwen Tsou
- [ ] Lars Vlahakisa
- [ ] Sohum Modha
- [ ] Zhuoliang Pu

### Agenda Item Notes
#### Details
* Values: Flexible, tutorialized, noob friendly, ambient
* Constraints: Time, Risk Assessment, Treading new tech (Google Chrome Extension)
* Repo: https://github.com/cmwall0605/cse112-sp22-group8
* Sprint Length: 4/25/2022 - 5/2/2022

#### RoadMap Items for 1st Sprint:
* **Configure a new Repo (Est. 1 Person, 1 Week):**
    * Rebrand the repo to ours
    * Upload all our docs currently stored on slack
    * Setup a SCRUM board in Github Projects
* **CI/CD (Est. 2 People, 1 Week):**
    * You might be able to inherit the old GitHub Actions ruleset. 
    * Decide which platform to utilize(Firebase vs Netlify vs Heroku etc.) for Continuous Deployment
        * Research Firebase, Netlify, and Heroku
        * Possible points of research which talk about how to deploy from Github Actions to some deployment website:
            * [Firebase](https://medium.com/firebase-developers/the-comprehensive-guide-to-github-actions-and-firebase-hosting-818502d86c31)
            * [Netlify](https://marekpukaj.medium.com/build-with-github-actions-host-on-netlify-ebf5fa505616)
            * [Heroku](https://dev.to/heroku/deploying-to-heroku-from-github-actions-29ej)
        * Deploy repo to that site
    * Plan out the pipeline depending on the deployment platform by setting up barebone GitHub actions repo
        * Continuous Integration
        * Linting
        * Testing (Stats around week 6/7)
            * Unit Testing
            * E2E Testing (?)
        * Minification
        * Documentation Automation (?)
        * Continuous Deployment
    * Ensure that a minor push works through the pipeline
* **Chrome Extension Research (Est. 2 People, 3 weeks):**
    * Do some indepth research into chrome extensions and how to create them.
    * Create some exploratory code and deploy a hello-world example
        * Add functionality, change font etc.
    * After obtaining some intimacy with chrome extensions, weigh out the pros and cons of the system and determine if this is something that we should pursue
        * Consider values like useability and performance as well as constraints like skill and time. Consider the risk and determine if the benefits outweigh risk involved.
* **Tutorialization Design (Est. 3 People, 1 week):**
    * Flesh out tutorial steps, general app workflow
    * Mocking up what the tutorials are.
    * Set up a figma mock-up of the tutorials as they would be on the current website.
    * Consider the content, style, and intractability of the tutorial.
    * We came to the consensus that the tutorial should be an interactive guide which highlights important things to do in order to go through the pomodoro timer. However, this idea can be changed and modified as seen fit.
    * Optionally do some exploratory coding for setting up tutorials
    * The tutorial code shouldn't have much friction with the overall code base so working on early development while the codebase is renovated shouldn't be a major concern, though if it does, please note this down. If anything, the tutorial production would need to be delayed if we needed to wait on a finished rewrite of the code.
* **UI Redesign (Est. 3 People, 2 weeks):**
    * Create a Figma High Fidelity Design
    * Have an uncomplicated and straightforward layout of the website
    * Consider and document changes in colors, effects, (potentially) page navigation, and anything else that is changed in the process.
    * Consider both the desktop view as well as the mobile view.
    * Possible Considerations
    * Reconsider the steps needed to start the timer (perhaps starting the task automatically starts the timer).
    * Have a settings menu to make edits to things like time, volume
    * Possibly have a smooth transition from work timer to the break timer.
    * Add a way to review notes without having to edit/start the task.
    * Also consider how our other implementations will play with the UI created
    * Chrome Extensions
    * Tutorials
    * Come up with a Design Doc or pick a CSS framework (bootstrap, material UI etc.)
    * Consider from a design perspective if something like bootstrap would need to be used.
* **HTML/CSS Renovation (Est. 6 People, 2 for each page, 1 week):**
    * Each section needs to be re-written, possibly each section should be spearheaded by a different person.
        * Main Page (task list)
        * Stats Page
        * Timer Page
    * HTML needs to be semantic
        * Many of the elements are div tags with ids and classes could be easily replaced with tags, not only making the HTML more visually clear, but could provide bonus points to things like accessibility.
        * Keep in mind that just because we are renovating the HTML by applying semantic usage of element tags, does not mean that we should remove all the ids and class tags. Be conscious of if the ids/tags are necessary elsewhere (i.e. in the js code).
        * Additionally, keep in mind that div tags aren't inherently wrong to use, and in certain circumstances could be needed in the HTML.
        * The entire html does not need to be stripped out, most of it can simply have their tags modified and their id/class removed.
    * CSS needs to be clean and commented
        * Modifications to the CSS will need to be more methodical than the HTML
        * You may want to scrap all or almost all of the existing CSS and rewrite it from scratch
* **JS Refactoring (Est. 4 People, 2 for each system, 2 weeks):**
    * **Timer refactor-** It's an extremely long and critical feature so we need to make sure some people know how to fix it, and can make it more modular. 
        * Look into the timer.js and determine if it is salvageable
        * If it is, simply clean it up and set up variable time functionality.
            * The start function already allows for a dynamic time, it is simply a case of giving the user the ability to change the time.
        * Otherwise look into a timer tutorial which allows the timer to stay consistent in terms of not slowing down when out of focus.
            * Be sure to document the tutorial you end up using if you do decide to clean the slate.
        * More than likely whoever is working on the timer code should work with the HTML/CSS team on their changes with the timer.html and timer.css
    * **Task list refactor-** Another javascript function that can be looked into to determine if it is usable
        * Same ordeal as the time refactoring, check to see if it is salvageable. If it is, refine it, else, start from scratch.
        * More than likely whoever is working on the tasklist code should work with the HTML/CSS team on their changes with the main page

#### Work Spread
* **Fenghao Yang - Dev**
    * HTML/CSS Renovation
        * Main Page
    * JS Refactoring
        * Task System
* **Calvin Chen - Dev**
    * HTML/CSS Renovation
        * Main Page
    * JS Refactoring
        * Task System
* **Lars Vlahakis - Dev**
    * HTML/CSS Renovation
        * Timer Page
    * JS Refactoring
        * Timer System
* **Zhuoliang Pu - Dev**
    * HTML/CSS Renovation
        * Timer Page
    * JS Refactoring
        * Timer System
* **Sohum Modha - Dev**
    * HTML/CSS Renovation
        * Stats Page
    * CI/CD
* **Jaime Izabal - Dev**
    * HTML/CSS Renovation
        * Stats Page
    * Chrome Extension Research
* **Kaiwen Tsou - Planner**
    * Tutorialization **(Spearhead)**
    * UI Redesign
* **James Larsen - Designer**
    * UI Redesign **(Spearhead)**
    * HTML/CSS Renovation 
        * Make sure changes to the HTML and CSS adhere to the designs and additionally that they mesh well with the UI changes
    * Tutorialization
    * Design Aspect
* **Chad Wall - Lead**
    * Manage renovations to the codebase and the repo
        * CI/CD **(Spearhead)**
        * HTML/CSS Renovation
        * Tutorialization
        * Configure the New Repo
* **Dzhangir Bayandarov - Lead**
    * Manage new implementations via research, design, and exploratory coding
        * Chrome Extension Research **(Spearhead)**
        * JS Refactoring
        * UI Redesign

**NOTE:** Spearhead is a person who has a clear vision of what their implementation ought to become  and can communicate what should be done to achieve that goal.

**NOTE:** Focused on fleshing out specs in the goals and then assigning people into teams to fulfill these goals. That way, sub-teams can naturally divide up the tasks amongst their members.

