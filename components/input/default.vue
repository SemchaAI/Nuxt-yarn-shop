<script setup lang="ts">
import { defineProps, defineOptions } from 'vue';
defineOptions({
  inheritAttrs: false,
});

interface TProps {
  modelValue?: string | number;
  error?: string | null | 'never';
  myType?: 'text' | 'number' | 'email' | 'file';
}

const props = withDefaults(defineProps<TProps>(), {
  modelValue: '',
  error: null,
  myType: 'text',
});

const emit = defineEmits(['update:modelValue', 'blur']);

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit('update:modelValue', target.value);
  }
};

const classes = [props.myType];
</script>

<template>
  <div>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="inputHandler"
      @blur="$emit('blur')"
      :class="classes"
      :id="$attrs.id as string"
    />
    <div v-if="error !== 'never'">
      <div
        v-if="error"
        class="error"
      >
        {{ error }}
      </div>
      <div
        v-else
        class="error"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text {
  height: 50px;
  width: 100%;
  padding: 0 20px;

  outline: none;

  border: 1px solid var(--on-surface-medium-accent);
  border-radius: 3.5px;

  color: var(--on-background);
  background-color: var(--background);

  @include body1Typo;
  @include transition;
  &:hover,
  &:focus {
    border: 1px solid var(--primary);
    outline: none;
  }
  &:focus + .icon {
    fill: var(--secondary);
  }
}
.file {
  display: none;
}
.error {
  padding-left: 5px;
  display: flex;
  align-items: center;
  color: var(--error);
  height: 24px;
}
</style>
