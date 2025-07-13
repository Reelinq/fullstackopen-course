import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'notification should appear there..'
})

export default notificationSlice.reducer