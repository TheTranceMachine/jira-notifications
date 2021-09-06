import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getActiveSprintAsync,
  selectActiveSprint,
  selectSprintStatus
} from './SprintSlice';
import CircularBar from '../circularBar/CircularBar';
import './Sprint.css';

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

  const getSprintDaysLeft = () => {
    const endDate = new Date(sprint.endDate);
    const currentDate = Date.now();
    const diff = currentDate - endDate;

    let minutes = Math.floor(diff / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    return (
      (days && {value: days, unit: 'days'})
    )
  };

  const daysLeft = Math.abs(getSprintDaysLeft().value);

  return (
    <div className="sprint">
      {fetched && (
        <>
          <h2 className="sprint__name">{sprint.name}</h2>
          <div className="sprint__goal">{sprint.goal}</div>
          <div className="sprint__days-left">
            <CircularBar value={daysLeft}/>
          </div>
        </>
      )}
    </div>
  )
}

export default Sprint;
