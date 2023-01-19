import React from "react";
import { Button, ButtonSet } from "carbon-components-react";

const openIssues = () => {
  window.open('/issues', '_blank', 'width=1200,height=700');
}

const openSettings = () => {
  window.open('/settings', '_blank', 'width=800,height=290');
}

const CommonFooter = () => (
  <div className="common__footer">
    <ButtonSet>
      <Button
        onClick={() => openSettings()}
        className="common__footer__button"
        // disabled={isError && !isSuccess}
      >
        Settings
      </Button>
      <Button
        onClick={() => openIssues()}
        className="common__footer__button"
        // disabled={isError && !isSuccess}
      >
        Issues
      </Button>
    </ButtonSet>
  </div>
)

export default CommonFooter;