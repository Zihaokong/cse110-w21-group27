# 001 - Deployment
* Date: 04/29/22
* Status: IN PROGRESS

## Context and Problem Statement
We need a new remote server to support our website as GitHub pages is no longer acceptable based on the specs of our project. Primarily, we need to set up analytcs which means we must have a backend to set up error/data collection. Additionally, an independent deployment from GitHub would most likely provide faster speeds and more accomodations.

## Considered Options
* Option 1: **Firebase**
  * [+] Takes care of server side programming.
  * [+] Production ready NOSQL backend storage with GUI.
  * [+] Low Latency/Fast Connection
  * [+] Scalable
  * [-] Learning curve for scaling application/database/caching.
* Option 2: **Heroku**
  * [+] Beginner Friendly
  * [+] Built in CLI for interaction
  * [+] Coding Flexibility, especially with backend
  * [-] Requires In-depth knowledge to utilize the flexibility
  * [-] High Latency/Low Network Performance
  * [-] Limited query capabilities.
  * [-] Possible sync issues if project gets big.
  * 
* Option 3: **Netlify**
  * [+] Ease of Use Simplicity
  * [+] Fast Deployment
  * [+] Automatic Asset Optimization
  * [+] Automatic Continuous Deployment
  * [+] Built-in analytics
  * [+] Split Testing capabilities
  * [+] Builtin Login system
  * [+/-] Emphasis on static web hostin.
  * [-] Low Flexibility
  * [-] 
## Decision Outcome

**Chosen option:** -OPTION-


## Consequences
Things that need to change or happen, Links

## Sources:
* https://gcpfirebase.com/firebase-vs-heroku/
* https://blog.logrocket.com/firebase-vs-netlify-which-one-is-right-for-you/
* https://stackshare.io/stackups/heroku-vs-netlify