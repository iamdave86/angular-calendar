const fs = require('fs');
const writeFile = fs.writeFile;
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '.env' });

const setEnv = () => {
  const isProduction = process.env['NODE_ENV'] === 'production';
  const targetFilename = 'environment.ts';
  const targetPath = `./src/environments/${targetFilename}`;
  const appVersion = require('../../package.json').version;

  const envConfigFileContent = `export const environment = {
    appVersion: '${appVersion}',
    production: ${isProduction},
    openWeatherApiKey: '${process.env['OPEN_WEATHER_API_KEY']}',
  };
  `;

  writeFile(targetPath, envConfigFileContent, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`Angular ${targetFilename} file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv();
