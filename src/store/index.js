import Vue from 'vue';
import Vuex from 'vuex';
import generateTree from '../helper/tree';

Vue.use(Vuex);

const generateString = (length) => {
  const result = Array(length);
  const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯабвгдеёжзийклмнопрстуфхцчшщэюя';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result[i] = characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.join('');
};

export const generateData = (stringLength, elementLength) => {
  const result = Array(elementLength);
  for (let i = 0; i < elementLength; i += 1) {
    result[i] = generateString(stringLength);
  }
  return result;
};

export const checkPerformanceFn = (fn) => {
  const t1 = performance.now();
  fn();
  const t2 = performance.now();
  const result = (t2 - t1).toFixed(2);

  console.log(`time working: ${result} ms`);
  return result;
};

const data = generateData(100, 1000);
const tree = generateTree(data);

export default new Vuex.Store({
  state: {
    data,
    tree,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
