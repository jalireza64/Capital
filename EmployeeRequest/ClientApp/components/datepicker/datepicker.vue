<template>
  <div style='position:relative'>
    <div class="main">
      <input
        ref='mainInput'
        @click='onInputClick'
        :value='selectedValue'
        @change='onValueChanged($event.target.value)'
        @keydown="onKeyDown"
        class='date-input k-textbox'
        dir="ltr"
        pattern="^[0-9]{4}/[0-9]{2}/[0-9]{2}$"
        type="tel"
        @blur="onSelectedValueChanged"
      />
      <!-- <button type="button" @click='clear' v-show='selectedValue' class="clear-button">
        <i class='bx bx-x'></i>
      </button> -->
      <button
        type="button"
        ref='togglePickerButton'
        @click='onTogglePickerButtonClick'
        class="k-button toggle-picker-button"
      >
        <i class='fa fa-calendar'></i>
      </button>
    </div>
    <div
      ref="picker"
      class='picker'
      :style='{display:showPicker?"block":"none", top:"30px", left:"0"}'
    >
      <table
        ref='mainTable'
        class='main-table k-content'
        tabindex="-1"
        @keydown="closePicker"
      >
        <thead>
          <tr class="controls">
            <th>
              <button @click='changeMonth($event, -1)'
                class="k-button">
                <i class='fa fa-chevron-right'></i>
              </button>
            </th>
            <th colspan="3">
              <sv-select
                :items='months'
                v-model='month'
                class="k-button"
              ></sv-select>
            </th>
            <th colspan="2">
              <sv-select
                :items='years'
                v-model='year'
                class="k-button"
              ></sv-select>
            </th>
            <th>
              <button @click='changeMonth($event, 1)'
                class="k-button">
                <i class='fa fa-chevron-left'></i>
              </button>
            </th>
          </tr>
          <tr>
            <th>ش</th>
            <th>ی</th>
            <th>د</th>
            <th>س</th>
            <th>چ</th>
            <th>پ</th>
            <th>ج</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for='(tableWeek, tableWeekIndex) in tableMonth'
            :key='tableWeekIndex'
          >
            <td
              v-for='(tableDay, tableDayIndex) in tableWeek'
              :key='tableDayIndex'
            >
              <button
                type="button"
                class="k-button"
                v-if="tableDay.toString().trim().length"
                @click='onDaySelection($event,tableDay)'
                :class="{'current-day': tableDay==todayDay && month==todayMonth && year ==todayYear, 'k-primary': day == tableDay}"
              > {{tableDay}} </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        class="go-to-today k-button k-primary"
        @click.prevent="year=todayYear; month=todayMonth; day=todayDay;"
      >امروز</button>
    </div>
  </div>
</template>

<script lang="ts" src="./datepicker.ts">
</script>

<style scoped>
.picker {
    position: absolute;
    z-index: 10;
    box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
}

.controls th .k-button {
    width: 100%;
    height: 30px;
}

.main-table {
  border-collapse: collapse;
}

.main-table a {
  text-decoration: none;
}

.main-table th,
.main-table td {
  height: 20px;
  text-align: center;
}

td:hover {
  color: lightskyblue;
}

td:active {
  color: blue;
}

.main-table a {
  color: inherit;
  display: block;
  width: 25px;
}

.main {
  display: flex;
  align-items: stretch;
}

.main > * {
  display: flex;
  overflow: hidden;
}

.date-input {
  flex-grow: 1;
  width: 100px;
}

.toggle-picker-button {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

th button {
  height: 100%;
}

td button {
  border: none;
  width: 100%;
}

.go-to-today {
  display: block;
  text-align: center;
  width: 100%;
}
</style>
