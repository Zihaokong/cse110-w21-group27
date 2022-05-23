# 011 - Web Components
* Date: 05/22/22
  * (Originally created 05/18/22 on paper and was converted in markdown on 05/22)
* Status: COMPLETED

## Context and Problem Statement
Right now we are stuck between HTML elements and Webcomponents. This mis-mash of
strucutres in the HTML is rather confusing from a developer perspective.
Additionally, a ton of our static HTML is extremely un-semantic and so it reaps
none of the benefits that could possibly come from doing HTML.

## Considered Options
* Web Components
  * [+] We are a web app so any cons with web components is null and void.
  * [-] Fully commiting would take time
* HTML
  * [+] Possibly easier
  * [-] Less in line with the essence of our website.
## Decision Outcome

**Chosen option:** Web Components. This will most likely be more work, but the
effort will be well worth it. For starters, it would give us a ton of
mobility for our componenets, allowing us to have more ease of use with manipulating the
UI. Additionally, it will provide far more simplicity and organization from a DX
point of view which would help speed up processes that otherwise could have
been bogged down in confusion.


## Consequences
Things that would need to happen is removing a ton of the elements statically
created in the HTML file and migrate their construction into web components.
This is especially true for the timer and stats visualizations, which would
require careful consideration as to how it will be moved.

