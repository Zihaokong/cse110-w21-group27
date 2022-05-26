# Frenemies Report

This meeting took place 05/25/2022. The recording of the meeting can be found
[here](https://ucsd.zoom.us/rec/share/in0FWj_Xi9azqQsTqyyFTtLVdHtAiV5pVuDElOOb1u32W53viLvwsApFI7r4LtSX.B6-_JuKwBX89UXfw?startTime=1653501670000) (password is **2aq!cef1**).  
Bolded bullet points indicate possible points of improvement.

## Frenemies Interaction User Feedback
- Feedback by Theodore Alo
- Took place 05/25/2022 @ 11:00AM - 12:00PM
- Was shown only the website.

### Website Flow
* Start button was not working (minor bug)
* **Checkbox on task item was unclear** 
* Likes the icons usage, thinks they're intuitive
* User is pretty familiar with the pomodoro timer
* **The Auto Timer was unclear in the settings menu**
* **Pomodoro count on the header is unclear**
* Didn't know the long break system, needed more explanation
* Likes the break between the break and the work session when auto timer is
  enabled
* Going back is breaking the clock
* 0/1 is unintuitive for completed

### UI
* Everything looks outdated because everything is sharp
  * **Round off the edges**
* Color pallete is old shcool
  * **Get a more lively color pallete**
* layout is fine, but ui needs more pizzaz.
* **Add drop shadow to the task items**
* looks bunched up, space things out more
  * Use the stats drop box as example
* **Differentiate the colors of the icons**

## Frenemies Interaction Dev Feedback
- Feedback by Eric Song
- Took place 05/25/2022 @ 11:00AM - 12:00PM
- Was shown the Github Repository of the website.

###  Repo
- **We should probably have linting on GitHub's end rather than enforcing everything via client only.**
- **We should also lint HTML and CSS**
- Why do we have config files in /source?
- README and most docs still just templates
- Our meeting, sprint planning, and incident reports are unintuitively organized.
- If we're going to have code quality checkers from the template, we should probably just implement those into the repo
- **Testing should be higher priority (we have been ignoring tests for a long time)**
  
### JS Source
- Code documentation is iffy- not every function explains its params/args/returns. **Make JSDocs documentation more consistent**
- Overall readability is roughly okay
- **Some of the organization is unintuitive (i.e. the `(EDIT)` comments). This should be reorganized or grouped or renamed.**
- **We should probably try to break up our functions so that they're all at most one page long or <100 lines.**
- Check file size and function length via code automation
- We have some magic numbers
  
### HTML/CSS
- **`<div>` with `<p>` should probably just be a list if we don't replace it with a web component**

## Issues to incorporate
* Get a more lively color pallete
  * **Reason:** This is a rather straightforward fix that can be accomplished in a reasonable amount of time with little new skills being added. Additionally, we currently have a team working on UI (as of sprint 3) so it incorporates into our current work flow quite nicely.
* Make JSDocs documentation more consistent
  * **Reason:** Documentation is extremely valuable as a tool for the dev and we would benefit greatly if we expanded upon this. This plays greatly into our values of simplicity and organization as we are simplifying the cognitive requirements of understanding our functions by openly laying out the inputs, outputs and everything inbetween for the functions.