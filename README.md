# CSE 112 SPRING 2022 TEAM 8 (AKA Team Cre8tors)
## README (WORK IN PROGRESS...)

<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![CodeFactor][codefactor-shield]][codefactor-url]
[![Firebase][firebase-shield]][firebase-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://pomodoro-timer-c1a2a.web.app/">
    <img src="/admin/misc/CSE112-Team-8-Cre8tors-Logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Cre8tors</h3>

  <p align="center">
    <a href="https://github.com/cmwall0605/cse112-sp22-group8/tree/main/specs"><strong>Explore the specs»</strong></a>
    <br />
    <br />
    <a href="https://pomodoro-timer-c1a2a.web.app/">View Demo</a>
    ·
    <a href="https://github.com/cmwall0605/cse112-sp22-group8/issues">Report Bug</a>
    ·
    <a href="https://github.com/cmwall0605/cse112-sp22-group8/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Pomodoro is a productivity technique where inidividuals work for 25 minutes at a time and take 5 minute breaks in between. They take a longer break every 4 sessions. Our app takes this technique and adds a task manager that allows users to focus and keep track of their tasks. Furthermore, our app does not include a pause button to give users unrestricted focus. 

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With
* [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  * [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started As a Developer

_Below are steps of how you can install and set up the web app locally as the developer._

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/cmwall0605/cse112-sp22-group8.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up ESLint and Husky Autocommit
   ```sh
   npm run setup
   ```
   If on Windows
   ```sh
   npm run setup-windows
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## User Flow

Demonstrated Workflow: 

1. On the landing page, we are introducted to the timer.
2. The timer switches between work mode (25 minutes) and break mode (5 minutes), with every 4th break being thrice as long as the usual break (15 minutes).
3. Starting the timer without a task, the user is prompted to either choose a task they created in the past, or create one now. The user can optionally opt out of making a task and run the timer without logging the session in a task.
4. Starting the timer, the user must then begin the task they decided to commit to.
5. The user, if distracted, can use the distraction button to quickly note that they were distracted at this point.
6. Additionally, the user can fail the session if they find themselves not being able to work on the task at a consistent rate.
7. At the end of a work session, it then prompts the user to begin the their break.
8. During this break, the user is free to do whatever they want so long as it is not the task at hand.
9. After the break, the user can either continue their task, or they can change their task. Changing their task leads them to the tasks list page.
10. The task list page is where tasks will typically be created, shown, updated, and deleted (though they can also be created on the timer page).
11. To create a task, the user can use the form underneath the todo list title, giving a title of the task and the amount of work sessions it would take to complete the task.
12. To edit a task, the user can click the pencil icon which will pop down an edit form.
13. To play a task, the user can click the play icon which will redirect them to the timer page with the task they chose selected and ready to start.
14. To delete a task, the user can click the trash icon which will ask them to confirm their decision.
15. The user can additionally move their tasks around the list to suit their own needs (possibly to show a hieracrchy of importance, but that is up to the user).
16. The timer's settings can be modified in the settings menu on the top right, indicated by the cog.
17. Here you can set the time of each type of session,
18. Change the volume,
19. Or enable auto timer
17. The stats of the user is logged and visible to the user on the stats page.
18. On the stats page there are three sets of info displayed across three different sets of time ranges.
19. The three sets of info displayed are completed pomos, average distractions per pomo, and pomo completion rate.
20. The three time ranges are today, the past 7 days, and the past 30 days. 

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

Logistics
  - [x] Repo evaluations
  - [x] User flow diagrams, codebase diagrams, design diagrams

Major refactoring 
  - [x] Restructure the Repo
  - [x] Migrate to Web Components
    - [x] Task List
    - [x] Items in Timer Page
  - [x] Color Style Adjustments - refactor
  - [x] Accessibility Style Adjustments
  - [x] Icon for Stats Page
  - [x] Notes Button Added to Timer Page
  - [x] Make edit button a non-modal form
  - [x] Modals use < dialogue > elements
  - [x] Fractional Progress Bar
  - [x] Grey out edit/delete/play task buttons
  - [x] Make timer the landing page
  - [x] Stats page
  - [x] Timer Page
  - [x] Task Page
  - [x] Change Unit Test Workflow Info
  - [x] Removing Bootstraps
  - [x] Change Delete Modal to Confirm Button
  - [x] Button Styling
  - [x] Custom Color Properties, Global CSS File
  - [x] Restructure CSS Files
  - [x] Adjust Settings Menu Style
  - [x] Header Icons as words
  - [x] Implement main.css file
  - [ ] Circles for Pomodoro count
  - [ ] Adapt Readme

Features
  - [x] Dynamic Timer
  - [x] Change Tasks via Timer Page
  - [x] To-Do list integrated into timer page
  - [x] Add Timer Continuance
  - [x] Settings Menu
  - [x] Add Pop-ups for CSS/JS not enabled
  - [x] Incorporate Emotes
  - [x] Stats Items into Web Components
  - [x] Replace Date with Icon
  - [x] Remove the date - minor design choice
  - [x] Mascot for website
  - [x] Polish UI
  - [ ] Confirmation Modal for Reset Stats
  - [ ] Analytics Planning and Collection
  - [ ] Database Analytics
  - [ ] Implement Noob System
  - [ ] Update CICD Wiki Page
  - [ ] Fix up Website for Increased LightHouse Report Marks

CI/CD Pipeline
  - [x] Create Personal Access Token

Testing  
- [ ] 90% Coverage for Unit Tests
- [ ] Unit Tests for timer and stats pages web components
- [ ] Jest and Cypress tests

See the [open issues](https://github.com/cmwall0605/cse112-sp22-group8/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING 
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

-->

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact
Chad Wall: cmwall@ucsd.edu  
Sohum Modha: smodha@ucsd.edu

Project Link: [https://github.com/cmwall0605/cse112-sp22-group8](https://github.com/cmwall0605/cse112-sp22-group8)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [UCSD CSE Department](https://cse.ucsd.edu)
* [Professor Powell](https://classes.pint.com)
* [Purrwitch (Tomo Mascot Artist)](https://purrwitch.com/)
<!--
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search) -->

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/cmwall0605/cse112-sp22-group8?style=for-the-badge
[contributors-url]: https://github.com/cmwall0605/cse112-sp22-group8/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues-closed/cmwall0605/cse112-sp22-group8?style=for-the-badge
[issues-url]: https://github.com/cmwall0605/cse112-sp22-group8/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[firebase-shield]: https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase
[firebase-url]: https://firebase.google.com/
[product-screenshot]: images/screenshot.png
[codefactor-shield]: https://img.shields.io/codefactor/grade/github/cmwall0605/cse112-sp22-group8?style=for-the-badge
[codefactor-url]: https://www.codefactor.io/repository/github/cmwall0605/cse112-sp22-group8
