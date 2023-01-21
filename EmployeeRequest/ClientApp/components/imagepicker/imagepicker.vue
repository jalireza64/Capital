<template>
    <div class="main">
        <input ref="fileInput" type="file" accept="image/*" @change="imageChange" style="display:none" capture="environment" />
        <img :src="dataUrl" alt="عکس" @click="clickFileInput">
        <button type="button" class="clear" v-show="hasImage" @click="clearImage">
            <i class="bx bx-x"></i>
        </button>
    </div>
</template>

<script lang="ts" src="./imagepicker.ts">
</script>

<style scoped>
.main {
  position: relative;
}

img {
  width: 40%;
  height: 40%;
  border-radius: var(--border-radius);
  box-sizing: border-box;
  cursor: pointer;
}

    @media(max-width: 800px) {
        img {
            width: 100%;
            height: 100%;
            border-radius: var(--border-radius);
            box-sizing: border-box;
            cursor: pointer;
        }
    }

.clear {
  padding: 0.1rem;
  color: red;
  position: absolute;
  bottom: 12px;
  left: 5px;
  background: whitesmoke;
}

.clear:hover {
  background: red;
  color: white;
}

.clear i {
  margin-top: 1px;
}
</style>
