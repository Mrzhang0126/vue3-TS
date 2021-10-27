import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { setupStore } from './store';

import './assets/css/index.less';

import globalApp from './global';

const app = createApp(App);
app.use(globalApp);
app.use(store);
setupStore();
app.use(router);
app.mount('#app');

const selectSort = (aa: number[]) => {
  const a = [...aa];
  let min = 0;
  for (let i = 0; i < a.length - 1; i++) {
    min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) {
        min = j;
      }
    }

    if (i !== min) {
      [a[i], a[min]] = [a[min], a[i]];
    }
  }

  return a;
};

const shellSort = (arr: number[]) => {
  const a = [...arr],
    len = a.length;
  let gap = len >>> 1;

  while (gap >= 1) {
    for (let i = gap; i < len; i++) {
      let j = i;
      const temp = a[i];

      while (j > gap - 1 && a[j - gap] > temp) {
        a[j] = a[j - gap];
        j -= gap;
      }
      a[j] = temp;
    }
    gap = gap >>> 1;
  }
  return a;
};

// const a = [1, 2, 5, 99, 100, 5, 45, 10, 35, 2];
// console.log(selectSort(a));
// console.log(shellSort(a));
