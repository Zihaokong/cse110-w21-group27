# 004 - Timer System
* Date: 05/06/22
* Status: COMPLETED
## Context and Problem Statement
* **Context:** The landing page as it stands is very non-intuitive in terms of knowing what the website is. There is a task list, but it has no mention of the pomodoro timer.
* **Problem:** Should we make the main focus the pomodoro timer and have the task list as a secondary feature (as opposed to the task list being the landing page).

## Considered Options
* Option 1 - Timer Page as landing page
  * [+] The domain of the website (pomodoro timer) is better understood by the user.
  * [+] The flow of the website is more intuitive.
  * [+] The user can immediately start a timer and there is less inherent overhead to starting the process.
  * [-] The task list system is less emphasized which means an important feature of the pomodoro timer may be overlooked.
  
* Option 2 - Task list Page as landing page
  * [+] The pomodoro timer system is more rigorously followed as in the conventional pomodoo timer system, the user must create set of tasks and follow through with it.
  * [-] Does not give much away as to what the website actually does.
  
## Decision Outcome

**Chosen option:** Timer Page as landing page  
The timer page was chosen to give more freedom to how the user may want to do their sessions. Some people may honestly wish to work without the task list feature. Additionally, this allows for more understanding as to what the pomodoro timer is for noobs because landing on the timer page immediately tells you that this website is a stopwatch system, whereas the old system made it seem the main purpose of the website was to act as a task list manager.

## Consequences
A major change that needs to occur is that the landing page now needs to be the timer system instead of the task list page. This means we should add some way to get to the task list as well as the stats page from the timer. Also, there should be a way to get to the timer page from the stats page as well as the task list page without the use of selecting a task. A subtle change that will occur is that the timer should be able to start without a selected task.


