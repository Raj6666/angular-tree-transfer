export const USERS = {
    'GET /test': { users: 'Raj', words: '武汉加油，中国加油' },
    '/403': () => { throw new MockStatusError(403); },
}