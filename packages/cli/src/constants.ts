// TODO: find better ways to do this
const LOCAL_DOMAIN = 'http://localhost:3000'

export const API_GENERATIONS_URL = '/api/uptash/list-generations?code='
export const DOMAIN = process.env.API_DOMAIN ?? LOCAL_DOMAIN
