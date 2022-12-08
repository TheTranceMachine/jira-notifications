import { AgileClient } from 'jira.js';

export const client = new AgileClient({
  host: process.env.REACT_APP_SERVER,
  authentication: {
    basic: {
      username: process.env.REACT_APP_JIRA_USERNAME,
      password: process.env.REACT_APP_JIRA_PASSWORD
    }
  },
  newErrorHandling: true
});