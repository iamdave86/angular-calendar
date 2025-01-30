# Angular Calendar

## Features

- Ability to change month back and forth by arrows.
- Ability to jump back to the current month by Today button.
- Ability to add "_reminders_" with the following data: text (max. 30 characters), color, date and city (optional).
- Ability to edit "_reminders_" by changing text, color, date, city.
- Ability to delete reminder.
- Ability to see "_reminders_" for each calendar day. If there are more than 3 reminders for a sepcific day, "_Show N more_" is visible (N
  is the number of the rest reminders). By clicking on the "_Show N more_" link, the remaining reminders get displayed in a dialog.
- Ability to see reminder data in a dialog by clicking on any reminder in the calendar.
- Ability to see weather info (by [OpenWeather API](https://openweathermap.org/api)) based on the city of the selected reminder if city is
  provided. "_N/A_" is displayed in case of any error of the API, like 404 if there is no data for that particular city.

## Obtain Open Weather API key

1. Register for free API key at [Open Weather](https://openweathermap.org/api) website.
2. Create `.env` file in the project's root directory and add `OPEN_WEATHER_API_KEY=#YOUR_API_KEY#` line to the file, where `#YOUR_API_KEY#` is your API key.

## Install & Run

1. Go to the project's root directory.
2. Run `npm i`
3. Run `npm start`.
4. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Lint

1. Go to the project's root directory.
2. Run `npm run lint`.

## Test

1. Go to the project's root directory.
2. Run `npm test` to execute the unit tests with [Karma](https://karma-runner.github.io).

## Build

1. Go to the project's root directory.
2. Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
