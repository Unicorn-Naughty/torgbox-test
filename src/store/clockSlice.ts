import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Timezone {
  city: string;
  timezone: string;
}

interface ClockState {
  timezones: Timezone[];
}

const initialState: ClockState = {
  timezones: [],

};

export const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    setTimezones(state, action: PayloadAction<Timezone[]>) {
      state.timezones = action.payload;
    },
  },
});
export const { setTimezones } = clockSlice.actions;