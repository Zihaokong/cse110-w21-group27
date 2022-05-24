# Sprint 1 Redux (Sprint 1.5)
## Details
* **Sprint Length:** 5/2/2022 - 5/16/2022 (Extra time to focus on midterm)
## Why We Are Revising Sprint 1
After having a good talk with Kaiwen I(Chad) feel that the current structure of the team might not be working as well as Dzhangir and I envisioned. There will be an overhaul on the dynamics, and there should be a post by 11:00AM tomorrow on how we'll be planning things out.
## Changes to how Sprint Goals will be
There's going to be revisions in how we set up the team dynamics from now on. There will no longer be vague tasks of what needs to be done more so tangible goals of what needs to be accomplished. Additionally, we will also be making it so that each person only has one job to do so that you can focus on that one specific task.
## TASK TEAMS
* Task 1 - Removing Bootstrap from the Website - Calvin & Fenghao & Jaime
  * This decision is being made after deliberating on the value of bootstrap in our project. The pros were that it allowed for a easier way to set up styling. The cons were that it was another dependency that needed to be taken care of, and additionally, its usage seemed to allow for a neglect of the HTML and CSS semantics. Additionally, the scope of our project is too small for bootstrap to actually be useful so we will be stripping it out.
  * The main goal of this team is to rip out bootstrap while still maintaining the old look of the website. This will not be as simple as removing the dependencies. This will involve fixing the HTML, styling, and even possibly JS to accommodate for styling being messed up as a result of stripping out bootstrap.
  * I would recommend starting with the stats page, then the task list page, and then finally the timer page since the stats page is the most simplistic, followed by the tasks page, and finally the timer page.
  * Another issue that could occur is wondering what exactly the style guidelines are for the project. For JS, this will be styled using the ESLint and Prettier from the previous project using the Airbnb styling. This should be automated if you use the linting and style documentation from the old project https://github.com/Zihaokong/cse110-w21-group27/wiki/Pipeline-Documentation#lintingstyling-documentation but a more in-depth style guide can be found here https://airbnb.io/javascript/. In terms of HTML and CSS, that's where it gets a bit more vague. For our purposes, we should use the google style guidelines: https://google.github.io/styleguide/htmlcssguide.html This decision comes from the fact that there are not many style guidelines which include both HTML and CSS together, so a guideline built with both in mind would serve as a better source of code styling.
  * James additionally posted some refactoring issues which could serve as a good place to start in terms of getting acquainted with the code. Additionally, this could be a good set of stretch goals to achieve if things go by fast.
* Task 2 - Create a dynamic timer - Lars & Zhuoliang
  * The main goal of this team would be to create a modular timer in the timer page where the timer can run based on a user given time input. It doesn't need to look nice so long as the functionality is there. The final product of this goal would most likely involve some user input which allows for the timer to change, both mechanically (as in the timer running in the background runs for the given amount of time) as well as stylistically (the numbers on the website's tab, the numbers on the page, and the wheel are in sync with the background timer). The stylistic changes seemed to already be baked into the process once the timer starts, but its just a matter of having the style change before the timer starts.
  * You might run into question or issues on styling for JS/HTML/CSS in which case I would recommend looking into the the final point of team 1 where it goes into detail on the styling guidelines we will be adopting. In short, use Airbnb for Javascript and Google for HTML/CSS
  * If this completed in a reasonable time, another goal would be to set up dynamic times for the three phases, Session, Short Break, and Long Break
* Task 3 - CI/CD team (deployment) - Dzhangir & Sohum
  * The main goal of this team this sprint is to set up the old CI pipeline on the project and to set up a basic CD for deployment to a firebase server
  * In terms of the CI, the main focus is to simply import the old rules from the old pipeline.
* Task 4 - Designing and planning future features - Kaiwen & James
  * The main goal of this team is to extract the necessary functions from the design board into tangible goals and then set up mock diagrams of what the end goal of these tasks would be.
  * When dealing with the designs, be sure to fully consider the values we have (simplicity, organization, UCD, and transparency) and how they are inherited into the design. In other words, the end products should be designed to be simple, organized, and transparent about what they do.
  * When setting up the goals in a timeline be aware of what needs to be done beforehand before starting as well as how long it would take to finish this goal. Both of these will definitely affect where in the timeline it is placed as well as how long the estimation is.

## FUTURE CONSIDERATIONS
* These are not goals associated with our current teams more so considerations that should be kept in the back of the mind while working:
* Testing
  * Testing will more than likely begin after the pipeline is implemented, in which case, be prepared with feature goals that you have for your task so that when testing begins, you can articulate these points to whoever becomes the tester
* Analytics
  * More so a consideration for Design and CI/CD, this will eventually be something we begin work on. We still need to plan out what questions we want answered by analytics which will reveal the data we need to collect.

## TEAM MEET UPS
For a more efficient sprint planning, we will be having individual sprint planning meetings on Mondays. This will be a meeting with the team leads and the member to go over what their plans are for this wee and references to where they can get more info/help on their goals. This would be the perfect time to bring up any issues or concerns you have with your task or the project as a whole. These meetings are currently being planned out, but they shouldn't take more than 10 minutes. Probably a timeframe of 5-15 minutes of planning and meetups.

## CHANNELS
I will be archiving the old channels and pushing new channels for discussion on the current tasks.

## GITHUB
Once you get started, be sure to set up issues which pertain to your current goals.