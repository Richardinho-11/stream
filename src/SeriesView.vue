<template>
  <div>
    <SearchBar @results="handleSearch" />

    <ul class="tv-list">
      <li v-for="item in tvs" :key="item.id" class="tv-card">
        <router-link :to="`/serie/${item.id}`" class="link-style">
          <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" :alt="item.name" />
          <div>
            <h2>{{ item.name }}</h2>
            <p><strong>Prima messa in onda:</strong> {{ item.first_air_date }}</p>
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
    <div v-if="isLoading" class="loading">Caricamento serie...</div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';

export default {
  components: { SearchBar },
  data() {
    return {
      tvs: [],
      currentPage: 1,
      observer: null,
      isLoading: false,
      isSearching: false
    };
  },
  mounted() {
    this.fetchTvs();

    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.isLoading && !this.isSearching) {
        this.loadMore();
      }
    });

    this.observer.observe(this.$refs.scrollTrigger);
  },
  methods: {
    fetchTvs() {
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/tv/popular?language=it-IT&page=${this.currentPage}`;
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWE5ZGJlYTZiOGU2YjFlNGU4ODA0NDQ5ZTRhOWZlOCIsIm5iZiI6MTc0ODUwODY1OC4xMiwic3ViIjoiNjgzODFmZjIzNTM3MDEyYTIyNDE1MzU3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9l_Jen8ig49W-KiSG9jSFehs2koWHfAyv92UY6swCTI'
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          this.tvs = [...this.tvs, ...data.results];
          this.currentPage += 1;
          this.isLoading = false;
        })
        .catch(err => {
          console.error('Errore nel caricamento delle serie:', err);
          this.isLoading = false;
        });
    },
    loadMore() {
      this.fetchTvs();
    },
    handleSearch(results) {
      this.tvs = results;
      this.isSearching = true;
    }
  }
};
</script>

<style scoped>

.tv-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tv-card {
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.tv-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.tv-card div {
  padding: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.tv-card h2 {
  font-size: 1rem;
  margin: 8px 0 4px;
  color: #222;
}

.tv-card p {
  margin: 4px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 600px) {
  .tv-list {
    grid-template-columns: 1fr;
    padding: 0 12px;
  }

  .tv-card div {
    padding: 10px;
    font-size: 0.9rem;
  }

  .tv-card h2 {
    font-size: 0.95rem;
  }
}
</style>