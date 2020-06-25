import Vue from 'vue';
import Vuex from 'vuex';
import generateTree from '../helper/tree';

Vue.use(Vuex);

const randomChar = () => {
  const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯабвгдеёжзийклмнопрстуфхцчшщэюя';
  const charactersLength = characters.length;
  return characters.charAt(Math.floor(Math.random() * charactersLength));
};

const generateString = (length) => [...Array(length)]
  .map(() => randomChar()).join('');

export const generateData = (stringLength, elementLength) => [...Array(elementLength)]
  .map(() => generateString(stringLength));

export const checkPerformanceFn = (fn, str) => {
  const t1 = performance.now();
  const data = fn();
  const t2 = performance.now();
  const result = (t2 - t1).toFixed(2);

  console.log(`time working: ${result} ms ${str || ''}`);
  return { time: +result, data };
};

const stringLength = 100;
const elementLength = 10000;

const { data } = checkPerformanceFn(() => generateData(stringLength, elementLength), 'data');

export default new Vuex.Store({
  state: {
    data,
    tree: {},
  },
  mutations: {
    GENERATE_TREE(state, payload) {
      state.tree = payload;
    },
  },
  actions: {
    async ACTION_GENERATE_TREE({ state, commit }) {
      const tree = generateTree(state.data);
      commit('GENERATE_TREE', tree);
    },
  },
  modules: {
  },
});
