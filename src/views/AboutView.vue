<template>
    <div>
        <div class="section">
            <h1 class="title is-1 has-text-centered">About</h1>
        </div>
    </div>
    <div class="section">
        <ul>
            <li>
                <b>this.$store.state.token:</b>
                {{this.$store.state.token }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AboutView',
};
</script>

<style scoped>

</style>
