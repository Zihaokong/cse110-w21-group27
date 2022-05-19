# 1. Architecture Decisions Record

* Date: 2021-01-30 
* Status [Accepted]

## Context and Problem Statement

* Need to setup the architectural decisions record for the project 
* Decide which platform we are going to edit for documentations and formats to follow.


## Considered Options

Platforms:
* [Google Docs](https://docs.google.com/) 
  * [+] Allow used to edit as regular paper and documents.
  * [+] Simple to download file in PDF format.
  * [-] Extra space and platform to host files for docuemnts.
  * [-] Require to transport the word file from Google docs to GitHub for record.
  
* [GitHub](https://github.com/Zihaokong/cse110-w21-group27)
  * [+] Keeping all the documentation in one place.
  * [+] No need to convert files into other format.
  * [-] Need to be familiar with GitHub markdown.
  * [-] Markdown may be hard for formatting.

Formats:
* [koppor's template](https://github.com/adr/madr) - Details on ADRs markdown.
* [Assignment's template](https://adr.github.io/madr/) - Template from assignment description
* [AWS's format](https://github.com/alphagov/govuk-aws/tree/master/docs/architecture) - Format that being used in GOV.UK in AWS
* Formless - No conventions for file format and structure

## Decision Outcome

Chosen option: "GitHub", because
* Since we holds our sources on GitHub, it is good practice to keep all the files in one place.
* Everyone has basic understanding on GitHub markdown from the lab.
* Flexiable on working with local machine or edit on GitHub directly.

Chosen option: "AWS's format", because
* This format is clear and easy to follow. 
* It contains sufficient details on the decisions for record.
* Being used in real-life and fulfill our project requirements.

## Consequences
We will put our Architectural Decisions Record on GitHub and using the AWS's format for ADRs documentation
[Link to our ADRs](https://github.com/Zihaokong/cse110-w21-group27/blob/main/specs/adrs/)


