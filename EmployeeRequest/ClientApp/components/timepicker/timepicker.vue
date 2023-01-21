<template>
    <div class="main" dir="ltr">
        <div class="input-wrapper">
            <button type="button"
                    ref="togglePicker"
                    @click="togglePicker"
                    class="k-button toggle-picker-button">
                <i class="fa fa-clock"></i>
            </button>
            <input ref="input" class="k-textbox" v-model="text" @keydown="keydown" type="tel">
        </div>
        <div ref="timepicker" class="timepicker k-content" v-show="pickerShown">
            <div ref="hour" class="target hour" @wheel.prevent="wheel" @touchstart="lastHourTouchY = $event.touches[0].clientY; touchMoveCounter = 4;" 
                 @touchmove.prevent="touchMove" @touchend="touchEnd">
                <div>22</div>
                <div>23</div>
                <div>00</div>
                <div>01</div>
                <div>02</div>
            </div>
            <div ref="minute" class="target minute" @wheel.prevent="wheel" @touchstart="lastMinuteTouchY = $event.touches[0].clientY; touchMoveCounter = 4;" 
                @touchmove.prevent="touchMove" @touchend="touchEnd">
                <div>58</div>
                <div>59</div>
                <div>00</div>
                <div>01</div>
                <div>02</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./timepicker.ts">
</script>

<style scoped>
    .main{
        position: relative;
        --cell-height: 50px;
        --cell-font-size: 18px;
    }

    .input-wrapper {
        width: 100%;
        display: flex;
    }

    .input-wrapper input{
        flex-grow: 1;
        width: 100px;
    }

    .timepicker {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 150px;
        grid-gap: .1rem;
        position: absolute;
        top: 30px;
        left: 0;
        z-index: 1;
        padding: .1rem;
        box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
    }

        .timepicker > * {
            font-size: var(--cell-font-size);
            height: calc((5 * var(--cell-height)) - (2 * 20px) - (2 * 10px));
            overflow-y: auto;
            background-image: linear-gradient(to bottom, transparent 37%, lightgray 37.5%, transparent 38%, transparent 61%, lightgray 61.5%, transparent 62%);
            -moz-user-select: none;
            -webkit-user-select: none;
            user-select: none;
        }

            .timepicker > * > *:first-child, .timepicker > * > *:last-child {
                height: calc(var(--cell-height) - 20px);
                font-size: calc(var(--cell-font-size) - 5px);
                transform: rotateX(-337.5deg);
                opacity: .5;
            }

            .timepicker > * > *:nth-child(2), .timepicker > * > *:nth-child(4) {
                height: calc(var(--cell-height) - 10px);
                font-size: calc(var(--cell-font-size) - 2px);
                opacity: .7;
            }

            .timepicker > * > * {
                height: var(--cell-height);
                box-sizing: border-box;
                letter-spacing: .1rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

        .timepicker ::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
</style>
