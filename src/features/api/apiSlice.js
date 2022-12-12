import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const jiraUsername = localStorage.getItem("jira_username");
const jiraPassword = localStorage.getItem("jira_password");

export const jiraApi = createApi({
    reducerPath: 'jiraApi',
    baseQuery: fetchBaseQuery(
      {
        baseUrl: process.env.REACT_APP_SERVER,
        prepareHeaders: (headers) => {
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
        query: () => '/search?jql=' +
          'Team+%3D+%22DEXP+-+Digital+Experience%22+AND+project+in+(XPS,+%22Services+Platform+Tribe%22,+Horizon)' +
          '+AND+assignee=currentUser()+AND+status+not+in+(Closed,+Release,+%22Release+Prep%22,+DONE)'
      })
    })
  });

export const { useGetProfileQuery, useGetIssuesQuery } = jiraApi;