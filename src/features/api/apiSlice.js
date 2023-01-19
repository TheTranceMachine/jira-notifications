import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const findMatchingElementById = (array, id) => array.find(element => element.id === id);

const formatJqlQuery = (jql) => {
  let formattedJql = encodeURI(jql);
  formattedJql = formattedJql.replaceAll('%20', '+');
  formattedJql = formattedJql.replaceAll('=', '%3D');
  return formattedJql;
}

const notifyIfIssueUpdated = (cachedIssues, newIssues) => {
  if (cachedIssues) {
    newIssues.forEach(issue => {
      const cachedObject = findMatchingElementById(cachedIssues, issue.id);
      if (cachedObject) {
        if (cachedObject.fields.updated !== issue.fields.updated) {
          new Notification('Jira ticket update', {body: issue.key})
            .onclick = (event) => {
            event.preventDefault();
            window.open(`https://jira.sec.***REMOVED***.com/browse/${issue.key}`,"_blank");
          }
        }
      }
    })
  }
}

export const jiraApi = createApi({
    reducerPath: 'jiraApi',
    baseQuery: fetchBaseQuery(
      {
        baseUrl: process.env.REACT_APP_SERVER,
        prepareHeaders: (headers) => {
          const jiraUsername = localStorage.getItem("jira_username");
          const jiraPassword = localStorage.getItem("jira_password");

          headers.set("Authorization", `Basic ${Buffer.from(
            `${jiraUsername}:${jiraPassword}`
          ).toString('base64')}`);
          return headers;
        }
      }),
    endpoints: builder => ({
      getProfile: builder.query({
        query: () => '/myself'
      }),
      getIssues: builder.query({
        query: () => {
          const jqlQuery = localStorage.getItem("jira_jql");
          return '/search?jql=' + formatJqlQuery(jqlQuery);
        },
        async onQueryStarted(arg, { getState, queryFulfilled }) {
          try {
            const cachedIssues = getState().jiraApi.queries["getIssues(undefined)"].data?.issues;
            const { data: { issues: newIssues } } = await queryFulfilled;
            notifyIfIssueUpdated(cachedIssues, newIssues);

            return newIssues;
          } catch (err) {
            console.log('onQueryStarted err: ', err);
          }
        }
      })
    })
  });

export const { useGetProfileQuery, useGetIssuesQuery } = jiraApi;