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
  const history = useHistory()

  useEffect(() => {
    if (password) {
      localStorage.setItem('jira_password', password);
    }
    localStorage.setItem('jira_username', username);
  }, [username, password]);

  return (
    <div className="login">
      <div className="bx--grid login__grid center">
        <div className="bx--row">
          <div className="bx--col">
            <div className="login__title">Jira Notifications</div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <Form>
              <div className="login__input__username">
                <TextInput
                  id="username"
                  labelText="Jira Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login__input__password">
                <TextInput
                  id="password"
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
