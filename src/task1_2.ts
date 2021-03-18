import { pipeline, Transform } from 'stream';
import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';
import os from 'os';

const csvFilePath = path.join(process.cwd(), 'src/csv', 'task1_2.csv');

pipeline(
  fs.createReadStream(csvFilePath),
  csv(),
  new Transform({
    transform(chunk, encoding, callback) {
      const { ['Amount']: remove, ...rest } = JSON.parse(chunk.toString());
      callback(null, Buffer.from(JSON.stringify(rest) + os.EOL));
    },
  }),
  fs.createWriteStream('./src/csv/task1_2.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  },
);