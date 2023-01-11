import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "carbon-components-react";
import { useGetIssuesQuery, useGetProfileQuery } from "../api/apiSlice";
import CommonFooter from "../common/Common";

const Profile = () => {
  const history = useHistory();

  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    refetch
  } = useGetProfileQuery();

  const {
    isFetching: isFetchingIssues,
    refetch: issuesRefetch
  } = useGetIssuesQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      issuesRefetch();
    }, 10000);
    return () => clearInterval(interval);
  }, [issuesRefetch]);

  return (
    <div className="profile">
      <>
        { isError && !isSuccess && (
          <div className="profile__error">
            <h4>Ops! Something went wrong.</h4>
            <div>Try logging in again.</div>
            <a onClick={() => history.push('/')} href="/">
              Login
            </a>
          </div>
        )}
        { isSuccess && !isLoading && (
          <>
            <div className="profile__header">
              { isFetchingIssues && <small>Checking for updates</small> }
              <Loading
                withOverlay={false}
                className="profile__header__loading"
                active={isFetchingIssues}
                description="Checking for updates"
                small
              />
            </div>
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
          </>
        )}
        <CommonFooter />
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