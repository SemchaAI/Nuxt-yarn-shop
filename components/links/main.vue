<script setup lang="ts">
import type { ILink } from '@/components/links/MainLink.interface';
const props = defineProps<ILink>();
const { to } = props;
const classes = ['link'];
</script>
<template>
  <NuxtLink
    :class="classes"
    :to="to"
  >
    <slot></slot>
  </NuxtLink>
</template>

<style scoped lang="scss">
.link {
  text-decoration: none;
  @include body1Typo;
  @include transition;

  color: var(--primary);
  &.router-link-active {
    color: var(--secondary);
  }
  &:hover,
  &:focus {
    color: var(--primary-focused);
  }
}
</style>
