<template>
    <div>
        <p>Properties</p>
        <ul>
            <li>prefix : {{ prefix }}</li>
            <li>imagePath : {{ imagePath }}</li>
            <li>imageUrl : {{ imageUrl }}</li>
        </ul>

        <img :src="imageUrl" alt="Image is missing" srcset="">
    </div>
    
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  prefix: {type: String, default: 'https://cdn.pixabay.com/photo'},
  imagePath: { type: String, required: true },
})

const images = ref(
    [
        'https://cdn.pixabay.com/photo/2026/02/04/10/28/creativecanvasshop-brazil-10104348_1280.png',
        'https://cdn.pixabay.com/photo/2026/01/14/02/44/happy-valentines-day-10067260_1280.png',
        'https://cdn.pixabay.com/photo/2026/02/01/17/09/kei_therapeutic_art-lovebirds-10099776_1280.jpg',
        'https://cdn.pixabay.com/photo/2025/12/08/17/28/snow-10002573_1280.png',
        'https://cdn.pixabay.com/photo/2022/09/25/09/58/houses-7477950_1280.jpg',
        'https://cdn.pixabay.com/photo/2026/01/13/13/46/island-10066325_1280.jpg',
    ]
)

const imageUrl = computed(() => props.prefix + props.imagePath);
</script>