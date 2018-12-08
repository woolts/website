<template>
  <div class="home">
    <div class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        alt="hero"
      >

      <h1>{{ data.heroText || $title || 'Hello' }}</h1>

      <p class="description">
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p>

    </div>

    <div
      class="actions"
      v-if="data.actionText && data.actionLink"
    >
      <NavLink
        class="action-button install-button"
        v-bind:item="{ text: 'Install', link: '/install' }"
      />
      <NavLink
        class="action-button"
        :item="actionLink"
      />
    </div>

    <div
      class="features-container"
      v-if="data.features && data.features.length"
    >
      <div
        class="features"
      >
        <div
          class="feature"
          v-for="(feature, index) in data.features"
          :key="index"
        >
          <h2>{{ feature.title }}</h2>
          <p
            v-for="(detail, detailIndex) in feature.details"
            :key="detailIndex"
          >
            {{ detail }}
          </p>
        </div>
      </div>
    </div>

    <div class="content-container">
      <Content custom/>
    </div>

    <div
      class="footer"
      v-if="data.footer"
    >
      {{ data.footer }}
    </div>
  </div>
</template>

<script>
import NavLink from './NavLink.vue'

export default {
  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.home
  padding $navbarHeight 0 0
  // max-width 960px
  margin 0px auto
  .hero
    display flex
    justify-content center
    align-items flex-end
    background-color #fae4e9
    padding 100px 0 50px 0
    text-align center
    img
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      margin 0 25px 0 0
      font-size 64px
      font-weight 400
      line-height 1
    .description
      margin 0
      max-width 35rem
      font-size 1.6rem
      line-height 1
  .actions
    display flex
    justify-content center
    align-items space-between
    // justify-content space-between
    background-color #bed9d4
    padding 50px 0
    text-align center
  .action-button
    display inline-block
    font-size 24px
    font-weight 300
    padding 12px 25px
    border-radius 2px
    border 2px solid transparent
    transition background-color .1s ease
    box-sizing border-box
    box-shadow 2px 2px 4px 0 rgba(0, 0, 0, 0.2)
    color #222222
    &:hover
      background-color lighten(#bed9d4, 20%)
  .install-button
    margin-right 25px
    border 2px solid #222222
  .features-container
    padding 50px 0
    background-color #f7ebc3
  .features
    margin 0 auto
    max-width 960px
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 45%
    max-width 45%
    h2
      font-size 2.1rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .content-container
    background-color #fbd5c2
    padding 50px 0
    .content.custom
      max-width 960px
      margin 0 auto
      div[class*="language"]
        background-color transparent
      pre
        margin 0
        padding 0
      code
        color #222
        .token.comment
          color #777
        .token.function, .token.keyword
          color #222
  .footer
    background-color #e7d5e1
    padding 2.5rem
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
