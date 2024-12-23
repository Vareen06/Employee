import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../pages/employeeSlice'

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
})