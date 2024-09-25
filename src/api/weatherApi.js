import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appId } from "../config/config";

const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    fetchWeatherByCity: builder.query({
      query: ({ city, unit }) =>
        `weather?q=${city}&units=${unit}&appid=${appId}`,
    }),
    fetchExtendedForecast: builder.query({
      query: ({ city, unit }) =>
        `forecast?q=${city}&units=${unit}&appid=${appId}`,
    }),
  }),
});

export const { useFetchWeatherByCityQuery, useFetchExtendedForecastQuery } =
  weatherApi;
export default weatherApi;
