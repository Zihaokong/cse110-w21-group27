# Team 8: Cre8tors Meeting
## Details
**Meeting Type:**  Design Session
**Time:** 05/21/2022 13:00-17:00  
**Location:**  Geisel
## Issue X: 
Moving the Task List onto the Timer page
### Issue
We aren't sure whether to move the task list onto the timer page.
The task list being a component, it has a lot of added flexibility and could easily be placed onto the timer page.
The conflict of having the task list on the timer page would be how it would interact with our idea of the timer prompting the user to create a task if a task isn't selected. We wanted the user to be able to run the timer without a seleected task to make it easier for new users to poke around the site and play with it. We thought it would also be preferrable to certain users.
We're struggling to reconcile these two functionalities.
We've broken this up into a few different options:
- We can either include both solutions. The redundant option.
- We could just have the task list on the timer page, and have no prompts if a user starts without a task. The task list option.
- We could keep the task list off the timer page. The create-task menu option.
- Have the task list as a dialog box that pops up as the create-task menu. The dialog option.
- We could differentiate between first time and experienced users, and allow first time users to start the timer uninterrupted while enforcing experienced users to choose whether to create a new task. The differentiate option.
    - We would want to change the wording on the change task button on the modal that appears after a break is complete.
- We could improve the create-task menu to have better user flow. The improve the menu option.

### Resolution
- 
- 
- create-task menu option:
    - Cons:
        - Increases code gulf
        - Annoys users to have to confirm no task
    - Pros:
        - opinionated, encourages forming good habits
- task list option:
    - Cons:
        - Rethink/refactor how the play button and how task selection works.
    - Pros:
        - Streamlined design, with all the functionality in one place
- redundant option:
    - Cons:
        - Redundancy, possible confusion
        - Visually busy
    - Pros:
        - Opinionated
- dialog option:
    - Cons:
        - Very similar to the create-task menu option, but uses the task list instead
        - Rethink/refactor the play button and task selection.
    - Pros:
        - Familiar interface
- differentiate option:
    - Cons:
        - Inconsistent behavior. Confusing?
        - Maybe could be solved just through the improve the menu option?
        - Normal users switching to a new device
        - Timer behavior can be considered baseline behavior
    - Pros:
        - Adds complexity slowly
        - Less initial UI gulf
        - User doesn't know what the pomo is, so don't overwhelm them. Don't want to give them too much control from the start.
    - Assumptions:
        - This is for new users who don't click around our site
        - Might not notice don't show again
        - They're on a task bender
- improve the menu option:
    - Cons:
    - Pros:
        - User flexibility

We want to do AB testing to compare whether we want to implement the user differentiation.
We know we want to improve the menu, specifically adding a don't show again.
We're not going to include the task list on the timer page.
