<template>
  <section class="film-layout" v-if="film">
    <div class="film-grid">
      <img
        class="film-poster"
        :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
        :alt="film.title"
      />

      <div class="film-info">
        <h1>{{ film.title }}</h1>
        <p class="tagline" v-if="film.tagline">{{ film.tagline }}</p>
        <p><strong>🗓 Prima messa in onda:</strong> {{ film.release_date }}</p>
        <p>
          <strong>Valutazione:</strong>
          <span v-for="n in 5" :key="n">
            {{ n <= starRating ? '⭐' : '☆' }}
          </span>
        </p>
        <p><strong>🎞️ Trama:</strong> {{ film.overview }}</p>
        <GoBack />
      </div>
    </div>
  </section>
</template>

<script>
import GoBack from './components/GoBack.vue';

export default {
  components: { GoBack },
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      film: null
    };
  },
  computed: {
    starRating() {
      return this.film ? Math.round(this.film.vote_average / 2) : 0;
    }
  },
  mounted() {
    fetch(`https://api.themoviedb.org/3/movie/${this.id}?api_key=YOUR_API_KEY&language=it-IT`, {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWE5ZGJlYTZiOGU2YjFlNGU4ODA0NDQ5ZTRhOWZlOCIsIm5iZiI6MTc0ODUwODY1OC4xMiwic3ViIjoiNjgzODFmZjIzNTM3MDEyYTIyNDE1MzU3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9l_Jen8ig49W-KiSG9jSFehs2koWHfAyv92UY6swCTI'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.film = data;
      })
      .catch(err => console.error('Errore nel caricamento del film:', err));
  }
};
</script>

<style scoped>
.film-layout {
  padding: 40px 20px;
  background-color: #1a1a1a;
  color: #f0f0f0;
  min-height: 50vh;
}

.film-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  align-items: start;
}

.film-poster {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.film-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.film-info h1 {
  font-size: 2.2rem;
  margin-bottom: 8px;
}

.tagline {
  font-style: italic;
  color: #cccccc;
}

@media (max-width: 768px) {
  .film-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .film-info {
    align-items: center;
  }

  .film-info h1 {
    font-size: 1.8rem;
  }
}
</style>