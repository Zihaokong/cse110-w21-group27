## Group 27: RaccoonBytes :raccoon:

**Meeting type:** Team Meeting

**Attendance:**
- [x] Anvitaa Sekhsaria
- [x] Chad Wall
- [x] Katie Hsieh
- [x] Mingyang Wang
- [x] Nirmal Agnihotri
- [x] Ruisen Huang (Ray)
- [x] Tsun Wai Siu (Ron)
- [x] Varun Singh
- [x] Zihao Kong

**When:** Sat 3/6/21 5-6pm

**Where:** Zoom

## Action items:
- Anvitaa Sekhsaria: back button warnings/fail task warning, setInterval bug, Start button on work session timer
- Chad Wall: Merge task refactors and then test changes to tasks. Create Cypress and JEST tests for the header. Create Cypress tests for overall header.
- Katie Hsieh: write Jest unit tests for stats page, upload docs
- Mingyang Wang: start implementing stats page
- Nirmal Agnihotri: Help with stats page and work on handling back button edge cases
- Ruisen Huang (Ray) Help working stats page. 
- Tsun Wai Siu (Ron): Fixing the conflicts with different branches on the task-list, task-item. Add adrs document and update wiki page.
- Varun Singh: Continue with Cypress tests for edge cases on the timer page, add jest tests with Zihao for the timer page
- Zihao Kong: Write Jest Unit test for timer page, Add documentation for timer page, fix ESlinter problem. 


## Agenda:
- Fix edge case:
  - After the user press change task, he/she will go to the task list page, then the user press back button that leads to the timer page again.
  - Clear current task after starting task
  - Show warning on timer page if no current task, modal with button to go back to task list page
- Make the timer page, save variables in local storage for displaying stats.
- Work on more unit tests and E2E tests.
