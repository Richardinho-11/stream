<template>
  <div>
    <SearchBar @results="handleSearch" />

    <ul class="film-list">
      <li
        v-for="item in films"
        :key="item.id"
        class="film-card"
      >
        <router-link :to="`/film/${item.id}`" class="link-style">
          <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" :alt="item.original_title" />
          <div>
            <h2>{{ item.original_title }}</h2>
            <p><strong>Uscita:</strong> {{ item.release_date }}</p>
            <p>
              <strong>Valutazione:</strong>
              <span v-for="n in 5" :key="n">
                {{ n <= Math.round(item.vote_average / 2) ? '⭐' : '☆' }}
              </span>
            </p>
            <p><strong>Trama:</strong> {{ item.overview }}</p>
          </div>
        </router-link>
      </li>
    </ul>

    <div ref="scrollTrigger" class="scroll-trigger"></div>
    <div v-if="isLoading" class="loading">Caricamento...</div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';

export default {
  components: { SearchBar },
  data() {
    return {
      films: [],
      currentPage: 1,
      observer: null,
      isLoading: false,
      isSearching: false
    };
  },
  mounted() {
    this.fetchFilms();

    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.isLoading && !this.isSearching) {
        this.loadMore();
      }
    });

    this.observer.observe(this.$refs.scrollTrigger);
  },
  methods: {
    fetchFilms() {
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/movie/popular?language=it-IT&page=${this.currentPage}`;
      const options = {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWE5ZGJlYTZiOGU2YjFlNGU4ODA0NDQ5ZTRhOWZlOCIsIm5iZiI6MTc0ODUwODY1OC4xMiwic3ViIjoiNjgzODFmZjIzNTM3MDEyYTIyNDE1MzU3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9l_Jen8ig49W-KiSG9jSFehs2koWHfAyv92UY6swCTI'
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          this.films = [...this.films, ...data.results];
          this.currentPage += 1;
          this.isLoading = false;
        })
        .catch(err => {
          console.error(err);
          this.isLoading = false;
        });
    },
    loadMore() {
      this.fetchFilms();
    },
    handleSearch(results) {
      this.films = results;
      this.isSearching = true;
    }
  }
};
</script>

<style scoped>
.film-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.film-card {
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.film-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.film-card div {
  padding: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.film-card h2 {
  font-size: 1rem;
  margin: 8px 0 4px;
  color: #222;
}

.film-card p {
  margin: 4px 0;
}
.film-card p,
.tv-card p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 600px) {
  .film-list {
    grid-template-columns: 1fr;
    padding: 0 12px;
  }

  .film-card div {
    padding: 10px;
    font-size: 0.9rem;
  }

  .film-card h2 {
    font-size: 0.95rem;
  }
}
</style>