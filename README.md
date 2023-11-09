# Jira Notifications

## Problem
Day to day work as a developer in an Agile team requires constant handling of Jira tickets.
When your Jira ticket is commented and you are deep in code, you may not notice the comment that requires a shift in solution.
Not noticing an important email notification from Jira sometimes means that minutes and even hours of code have to be stashed.


## Solution
Desktop app that gives you an overview of your current Jira tickets and notifies you when a comment is added or change happens to any of the tickets.
You can select which Jira tickets you're interested in by writing (or copying) a JQL query.
The app lives in your system taskbar and is represented by an icon. When the icon is clicked, it opens an overview window with Jira tickets.
You can access the settings page with JQL query from the overview window.

## Tech stack
- React.js
- Redux Toolkit
- Electron.js
