# 002 - Trap Door
* Date: 05/06/22
* Status: COMPLETED

## Context and Problem Statement
* **Context:** When the user first enters the website, we should assume they have no recollection of what a pomodoro timer is. With this in mind, we know that the user may not know what settings they would initially want in a simplified sense of session lengths let alone if they want sessions to immediately bleed into breaks, or how many sessions it takes to get a long break.
* **Problem:** How should we present the settings menu to the user when they first enter. The functionality of the settings would remain the same, it would more so be the case of are certain settings being hidden in an advanced menu?

## Considered Options
* Option 1: No Trap Door
  * [+] Less work for the team to do to get a settings menu operational
  * [+] We don't run the risk of creating a ton of functionality that gets overlooked
* Option 1: Trap Door
  * [+] Casters to both noobs and pros. As someone initially enters the website, they don't want to dive right in. Over timer there is a want to customize their pomodoro timer regiment to fit their lifestyle.
  * [+] Separating the settings prevents people from getting confused and overwhelmed at first.
## Decision Outcome

**Chosen option:** Trap Door  
This is because this sort of system would give major accessibility points to our settings, allowing for noobs to feel comfortable with having a small range of options without overwhelming them. At the same time, experts can set up a customized experience for themselves without feeling constrained to simple options.

## Consequences
This means that many of the options should be hidden behind an advanced settings mode and possibly even going the route of having simple options like "Short/Medium/Long sessions & breaks". This would not need to have a lot of JS or even HTML changes, it would be more focused on the CSS/styling.