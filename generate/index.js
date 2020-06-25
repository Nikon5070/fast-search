const fs = require('fs');

const randomChar = () => {
  const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯабвгдеёжзийклмнопрстуфхцчшщэюя';
  const charactersLength = characters.length;
  return characters.charAt(Math.floor(Math.random() * charactersLength));
};

const generateString = (length) => Array(length)
  .fill('')
  .map(() => randomChar()).join('');

const generateData = (stringLength, elementLength) => Array(elementLength)
  .fill('')
  .map(() => generateString(stringLength))
  .join('\n');

const checkPerformanceFn = (fn, str) => {
  console.time('Time this');
  const data = fn();
  const result = console.timeEnd('Time this');

  console.log(`${result} ${str || ''}`);
  return { time: result, data };
};

let { data } = checkPerformanceFn(() => generateData(100, 1000000), 'data');

fs.writeFile('index.txt', data, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

for (let i = 0; i < 10; i += 1) {
  fs.appendFile('index.txt', data, (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
}
