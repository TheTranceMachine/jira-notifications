import { client } from '../client';

export async function getActiveSprint(id) { return await client.board.getAllSprints({ boardId: id, state: 'active' }) }
