import React, { useEffect, useState }  from 'react';
import { Form, TextArea } from "carbon-components-react";

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ''
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value,localStorageKey]);

  return [value, setValue];
};

const Settings = () => {
  const [jqlQuery, setJqlQuery] = useStateWithLocalStorage('jira_jql');

  return (
    <div className="settings">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col">
            <div className="settings__title">Settings</div>
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col">
            <Form>
              <div className="settings__jql">
                <TextArea
                  id="jira_jql"
                  labelText="Paste in JQL query"
                  helperText="Example: assignee=currentUser()"
                  rows={4}
                  cols={120}
                  value={jqlQuery}
                  onChange={(e) => setJqlQuery(e.target.value)}
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