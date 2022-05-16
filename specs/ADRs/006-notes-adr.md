# 006 - Notes
* Date: 05/06/22
* Status: COMPLETED

## Context and Problem Statement
* **Context:** When bringing up the issue of notes, we noticed that is does not serve a major purpose in the current system nor does it feel like it has a presence on the website. There were a couple options as to what we should do with it to provide a better experience for the user.
* **Problem:** What should we do with the notes system?

## Considered Options
* Option 1 - Keep it as is
  * [+] The current system, while crude, is a faithful adaptation to the principles of the pomodoro timer system, which states that the user should be able to write down notes for their assignment, but should only be able to do so before they begin their first session on the task.
  * [-] While it is traditional, it also seems to be generally under-utilized, skipped over since most people don't seem to get anything out of it.
* Option 2 - Remove it entirely
  * [+] Since it doesn't seem to have a meaningful impact on the server, it would be less visual and functional clutter for the user to wade through if we just removed it.
  * [-] A big part of the pomodoro timer process is that notes are taken about the task before hand (and only before the task is started).
* Option 3 - Renovate so that it is always available to the user even during a session
  * [+] This would allow for the user to write down notes they would want to take during the session (i.e. a distraction they want to mention or a new revelation in the task at hand).
  * [-] Could be a major distraction for the user which would defeat the purpose of a study aid like our pomodoro timer.
## Decision Outcome

**Chosen option:** A mixture of option 2 and 3.  
We felt the notes could follow the same path as the trap door mentality, where we have it enabled for starters, and it can be disabled for those who would rather not have it there. That way we can cater to both sides of the spectrum, those who would feel that the notes would boost their performance as well as those who feel it is nothing more than a distraction. Additionally, we felt that if it is enabled, it should be present both in the task list as well as the timer, always available to be edited.


## Consequences
This is another extension of the trap door options we have so that is something important to keep in mind. Realistically, the change could be a mere swap in style where the notes are either hidden or they are not. Additionally, we may need to set up some tutorialization for the user.

