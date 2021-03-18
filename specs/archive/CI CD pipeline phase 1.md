# Pipeline Status Report - Phase #1
#### [Last Update: 02/09/2021]

![pipeline-graph](https://github.com/Zihaokong/cse110-w21-group27/blob/main/specs/pipeline-phase1-graph.jpg)


## Linting and Code Style Enforcement
* Status: [Active]
  * Currently, linting and code style enforcement is implemented. However, we need to fine-tune the styling configurations to fit the needs of programmers.
* ESLint is being used to lint the code and Prettier is being used to enhance style requirements.
* Both are being used in the VSCode editor where the user can view real-time errors and warnings of violations of the style guide in their code. 
* Furthermore both are being enforced by Git Hooks. More specifically, whenever the user creates a new commit, the .js files staged in that commit are ran through both ESLint and Prettier. If there is a discrepancy found, it is automatically changed to fit the formatting style enforced.
* ESLint and Prettier both follow the Airbnb style guide.
## Code Quality via Tool
* Status: [Superseded] 
  * Currently, code quality via tool is under development.
* We investigated Codeacy, Codeclimate, and DeepScan, but these quality checkers are only free for open-source projects.
* Either we can look deeper and find some free code quality checker or divvy up the price amongst the team members.
## Code Quality via Human Review
* Status: [Active]
  * Currently, code quality via human review is implemented and, in the future, we can create guidelines for what to look for when doing quality assessment.
* Currently you cannot directly push to main to prevent un-reviewed code from being pushed into the main repository.
* All changes must be redirected through a branch with a related issue in GitHub describing what the branch hopes to achieve.
* Once the branch is ready to be merged live into main, it must first have a pull request which is manually reviewed and checked off by two other team members.
## Unit Tests via Automation
* Status: [Active]
  * Currently, unit tests via automation is implemented, and, in the future, we can explore functionality further and possibly create guidelines for test formatting.
* Currently using Jest as the test platform.
* The tester must create a series of tests for a branch targeted towards the functionality added/changed in that branch.
* On Pull Request, Jest will be run on the branch and every test file will be run. The Pull Request can only be accepted and merged into main if all the tests run successfully.
## Documentation Generation via Automation
* Status: [Active]
  * Currently, documentation generation via automation is functionally working and, on pushes, generates new documentation in the wiki.
* Programmers can run a command which will locally generate documentation for the branch which they can use as a guide for the code they are working on.
* Currently, documentation is ignored by git. The plan right now is to make GitHub Actions generate the document after a successful merge onto the main. That way, the documentation of the code will be reflective of what is on main. 
* We plan to use GitHub actions to automatically push the generated markdown file to the wiki, which will allow the documentation for the main branch to be visible. 
* For testing purposes, the documentation automation is running on every push, but in actual production, will occur only on merges to main.

# Pipeline Phase 1 Demonstration Video


[The video can be seen here](https://youtu.be/N5m7O7tmPhU)

[Source for Diagram](https://github.com/Zihaokong/cse110-w21-group27/blob/main/specs/pipeline-phase1-graph.jpg)


[Source for video](https://github.com/Zihaokong/cse110-w21-group27/blob/main/admin/videos/pipeline-phase1-demo.mp4)

