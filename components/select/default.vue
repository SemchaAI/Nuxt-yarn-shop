<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});
interface IProp {
  _id: string;
  name: string;
}
interface IProps {
  customOptions: IProp[];
  modelValue: string;
}
withDefaults(defineProps<IProps>(), {
  customOptions: () => [
    {
      _id: '',
      name: '',
    },
  ],
  modelValue: '',
});
const emit = defineEmits(['update:modelValue']);
const selectHandler = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  if (target.value) {
    emit('update:modelValue', target.value);
  }
};
</script>
<template>
  <div class="customSelect">
    <select
      v-bind="$attrs"
      :value="modelValue"
      @change="selectHandler"
    >
      <!-- {{
        console.log(customOptions)
      }} -->
      <option
        v-for="data in customOptions"
        class="option"
        :value="data._id"
        :key="data._id"
      >
        {{ data.name }}
      </option>
    </select>
    <IconsChevronDown class="icon" />
  </div>
</template>

<style lang="scss" scoped>
.customSelect {
  min-width: 350px;
  position: relative;
  border: 1px solid var(--background-soft);
  @include transition;

  &:hover,
  &:focus {
    border: 1px solid var(--primary);
  }
}

select {
  appearance: none;
  /*  safari  */
  -webkit-appearance: none;
  /*  other styles for aesthetics */
  width: 100%;

  @include body1Typo;
  padding: 10px 20px;
  background-color: var(--background);
  border: 1px solid var(--background-soft);
  border-radius: 3.5px;
  color: var(--primary);
  cursor: pointer;
  outline: none;
}

.icon {
  position: absolute;
  right: 1rem;
  top: calc(50% - 12px);
  pointer-events: none;
  fill: var(--primary);
}
</style>
