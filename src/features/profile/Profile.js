import React from 'react';
import { Button } from "carbon-components-react";
import { useGetProfileQuery } from "../api/apiSlice";

const openIssues = () => {
  window.open('http://localhost:5556/issues', '_blank', 'width=1200,height=700');
}
const Profile = () => {
  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProfileQuery();

  return (
    <div>
      { isSuccess && !isLoading
        ? (
          <div>
            { JSON.stringify(profile) }
            <Button onClick={() => openIssues()}>
              Issues
            </Button>
          </div>
        )
        : <div>Loading</div> }
      { isError && !isSuccess && <div>{error}</div> }
    </div>
  )

}

export default Profile;