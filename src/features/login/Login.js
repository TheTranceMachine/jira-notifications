import React, { useEffect, useState } from 'react';
import { Form, TextInput, Button } from "carbon-components-react";
import { useHistory } from "react-router-dom";

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ''
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value,localStorageKey]);

  return [value, setValue];
};

const Login = () => {
  const [username, setUsername] = useStateWithLocalStorage('jira_username');
  const [password, setPassword] = useStateWithLocalStorage('jira_password');
  const history = useHistory();

  useEffect(() => {
    if (password) {
      localStorage.setItem('jira_password', password);
    }
    localStorage.setItem('jira_username', username);
  }, [username, password]);

  return (
    <div className="login">
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col">
            <div className="login__title">Jira Notifications</div>
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col">
            <Form>
              <div className="login__input">
                <TextInput
                  type="username"
                  id="jira_username"
                  labelText="Jira Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login__input">
                <TextInput
                  type="password"
                  id="jira_password"
                  labelText="Jira Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                kind="primary"
                tabIndex={0}
                type="submit"
                onClick={() => history.push('/profile')}
              >
                Log in
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
