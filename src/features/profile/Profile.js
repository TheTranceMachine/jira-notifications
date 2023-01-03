import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Loading, Button, ButtonSet } from "carbon-components-react";
import { useGetProfileQuery } from "../api/apiSlice";

const openIssues = () => {
  window.open('http://localhost:5556/issues', '_blank', 'width=1200,height=700');
}
const Profile = () => {
  const history = useHistory();
  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    refetch
  } = useGetProfileQuery();

  useEffect(() => {
    refetch();
  }, [refetch])

  return (
    <div className="profile">
      <>
        { isError && !isSuccess && (
          <div className="profile__error">
            <h4>Ops! Something went wrong.</h4>
            <div>Try logging in again.</div>
          </div>
        )}
        { isSuccess && !isLoading && (
            <div className="cds--grid">
              <div className="cds--row">
                <div className="cds--col profile__col--center">
                  <img
                    src={profile.avatarUrls["48x48"]}
                    alt="User profile"
                    className="profile__image"
                  />
                </div>
              </div>
              <div className="cds--row">
                <div className="cds--col profile__col--center">
                  <div className="profile__welcome-user">
                    <div className="welcome">
                      Welcome
                    </div>
                    {profile.displayName}
                  </div>
                </div>
              </div>
            </div>
        )}
        <div className="profile__footer">
          <ButtonSet>
            <Button
              onClick={() => history.push('/')}
              className="profile__footer__button"
            >
              Login
            </Button>
            <Button
              onClick={() => openIssues()}
              className="profile__footer__button"
              disabled={isError && !isSuccess}
            >
              Issues
            </Button>
          </ButtonSet>
        </div>
      </>
      { isLoading && (
        <Loading
        withOverlay={false}
        className="profile__loading"
        />
      )}
    </div>
  )

}

export default Profile;