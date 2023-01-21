<template>
    <transition name="fade">
        <div class="main k-content" v-show="shown" @focusout="focusOut" tabindex="-1">
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts" src="./contextmenu.ts">
</script>

<style scoped>
    .main {
        position: fixed;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        border: inherit;
        box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
        z-index: 4;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 200ms;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
