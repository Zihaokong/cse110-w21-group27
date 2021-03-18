
# Onboarding

## Joining our Team - Values and Code of Conduct
To join our team, new members must first review our team contract. The contract lists important details about our team, including our primary means of communication, when and how meetings are scheduled, and a list of our core conduct and values. These values include academic integrity, teamwork, enjoyment, and respect. Our values are also explained in the team Wiki. Note that the details of communication and meeting scheduling are subject to change. However, our core values and conduct will remain unless all members agree to a change. New members must review the contract. Then, they must sign and date it. The signature represents an agreement to folowing the rules for meetings and communication, and, more importantly, upholding the values listed in the contract. After having their signature approved and their signed contract added to the repo, they are officially a part of the team.
## Contributing to the Project
To contribute to the project, a member must follow a series of steps.
### Setup
1. They must first communicate to the team the general idea for either a new feature, refactoring, or a bug fix. If the idea is a feature that requires additional design, the designers must first create a high-fidelity design using Figma which must then be approved by all members of the team.
2. Then, the member should create an issue following the template for their specific change: the feature template for a new feature, the big fix template for a bug fix, and the refactoring template for refactoring the code. Then, their filled out issue should be approved by either a team lead or another member of the development team. At this point, the member should also decide if they will collaborate with other devs.
3. Next, the member should add the appropriate labels to the issue. There are multiple different labels that can be added and each has a description detailing its purpose. However, the only label that is required for every task is the difficulty. The three difficulties are simple, intermediate, and difficult. Each has a description based on the time-effort for a typical dev on the team along with a points rating out of ten. For example, currently, the difficult label corresponds to 7-10 points and 2+ days of effort. The exact time number is left intentionally vague as it can vary according to the ability of the dev.
### Starting the Code - Branching, Architecture, and Commits
4.  Before any coding is done, the new member should create a new branch from main. Each branch should correspond to a maximum of three issues. The branch does not have a strict naming convention, but should have a descriptive name corresponding to the issues it is addressing.
5.  To get a better sense of the current code structure and architecture, it's important to review the system diagrams under specs. Specifically, the development diagrams folder details the structure of different parts of the application and how they work. For example, shown below is our diagram for the taskList describing its functions and how it interacts with local storage and other components. There are similar diagrams for the task items, stats page, time, etc.
  ![image](https://user-images.githubusercontent.com/53363382/111590074-e73d8900-8782-11eb-8efe-376ee9613af1.png)
6. After reviewing the relevant documentation, the member can start writing code. At this point, the member should move the corresponding issue(s) to in development in the project board. Each commit made is linted before it is allow to be fully committed. The linting ensures consistent styling for the code. Each commit should also be pushed to Github so other members can help when there are issues or review the progress made.
### Testing, Pull Requests, and Merging
7. When a feature is complete, the member should then proceed to testing the code or, if they are not a tester, hand the code off to a member on the testing team. The relevant issues should also be moved to in testing in the project board. The member should also decide whether they will employ Unit Testing with Jest, E2E testing with Cypress, or both. Testing should cover the most important parts of what is implemented and 100% coverage should be aimed for.
8. Finally, when testing is complete, the member should submit a pull request. The pull request should be named according to what issues it addresses. The relevant issues are moved to In Review in the project board. The pull request must past the Continous Integration tests and be approved by 2 members before it can be merged.
9. After merging, the issues are moved to completed and the member can begin a new issue.

## Looking Ahead - What Needs To Be Done
What should a new member focus on? There are three main features that would improve the Pomodoro app. These features are listed and detailed as issues with the label "future". They are also currently in the project backlog. Before development can be started on these issues, high-fidelity designs must be created for them. The three features are as follows:
1. Graphs in the stats page displaying the trends in average distractions and failed Pomos. These should be line graphs and are meant to give the user a more visual representation of their progress. There should also be seperate graphs for the past week and month. These graphs should also be styled well to fit the current visual theme of the app.
2. Language Support to increase accessibility. Adding this feature will require code refactoring as it was not planned from the beginning. The languages should, at minimnum, be the 3 most commonly spoken languages.
3. Adding Mobile Support. This feature will not only increase the user base, but also help the general responsivess of the app as it is currently not ideal for screens smaller than 15 inches.

In addition to features, more testing can be added to increase coverage. This includes both E2E testing and Unit testing.

Finally, new members should also be willing to contribute their own ideas and changes for the application, whether they be design changes, architecture modifications, or even large features such as a mobile application.

Welcome to the Team.
