<template>
    <div dir="ltr">
        <span v-show="sign == -1">-</span>
        <input ref="input" class="k-textbox" :class="{minus : sign == -1}" @keydown="keydown" type="tel" @blur="blur">
    </div>
</template>

<script lang="ts" src="./timeinput.ts">
</script>

<style scoped>
    div{
        display: flex;
        align-items: baseline;
    }

    span{
        flex: 0 0 1rem;
        text-align: center;
        z-index: 1;
        padding-left: .1rem;
    }

    input{
        flex: 1 1;
    }

    .minus {
        margin-left: -1.1rem;
        padding-left: .5rem;
    }
</style>
