<template>
    <select ref='select' v-model="selectedValue">
        <option :value='item.value' v-for='(item, itemIndex) in items' :key='itemIndex'>{{item.title}}</option>
    </select>
</template>

<script lang="ts" src="./select.ts">
</script>

<style>
select {
  border: 1px var(--border-color) solid;
}
</style>
