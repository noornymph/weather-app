import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appId } from "../config/config";

// Thunk for fetching current weather data
export const fetchWeatherByCity = createAsyncThunk(
  "city/fetchWeatherByCity",
  async ({ city, unit }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${appId}`
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const citySlice = createSlice({
  name: "city",
  initialState: {
    city: "",
    weatherData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
