<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const isLogin = computed(() => router.currentRoute.value.name === 'login');
const dynamicLabel = computed(() => (isLogin.value ? 'Имя/Email' : 'Имя'));
const Title = computed(() => (isLogin.value ? 'Вход' : 'Регистрация'));

const email = ref('');
const password = ref('');
const nickname = ref('');

const user = useUserStore();

const submitHandler = (email: string, password: string, nickname: string) => {
  console.log(email, password, nickname);
  if (isLogin.value) {
    user.login(nickname, password);
  } else {
    //  user.registration(email, password, nickname);
  }
};
</script>

<template>
  <section class="login">
    <div class="wrapper">
      <div class="loginContainer">
        <h1 class="loginTitle">{{ Title }}</h1>
        <form class="loginForm">
          <div
            v-if="!isLogin"
            class="field"
          >
            <div>
              <label
                class="label"
                for="email"
                >Почта:</label
              >
            </div>
            <input
              class="input"
              v-model="email"
              placeholder="user@mail.test"
              type="email"
              id="email"
              required
            />
          </div>
          <div class="field">
            <div>
              <label
                class="label"
                for="name"
                >{{ dynamicLabel }}:</label
              >
            </div>
            <input
              class="input"
              v-model="nickname"
              type="text"
              id="name"
              required
            />
          </div>
          <div class="field">
            <div><label for="password">Пароль:</label></div>
            <input
              class="input"
              v-model="password"
              placeholder="example1234"
              type="password"
              id="password"
              required
            />
          </div>
          <div class="formControls">
            <div
              class="linkBlock"
              v-if="isLogin"
            >
              Нет аккаунта?
              <NuxtLink
                class="link"
                to="register"
                >Зарегистрируйся</NuxtLink
              >
            </div>
            <div
              class="linkBlock"
              v-else
            >
              Есть аккаунт?
              <NuxtLink
                class="link"
                to="login"
                >Зарегистрируйся</NuxtLink
              >
            </div>
            <button
              version="contain"
              @click.prevent="submitHandler(email, password, nickname)"
              type="submit"
            >
              Вход/Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.login {
  margin-top: 40px;
  color: var(--tertiary);
}
.loginContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.loginTitle {
  margin: 0 auto;
  @include headline3Typo;
  color: var(--primary);
}
.loginForm {
  margin: 0 auto;
  min-width: 500px;
  display: flex;
  flex-direction: column;
}
.formControls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field {
}
.label {
}
.input {
}
.linkBlock {
}
.link {
}
</style>
