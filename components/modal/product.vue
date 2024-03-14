<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
// import { useForm, useFieldArray } from 'vee-validate';
// import { toTypedSchema } from '@vee-validate/yup';
// import vSelect from 'vue-select'

// import { storeToRefs } from 'pinia';

import { useProductsStore } from '@/stores/product';

import type { IType } from '@/models/IProduct';
// import InputComponent from '../Input/InputComponent.vue';
// import MainBtn from '../buttons/MainBtn.vue';

import { AddProductValidation } from '@/utils/validationYup';

const productStore = useProductsStore();
const { state } = storeToRefs(productStore);

const { defineField, isSubmitting, meta, values, errors } = useForm({
  validationSchema: toTypedSchema(AddProductValidation),
  initialValues: {
    info: [{ title: '', description: '', number: 1 }],
  },
});

const { remove, push, fields } = useFieldArray('info');
const {
  remove: removeThumbnail,
  push: pushThumbnail,
  fields: thumbnails,
} = useFieldArray('thumbnails');

const [name, nameAttrs] = defineField('name');
const [description, descriptionAttrs] = defineField('description');
const [price, priceAttrs] = defineField('price');
const [cnt, cntAttrs] = defineField('cnt');
const [type, typeAttrs] = defineField('type');
const [file, fileAttrs] = defineField('file');

// const brands = state.value.brands
let types = ref<IType[]>([]);
const selectFile = (e: any) => {
  file.value = e.target.files[0];
};
const selectFileThumbnail = (e: Event, index: number) => {
  const target = e.target as HTMLInputElement;
  console.log(thumbnails);
  console.log(index);
  console.log(thumbnails.value[index].value);
  if (target.files !== null) {
    thumbnails.value[index].value = target.files[0];
  }
};
const addDevice = () => {
  // console.log(file, name, description, price, cnt, fields, type)
  let data = new FormData();
  data.append('title', String(name.value));
  data.append('description', String(description.value));
  data.append('price', String(price.value));
  data.append('cnt', String(cnt.value));
  data.append('img', file.value as File);
  //
  thumbnails.value.map((el, index) =>
    data.append(`thumbnail${index}`, el.value as File)
  );
  //

  data.append('info', JSON.stringify(fields.value));
  data.append('typeId', type.value);

  console.log(
    name.value,
    description.value,
    price.value,
    cnt.value,
    type.value,
    fields.value
  );
  productStore.createProduct(data);
};

onMounted(async () => {
  await productStore.getTypes();
  types.value = state.value.types;
});

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1>Добавить тип</h1>
    <form>
      <div>
        <div for="type">Выберите Тип:</div>
        <SelectDefault
          v-model="type"
          v-bind="typeAttrs"
          id="type"
          name="type"
          label="name"
          placeholder="Выберите тип"
          :customOptions="types"
        >
          <!-- <option
            v-for="data in types"
            class="option"
            :value="data._id"
            :key="data._id"
          >
            {{ data.name }}
          </option> -->
        </SelectDefault>
      </div>
      <div class="field">
        <div><label for="title">Название продукта:</label></div>
        <InputDefault
          v-model="name"
          v-bind="nameAttrs"
          :error="errors.name"
          placeholder="Название"
          id="title"
        />
      </div>
      <div class="field">
        <div><label for="price">Цена продукта:</label></div>
        <InputDefault
          v-model="price"
          v-bind="priceAttrs"
          :error="errors.price"
          type="number"
          placeholder="Введите цену"
          id="price"
          required
        />
      </div>
      <div class="field">
        <div><label for="cnt">Задай кол-во на складе:</label></div>
        <InputDefault
          v-model="cnt"
          v-bind="cntAttrs"
          :error="errors.cnt"
          type="number"
          placeholder="кол-во 1,2,3"
          id="cnt"
          required
        />
      </div>
      <div class="field">
        <div><label for="description">Краткое описание:</label></div>
        <InputDefault
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
          placeholder="описание"
          id="description"
          required
        />
      </div>
      <div class="field">
        <div>
          <label
            class="fakeBtn"
            for="img"
            >Главное изображение:</label
          >
        </div>
        <!-- <input @change="selectFile" v-bind="fileAttrs" type="file" id="img" required />-->
        <InputDefault
          @change="selectFile"
          v-bind="fileAttrs"
          :error="errors.file"
          type="file"
          myType="file"
          id="img"
          required
        />
      </div>
      <div class="infoContainer">
        <ButtonsMainBtn
          version="contain"
          @click="pushThumbnail('')"
          >Добавить новое изображение</ButtonsMainBtn
        >
        <div
          v-auto-animate
          class="fieldsContainer"
          v-if="thumbnails.length > 0"
        >
          <div
            :key="thumbnail.key"
            v-for="(thumbnail, idx) in thumbnails"
            class="row"
          >
            <div>
              <label
                class="fakeBtn"
                :for="thumbnail.key + 'img'"
                >Доп Изображение</label
              >
            </div>
            <InputDefault
              @change="selectFileThumbnail($event, idx)"
              v-bind="thumbnail"
              type="file"
              myType="file"
              required
              :id="thumbnail.key + 'img'"
            />
            <ButtonsMainBtn
              version="contain"
              @click="removeThumbnail(idx)"
              >Удалить</ButtonsMainBtn
            >
          </div>
          <!-- <button @click.prevent="remove(idx)">Удалить характеристику</button> -->
        </div>
      </div>
      <div class="infoContainer">
        <ButtonsMainBtn
          version="contain"
          @click="push('')"
          >Добавить новое свойство</ButtonsMainBtn
        >
        <div
          v-auto-animate
          class="fieldsContainer"
          v-if="fields.length > 0"
        >
          <div
            :key="field.key"
            v-for="(field, idx) in fields"
            class="row"
          >
            <InputDefault
              v-model="field.title"
              error="never"
              placeholder="название свойства"
              required
            />
            <InputDefault
              v-model="field.description"
              error="never"
              placeholder="описание свойства"
              required
            />
            <ButtonsMainBtn
              version="contain"
              @click="remove(idx)"
              >Удалить</ButtonsMainBtn
            >
          </div>
          <!-- <button @click.prevent="remove(idx)">Удалить характеристику</button> -->
        </div>
      </div>
    </form>
    <div class="row">
      <!--       :disabled="!meta.valid" -->
      <ButtonsMainBtn
        version="contain"
        type="submit"
        @click.prevent="addDevice"
        >Добавить</ButtonsMainBtn
      >
      <ButtonsMainBtn @click.prevent="emit('confirm')">Закрыть</ButtonsMainBtn>
    </div>
  </VueFinalModal>
</template>

<style scoped lang="scss">
.infoContainer {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fieldsContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.field {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  gap: 10px;
}

.fakeBtn {
  display: block;
  width: fit-content;
  padding: 10px 20px;
  color: var(--primary);
  background-color: var(--on-primary);
  cursor: pointer;
  border-radius: 4px;

  @include transition;

  &:hover,
  &:focus {
    color: var(--tertiary);
    background-color: var(--primary);
  }
}
</style>
