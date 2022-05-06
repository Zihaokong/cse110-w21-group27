# 003 - Login
* Date: 05/06/22
* Status: COMPLETED

## Context and Problem Statement
* **Context:** When considering our audience, are they going to be mobile, and if so, are they going to want a unified task list where ever they go to?
* **Problem:**

## Considered Options
* Option 1 - Login
  * [+] Can have a unified task list and stats system
  * [+] A big bonus to analytics as we can associate data to an account.
  * [+] With Firebase, this system is mostly automated and security by Google.
* Option 2 - No Login
  * [+] We don't need to store emails and hashed passwords in our database which means we would be less of a target towards malicious users who would want access to this info. This means we would need an extra emphasis on security
  * [+] We can focus more on other features instead of focusing on making a secured login system
  
## Decision Outcome

**Chosen option:** No login  
This comes both as a way to curb feature creep as well as because the pros of a unified task list do not justify the possible downsides which is that people are now storing their sensitive info on our website, which means we have to be protective stewards of their info. 

## Consequences
We would need to keep in mind that with no login system, we would need an efficient way of analyzing people's time on the website.

