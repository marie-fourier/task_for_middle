<template lang="pug">
  .home
    .container
      .cards-wrapper
        card(
          v-for="(item, index) in entities"
          :key="item.id"
          :entity="item"
          :liked="isLiked(item.id)"
          :image="entityImage(index)"
          @on-like="like"
        )
</template>
<script>
import Card from '@/components/card.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Card,
  },
  data() {
    return {
      images: [
        'https://themarketactivity.com/wp-content/uploads/2020/08/maxresdefault-2-12-1024x576.jpg',
        'https://i.pinimg.com/originals/d0/27/39/d027391c886eefd21065372f13aee167.jpg',
        'https://i.ytimg.com/vi/M96ereWMuHI/maxresdefault.jpg',
      ],
    };
  },
  methods: {
    ...mapActions(['fetchEntities', 'fetchLikes', 'like']),
    isLiked(entityId) {
      return this.likes.some((id) => id === entityId);
    },
    entityImage(index) {
      const size = this.images.length - 1;
      return this.images[index > size ? index % size : index];
    },
  },
  computed: {
    ...mapGetters(['entities', 'likes']),
  },
  mounted() {
    this.fetchEntities();
    this.fetchLikes();
  },
};
</script>
<style lang="scss" scoped>
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 1199.98px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 767.98px) {
    grid-template-columns: 1fr;;
  }
}
</style>
