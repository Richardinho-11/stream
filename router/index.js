import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../src/HomeView.vue';
import FilmsView from '../src/FilmsView.vue';
import SeriesView from '../src/SeriesView.vue';
import DetailsFilms from '../src/DetailsFilms.vue';
import DetailsSeries from '../src/DetailsSeries.vue';


const routes = [
  {path: '/film',component: FilmsView},
  {path: '/serie',component: SeriesView},
  {path: '/film/:id',name: 'film.show',component: DetailsFilms,props: true},
  {path: '/serie/:id',name: 'serie.show',component: DetailsSeries,props: true}


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
