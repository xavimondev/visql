export const INITIAL_CODE = `/* 
AI 🤖 WILL GENERATED SQL CODE FROM YOUR 
DATABASE DIAGRAM
*/`
export const ADD_COMMAND = `npx visql add`
export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://visql.vercel.app'
