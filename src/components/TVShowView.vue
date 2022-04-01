<template>
    <div class="column is-3-desktop is-4-tablet is-6-mobile">
        {{ tvshow.title }}
    </div>
</template>

<script>
export default {
    name: 'TVShowView',
    props: {
        tvshow: Object,
    },
};
</script>

<style scoped>

</style>
