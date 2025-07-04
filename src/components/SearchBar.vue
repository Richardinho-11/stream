<template>
  <div class="search-bar">
    <input
      v-model="query"
      @keyup.enter="newSearch"
      type="text"
      placeholder="Cerca un film o una serie..."
    />
    <button @click="newSearch">Cerca</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      currentPage: 1,
      allResults: [],
      isSearching: false
    };
  },
  methods: {
    newSearch() {
      if (!this.query.trim()) return;

      this.currentPage = 1;
      this.allResults = [];
      this.isSearching = true;
      this.fetchPage();
    },
    fetchPage() {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(this.query)}&language=it-IT&page=${this.currentPage}`;
      fetch(url, {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWE5ZGJlYTZiOGU2YjFlNGU4ODA0NDQ5ZTRhOWZlOCIsIm5iZiI6MTc0ODUwODY1OC4xMiwic3ViIjoiNjgzODFmZjIzNTM3MDEyYTIyNDE1MzU3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9l_Jen8ig49W-KiSG9jSFehs2koWHfAyv92UY6swCTI'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.allResults = [...this.allResults, ...data.results];
          this.$emit('results', this.allResults);
          this.isSearching = false;
        })
        .catch(err => {
          console.error('Errore nella ricerca:', err);
          this.isSearching = false;
        });
    },
    loadMore() {
      if (this.isSearching || !this.query.trim()) return;
      this.currentPage += 1;
      this.isSearching = true;
      this.fetchPage();
    }
  }
};
</script>
<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.search-bar input {
  padding: 14px 20px;
  font-size: 1.1rem;
  border-radius: 12px;
  border: 2px solid #00aaff;
  width: 360px;
  max-width: 90%;
  transition: border-color 0.3s ease;
  outline: none;
}

.search-bar input:focus {
  border-color: #008ed4;
  box-shadow: 0 0 8px rgba(0, 174, 255, 0.3);
}

.search-bar button {
  padding: 14px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  background-color: #00aaff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.search-bar button:hover {
  background-color: #008ed4;
  transform: scale(1.03);
}
</style>