<script setup lang="ts"></script>
<template>
  <div class="swiper">
    <div class="wrapper">
      <div class="swiperContainer">
        <Swiper
          :modules="[SwiperNavigation, SwiperPagination]"
          :navigation="{
            nextEl: `.swiper-next`,
            prevEl: `.swiper-prev`,
          }"
          :pagination="{
            el: '.pagination',
            clickable: true,
            bulletActiveClass: 'swiper-custom-bullet-active',
            bulletClass: 'swiper-custom-bullet',
          }"
          :loop="true"
          :slides-per-view="1"
          class="bannerSwiper"
        >
          <SwiperSlide>
            <LinksMain to="/">
              <!-- <NuxtPicture src="/Xiaomi_14_mi-desktop-T6ATY0.webp">
                <source
                  srcset="/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  media="(min-width: 479px)"
                />
                <source
                  srcset="/Xiaomi_14_mi-tablet-HW9MPO.webp"
                  media="(min-width: 768px)"
                />
                <source
                  srcset="/Xiaomi_14_mi-desktop-T6ATY0.webp"
                  media="(min-width: 1024px)"
                />
              </NuxtPicture> -->
              <picture
                ><source
                  media="(min-width: 1024px)"
                  srcset="/Xiaomi_14_mi-desktop-T6ATY0.webp" />
                <source
                  media="(min-width: 768px)"
                  srcset="/Xiaomi_14_mi-tablet-HW9MPO.webp" />
                <img
                  src="/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  width="1340"
                  height="560"
                  loading="lazy"
                  sizes="sm:100vw md:50vw lg:400px"
                  srcset="
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 640w,
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 384w,
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 400w
                  "
              /></picture>
            </LinksMain>
          </SwiperSlide>
          <SwiperSlide>
            <LinksMain to="/">
              <!-- <NuxtPicture src="/Xiaomi_14_mi-desktop-T6ATY0.webp">
                <source
                  srcset="/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  media="(min-width: 479px)"
                />
                <source
                  srcset="/Xiaomi_14_mi-tablet-HW9MPO.webp"
                  media="(min-width: 768px)"
                />
                <source
                  srcset="/Xiaomi_14_mi-desktop-T6ATY0.webp"
                  media="(min-width: 1024px)"
                />
              </NuxtPicture> -->
              <picture
                ><source
                  media="(min-width: 1024px)"
                  srcset="/Xiaomi_14_mi-desktop-T6ATY0.webp" />
                <source
                  media="(min-width: 768px)"
                  srcset="/Xiaomi_14_mi-tablet-HW9MPO.webp" />
                <img
                  src="/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  width="1340"
                  height="560"
                  loading="lazy"
                  sizes="sm:100vw md:50vw lg:400px"
                  srcset="
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 640w,
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 384w,
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 400w
                  "
              /></picture>
            </LinksMain>
          </SwiperSlide>
          <SwiperSlide>
            <LinksMain to="/">
              <!-- <NuxtPicture src="/Xiaomi_14_mi-desktop-T6ATY0.webp">
                <source
                  srcset="/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  media="(min-width: 479px)"
                />
                <source
                  srcset="/Xiaomi_14_mi-tablet-HW9MPO.webp"
                  media="(min-width: 768px)"
                />
                <source
                  srcset="/Xiaomi_14_mi-desktop-T6ATY0.webp"
                  media="(min-width: 1024px)"
                />
              </NuxtPicture> -->
              <picture
                ><source
                  media="(min-width: 1024px)"
                  srcset="/Xiaomi_14_mi-desktop-T6ATY0.webp" />
                <source
                  media="(min-width: 768px)"
                  srcset="/Xiaomi_14_mi-tablet-HW9MPO.webp" />
                <img
                  src="/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  width="1340"
                  height="560"
                  loading="lazy"
                  sizes="sm:100vw md:50vw lg:400px"
                  srcset="
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 640w,
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 384w,
                    /Xiaomi_14_mi-mobile-IXIYFW.webp 400w
                  "
              /></picture>
            </LinksMain>
          </SwiperSlide>
        </Swiper>
        <div class="pagination"></div>
        <button class="swiper-prev swiper-nav">
          <IconsChevronLeft class="chevron" />
        </button>
        <button class="swiper-next swiper-nav">
          <IconsChevronRight class="chevron" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiperContainer {
  margin: 10px 0;
  max-width: 1340px;
  position: relative;
}
// NAVIGATION
.swiper-nav {
  position: absolute;
  width: 40px;
  height: 40px;

  top: calc(50% - 20px);

  fill: var(--primary);

  @include transition;

  &:hover,
  &:focus {
    fill: var(--secondary);
  }
  &.swiper-nav-disabled {
    fill: var(--secondary);
  }
}
.swiper-prev {
  left: 0px;
  z-index: var(--bannerBtns);
}
.swiper-next {
  right: 0px;
  z-index: var(--bannerBtns);
}
.chevron {
}
.left {
}
.right {
}
// PAGINATION
.pagination {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  gap: 4px;
  z-index: var(--bannerBtns);

  width: 100%;
  position: absolute;
  bottom: 0;
}
.swiper-pagination-bullet2 {
  width: 8px;
  height: 8px;
  background-color: black;
  text-align: center;
  line-height: 10px;
  font-size: 10px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}
</style>
