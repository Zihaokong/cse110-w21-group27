# 013 - CSS
* Date: 05/22/22
  * (Originally created 05/21/22 in meeting and was converted to markdown on 
    05/22)
* Status: COMPLETED

## Context and Problem Statement
we should have a universal main.css file which houses all the rules which are
shared by all three pages and then throw all the remaining styles into the HTML.
This is so that the user only needs to download the main.css once to get all the
shared info, the html file, the js, and the web components. The big reason is
that instead of each html file having a separate css file which needs to be
downloaded by the user, they only need 1 file (main.css) and any spare rules
will be put the HTML.

## Considered Options
* Implement this?
  * [+] We will have a universal main.css file to maintain consistency
  * [+] CSS files will be a lot of organized, simple and consistent.
  * [-] A fair amount of legwork for a little bit of benefits provided.

## Decision Outcome

**Chosen option:** We will be implementing this because it will provide good
benefits to simplicity and organization of the code base.


## Consequences
We would need to have some focus on determining what rules are universal and
which ones are not. We would need to take the universal rules and put them into
a css file and the rest will be placed in their respective HTML file.

