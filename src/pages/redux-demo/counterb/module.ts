/* eslint-disable dot-notation */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '@store/index'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const name = 'counterb'

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

const { incrementByAmount } = slice.actions

const incrementAsync = (amount: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export const selectCount = (state: RootState) => state[name]?.value

export const actions = { ...slice.actions, incrementAsync }

export default slice
