<template>
    <div class="column is-3-desktop is-4-tablet is-12-mobile">
        <router-link v-bind:to="{name:'episodedetails',params:{id:e.episodeId}}">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-16by9">
                        <img v-bind:src="e.imgURL" alt="Image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content has-text-centered">
                        <p class="title is-4 mb-0">{{ e.title }}</p>
                        <p class="is-6">{{ e.number }}</p>
                    </div>
                </div>
            </div>
        </router-link>
    </div>

</template>

<script>
export default {
    name: 'EpisodeComponent',
    props: {
        e: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>

</style>
