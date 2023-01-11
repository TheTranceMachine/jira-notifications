export const dataTableHeaders = [
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'key',
    header: 'Jira ID',
  },
  {
    key: 'epic',
    header: 'Epic',
  },
  {
    key: 'reporter',
    header: 'Reporter',
  },
  {
    key: 'created',
    header: 'Created',
  },
  {
    key: 'summary',
    header: 'Summary',
  },
  {
    key: 'assignee',
    header: 'Assignee',
  },
  {
    key: 'updated',
    header: 'Updated',
  }
];

export const dataTableRows = (issues) => {
  let mappedIssues = [];
  issues.forEach((issue) => {
    const {
      id,
      key,
      fields: {
        created,
        reporter: { displayName: reporter },
        updated,
        summary,
        epic,
        status: { name: status },
        assignee
      }
    } = issue;
    mappedIssues.push({
      id,
      key,
      reporter,
      created,
      updated,
      summary,
      epic: epic === undefined ? null : epic.key,
      status,
      assignee: assignee === null ? null : assignee.displayName
    })
  });
  return mappedIssues;
}