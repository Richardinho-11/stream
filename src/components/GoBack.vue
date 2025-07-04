<template>
  <span class="go-back">
    <button @click="$router.push('../film')"> GO BACK </button>
  </span>
</template>
<style scoped>
.go-back button {
  background-color: #242424;
  color: #00aaff;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.go-back button:hover {
  background-color: #3a3a3a;
  transform: translateY(-1px);
}

.go-back button:active {
  background-color: #1a1a1a;
  transform: scale(0.98);
}
</style>