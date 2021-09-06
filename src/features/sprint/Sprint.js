import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getActiveSprintAsync,
  selectActiveSprint,
  selectSprintStatus
} from './SprintSlice';

function Sprint() {
  const [sprint, setSprint] = useState({});
  const boardId = 336;
  const activeSprints = useSelector(selectActiveSprint);
  const fetchStatus = useSelector(selectSprintStatus);
  const fetched = fetchStatus === 'success' && activeSprints.values.length;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(getActiveSprintAsync(boardId));
    } else {
      setSprint(activeSprints.values.find(obj => obj.originBoardId === boardId));
    }
  }, [fetched, activeSprints, dispatch]);

  return (
    <div className="notifications">
      <div className="notifications__results">
        {fetched && sprint.name}
      </div>
    </div>
  )
}

export default Sprint;
