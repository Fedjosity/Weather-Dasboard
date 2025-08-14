export type Coordinates = {
  lat: number;
  lon: number;
};

export type CurrentWeather = {
  name: string;
  coord: Coordinates;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
};

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
};

export type ForecastResponse = {
  city: {
    name: string;
    coord: Coordinates;
  };
  list: ForecastItem[];
};

export type WeatherBundle = {
  current: CurrentWeather;
  forecast: ForecastResponse;
};
