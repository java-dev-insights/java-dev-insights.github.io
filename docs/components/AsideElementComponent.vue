<template>
    <small>{{ text }}</small>
    <br/>
</template>

<script setup>
    import { ref, computed, defineProps } from 'vue';

    const props = defineProps({
        text: {type: String, default: 'default text aside-bottom'},
    });

    console.log('Default Layout slots')
</script>