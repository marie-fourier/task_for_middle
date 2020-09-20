<template lang="pug">
  a.card(
    :class="{ 'card--liked': liked }"
  )
    a.card__like(
      href="javascript:void(0)"
      @click.stop="$emit('on-like', entity.id)"
    ) 💛
    img.card__img(
      :src="image"
    )
    .card__body
      .card__title {{ entity.attributes.title }}
      .card__attributes
        .card__attribute
          span.card__attribute__name Количество комнат:
          span.card__attribute__value  {{ entity.attributes.rooms }}
        .card__attribute
          span.card__attribute__name Адрес:
          span.card__attribute__value  {{ address }}
        .card__attribute
          span.card__attribute__name Площадь:
          span.card__attribute__value  {{ entity.attributes.area }} {{ entity.attributes.unit }}
      .card__relationships
        .card__relationship Агент: {{ agent }}
</template>
<script>
export default {
  props: {
    entity: {
      type: Object,
      required: true,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
  computed: {
    address() {
      const addr = this.entity.attributes.address;
      return `${addr.city}, ${addr.street}, ${addr.house}, ${addr.room}`;
    },
    agent() {
      const agnt = this.entity.relationships.attributes;
      return `${agnt.first_name} ${agnt.middle_name} ${agnt.last_name}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  display: block;
  background-color: white;
  height: 400px;
  display: grid;
  grid-template-rows: 1fr 130px;
  transition: box-shadow .3s;
  position: relative;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0px 4px 7px 1px rgba(0,0,0,.2);
    &:not(.card--liked) .card__like {
      opacity: .5;
    }
  }

  &__like {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 36px;
    text-decoration: none;
    opacity: 0;
    transition: opacity .3s;
  }
  &--liked &__like {
    opacity: 1;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__body {
    padding: 10px;
  }

  &__title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__attributes {
    margin-bottom: 5px;
  }

  &__attribute {
    &__name {
      font-style: italic;
    }
  }
}
</style>
