<script setup lang="ts">
const year = new Date().getFullYear();
</script>
<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footerContainer">
        <p class="footerText">© {{ year }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 40px;
  width: 100%;
  background-color: var(--background-soft);
}
.footerContainer {
  height: 80px;
  display: flex;
  align-items: center;
}
.footerText {
  width: 100%;

  @include body2Typo;
  text-align: end;
}
</style>
