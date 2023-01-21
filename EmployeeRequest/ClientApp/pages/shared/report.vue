<template>
    <div id="viewer-content"></div>
</template>

<script lang="ts" src="./report.ts"></script>

<style scoped>
    #viewer-content {
        height: 100%;
        direction: ltr;
    }
</style>

<style>
    *[style*="z-index: 9999999999"] {
        display: none;
    }

    .stiJsViewerClearAllStyles{
        z-index:999999999999
    }
</style>
