# 012 - Noob System
* Date: 05/22/22
  * (Originally created 05/21/22 on whiteboard and was converted to markdown on 
    05/22)
* Status: COMPLETED (EDIT: PUSHED TO BACKLOG)

## Context and Problem Statement
We were planning on adding a new-user system. Essentially, now that you can
start the timer without a task, we should be able to tell the user as a
warning that they don't have a task enabled incase they forgot to choose/create
one (and it also allows us to sneak our opinionated approach on the Pomodoro
process onto the user). The user can either choose a created task, create a new
one, or just continue onwards. The user can also have the option of disabling
this option if they are not the type to make tasks. However, we are planning on
having a logic system for "noobs". Essentially, when the user first enter the
page, they will be marked  as a noob. A noob will not receive this pop up and
will be able to run the start task. In other words, a noob will not be prompted
to choose/create a task. However, after every session, the noob will be asked if
they wish to continue or create a task. They can either continue and stay a
noob, or create a task. They will then be redirected to the task page and will
no longer be marked a noob (they can also be unmarked by perusing the top bar
and going to the task page on their own). Once they are no longer a noob, they
will now receive the warning if they don't have a task (and they can also disable it).  
The logic behind this is that there are two big things going on with the
Pomodoro timer: the timer and the task management, both of which have the
purpose of improving time management. The timer is meant to act as a micro time
management where the user learns to stay focused on 25 minute intervals and
adhere to some form of immediate regiment. The the task management is meant to
act as a macro time management, where the user can begin to consider managing
their time on a larger scale, that is they can plan out their day with tasks and
manage not just their immediate time but their entire day. With this in mind, we
must look back to our audience and see that many of the people coming in are
people with poor management skills but are willing to change. If we gave both
tools to the user, they might get easily burned out trying learn how to manage
both their immediate time and their long term time. So we first give them the
ability to manage their "micro", and we don't bring up the idea of tasks to them
so that we don't overload them immediately. The hope is that once they
participate with the timer long enough, they will have a fair handling of the
immediate time management (or at least  a tolerance to it), and they would then
begin to explore into other options. At this point now that they have the micro
down, they can begin to learn the macro, which is the task system. But it hinges
the idea that without learning how to control the micro, how can we expect them
to have a handle on the macro?  
There was some contention on this point because James though this would
undermine our opinionated natured for the user and may frustrate users who would
want tasks immediately, but we decided to go through with implementation with A/B
testing as a compromise (have the noob system enabled for some and disabled for
others to see which types of users have a better retention).  
TL;DR : 1st time visitors won't be asked to set up tasks until they are 
comfortable with the timer system. After they enter the task page, they 
will be unmarked as "noobs" and will be prompted with warnings to have a task 
when starting the timer without one

## Considered Options
* Implement this?
  * [+] This implementation could benefit users because it would  allow for 
    users to ease into the pomodoro timer process. first getting used to working
    on a timer and then getting used to the task list.
  * [-] This possibly would undermine the opinionated nature of our website, 
    allowing for users to skip the Pomodoro process as intended or worse, not 
    even realize that the process exists.
  * [] A bit of extra effort into setting up this logic (though honest it is not
    a whole lot).

## Decision Outcome

**Chosen option:** Implement with a caveat. Will will be implementing this on
the condition that we will do A/B testing and analytics to see if this desicion
truly does increase user retention or if adding the warning for everyone is
better.


## Consequences
The logic for determining if the warning should occur needs to be implemented.  
UPDATE: Since analytics was pushed backed, we could not reasonably see A/B as
a means to determining what would be the best route to take for this. As a 
result, we decided to choose the more opinionated option of forcing the
system on initial users. We worried that this might overload the user with
options, but they are given the option to ignore this warning, which means
that if they find it better to start on the micro, they can make that 
desicion for themselves.

