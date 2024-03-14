<script lang="ts" setup></script>

<template>
  <section class="error">
    <div class="wrapper">
      <div class="errorContainer">
        <h1>Error 404</h1>
        <div>Page not found</div>
        <RouterLink class="link" :to="{ name: 'home' }">To home</RouterLink>
      </div>
    </div>
  </section>
</template>

<style>
.errorContainer {
  margin: auto;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: var(--white);
}
.link {
  color: var(--white);
}
</style>
