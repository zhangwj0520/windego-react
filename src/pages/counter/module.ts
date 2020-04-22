import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '@store/index'

export interface CounterState {
  count: number
  name: string
}

const initialState: CounterState = {
  count: 11,
  name: 'name',
}

export const name = 'counter'
export const slice = createSlice({
  name,
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
  },
})

const { incrementByAmount } = slice.actions

export const incrementAsync = (amount?: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount || 1))
  }, 1000)
}

export const actions = { ...slice.actions, incrementAsync }

export const selectCount = (state: RootState) => state[name].count

export default slice
