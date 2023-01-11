import React, { useEffect, useState }  from 'react';
import { Form, Dropdown, MultiSelect } from "carbon-components-react";

const teams = [
  {
    id: 0,
    text: 'DEXP - Digital Experience',
    value: 'DEXP - Digital Experience'
  }
];

const projects = [
  {
    id: 0,
    text: 'XPS',
    value: 'XPS'
  },
  {
    id: 1,
    text: 'Services Platform Tribe',
    value: 'Services Platform Tribe'
  },
  {
    id: 2,
    text: 'Horizon',
    value: 'Horizon'
  }
];

const statuses = [
  {
    id: 0,
    text: 'Development',
    value: 'Development'
  },
  {
    id: 1,
    text: 'Review',
    value: 'Review'
  },
  {
    id: 2,
    text: 'Testing',
    value: 'Testing'
  },
  {
    id: 3,
    text: 'Release Testing',
    value: 'Release Testing'
  },
  {
    id: 4,
    text: 'DONE',
    value: 'DONE'
  },
  {
    id: 5,
    text: 'Closed',
    value: 'Closed'
  },
  {
    id: 6,
    text: 'Release prep',
    value: 'Release prep'
  },
  {
    id: 7,
    text: 'Release',
    value: 'Release'
  }
];

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || ''
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value,localStorageKey]);

  return [value, setValue];
};

const Settings = () => {
  const [jiraTeam, setJiraTeam] = useStateWithLocalStorage('jira_team');
  const [jiraProjects, setJiraProjects] = useStateWithLocalStorage('jira_projects');
  const [jiraStatuses, setJiraStatuses] = useStateWithLocalStorage('jira_statuses');

  useEffect(() => {
    if (jiraTeam) {
      localStorage.setItem('jira_team', JSON.stringify(jiraTeam));
    }
    if (jiraStatuses) {
      localStorage.setItem('jira_statuses', JSON.stringify(jiraStatuses));
    }
    localStorage.setItem('jira_projects', JSON.stringify(jiraProjects));
  }, [jiraTeam, jiraProjects, jiraStatuses]);

  const selectJiraProjects = (items) => {
    let itemCollection = [];
    for (let item of items) {
      itemCollection.push(item.value);
    }
    setJiraProjects(itemCollection);
  }

  const selectJiraStatuses = (items) => {
    let itemCollection = [];
    for (let item of items) {
      itemCollection.push(item.value);
    }
    setJiraStatuses(itemCollection);
  }

  return (
    <div className="settings">
      <div className="cds--grid settings__grid">
        <div className="cds--row">
          <div className="cds--col">
            <div className="settings__title">Settings</div>
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col">
            <Form>
              <div className="settings__team">
                <Dropdown
                  id="jira_team"
                  titleText="Team"
                  label="Team"
                  items={teams}
                  itemToString={(item) => (item ? item.text : '')}
                  onChange={({ selectedItem }) => setJiraTeam(selectedItem.value)}
                />
              </div>
              <div className="settings__projects">
                <MultiSelect
                  id="jira_projects"
                  titleText="Projects"
                  label="Projects"
                  items={projects}
                  itemToString={(item) => (item ? item.text : '')}
                  selectionFeedback="top-after-reopen"
                  onChange={({ selectedItems }) => selectJiraProjects(selectedItems)}
                />
              </div>
              <div className="settings__statuses">
                <MultiSelect
                  id="jira_statuses"
                  titleText="Statuses"
                  label="Statuses"
                  items={statuses}
                  itemToString={(item) => (item ? item.text : '')}
                  selectionFeedback="top-after-reopen"
                  onChange={({ selectedItems }) => selectJiraStatuses(selectedItems)}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings;