import { client } from '../client';

// export async function getActiveSprint(id) { return await client.board.getAllSprints({ boardId: id, state: 'active' }) }
export const getBoardIssues = (id, startAt = 0) => { return client.board.getIssuesForBoard({ boardId: id, startAt }) }
