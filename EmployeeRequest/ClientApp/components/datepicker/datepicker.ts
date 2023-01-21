import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
import SvSelect from "../select/select.vue";
import { convertToPersianDate } from "../../assets/utilities";
@Component({
    components: {
        SvSelect
    }
})
export default class SvDatepicker extends Vue {
    @Prop()
    value!: string | null;
    @Prop()
    defaultToToday!: boolean;
    today = convertToPersianDate(new Date());
    todayYear = parseInt(this.today.substring(0, 4), 10);
    todayMonth = parseInt(this.today.substring(5, 7), 10);
    todayDay = parseInt(this.today.substring(8, 10), 10);
    showPicker = false;
    tempSelectionStart: number | null = 0;
    grgSumOfDays = Array(
        Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365),
        Array(0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366)
    );
    hshSumOfDays = Array(
        Array(0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 365),
        Array(0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 366)
    );
    twentyNineDays = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29
    ];
    days = new Array<number>();
    year: number | null = null;
    month: number | null = null;
    day: number | null = null;
    months = [
        { title: "فروردین", value: 1 },
        { title: "اردیبهشت", value: 2 },
        { title: "خرداد", value: 3 },
        { title: "تیر", value: 4 },
        { title: "مرداد", value: 5 },
        { title: "شهریور", value: 6 },
        { title: "مهر", value: 7 },
        { title: "آبان", value: 8 },
        { title: "آذر", value: 9 },
        { title: "دی", value: 10 },
        { title: "بهمن", value: 11 },
        { title: "اسفند", value: 12 }
    ];
    requireTogglePickerButtonFocus = false;
    requireFirstTdFocus = false;
    mounted() {
        const input = this.$refs.mainInput as HTMLInputElement;
        if (this.$attrs.required != null)
            input.setAttribute("required", "required");
        if (this.$attrs.id)
            input.id = this.$attrs.id;
        if (this.$attrs.autocomplete != null)
            input.setAttribute("autocomplete", this.$attrs.autocomplete);
        this.$el.id = this.$attrs.id + "-dropdown";
        this.$el.removeAttribute("required");
        let date = this.value;
        if (date)
            this.initCalendar(
                date//this.toShamsi(date.getFullYear(), date.getMonth() + 1, date.getDate())
            );
        else if (this.defaultToToday) this.initCalendar();
    }
    updated() {
        this.$refs.mainInput && (<HTMLInputElement>this.$refs.mainInput).setSelectionRange(
            this.tempSelectionStart || 0,
            this.tempSelectionStart || 0
        );
        if (this.requireTogglePickerButtonFocus) {
            const target = this.$refs.togglePickerButton as HTMLButtonElement;
            target && target.focus();
            this.requireTogglePickerButtonFocus = false;
        }
        if (this.requireFirstTdFocus) {
            const target = this.$el.querySelector("table button") as HTMLButtonElement;
            target && target.focus();
            this.requireFirstTdFocus = false;
        }
    }
    get years() {
        this.generateDays();
        const items = new Array<any>();
        if (this.year) {
            const year = parseInt(this.year.toString());
            for (let i = year - 5; i <= year + 5; i++) {
                items.push({ title: i.toString(), value: i });
            }
        }
        return items;
    }
    get tableMonth() {
        if (this.year && this.month) {
            let days = [];
            const firstDayOfWeek = this.hshDayOfWeek(this.year, this.month, 1);
            for (let i = 0; i < firstDayOfWeek; i++) {
                days.push(" ");
            }
            //@ts-ignore
            days = days.concat(this.days);
            let ret = [];
            for (let start = 0, end = 7; start < days.length; start = end, end += 7) {
                ret.push(days.slice(start, end));
            }
            while (ret[ret.length - 1].length < 7) ret[ret.length - 1].push(" ");
            return ret;
        }
    }
    get selectedValue() {
        if (!this.year && !this.month && !this.day) return null;
        const year = !this.year ? "____" : this.year.toString();
        const month = !this.month
            ? "__"
            : this.month.toString().length === 1
                ? `0${this.month.toString()}`
                : this.month.toString();
        const day = !this.day
            ? "__"
            : this.day.toString().length === 1
                ? `0${this.day.toString()}`
                : this.day.toString();
        return `${year}/${month}/${day}`;
    }
    @Watch("value")
    valueChange() {
        let date = this.value;
        if (date)
            this.initCalendar(
                date//this.toShamsi(date.getFullYear(), date.getMonth() + 1, date.getDate())
            );
        else if (this.defaultToToday) this.initCalendar();
        else if (this.year && this.month && this.day) {
            this.year = null;
            this.month = null;
            this.day = null;
        }
    }
    @Watch("showPicker")
    showPickerChange() {
        if (this.showPicker) {
            this.$nextTick(() => {
                const picker = this.$refs.picker as HTMLElement;
                if (picker.getBoundingClientRect().right > window.innerWidth) {
                    picker.style.left = "";
                    picker.style.right = "0";
                }
            });
        } else {
            this.onSelectedValueChanged();
        }
    }
    changeMonth(e: Event, change: number) {
        e.preventDefault();
        if (this.year && this.month) {
            let month = parseInt(this.month.toString()) + change;
            if (month === 13) {
                month = 1;
                this.year++;
            } else if (month === 0) {
                month = 12;
                this.year--;
            }
            this.month = month;
        }
    }
    clear(e: Event) {
        e.preventDefault();
        this.year = null;
        this.month = null;
        this.day = null;
    }
    onInputClick(e: Event) {
        this.tempSelectionStart = (<HTMLInputElement>e.target).selectionStart;
        this.showPicker = false;
    }
    onTogglePickerButtonClick(e: Event) {
        e.preventDefault();
        if (!this.year || !this.month || !this.day) this.initCalendar();
        const rect = this.$el.getElementsByClassName("date-input")[0];
        if (!this.showPicker) {
            //this.pickerTop = rect.clientTop + rect.clientHeight + "px";
            //this.pickerRgiht = rect.clientLeft - 1 + "px";
            this.showPicker = true;
        } else {
            this.showPicker = false;
        }
        this._registerDocumentClickListener();
        this.requireFirstTdFocus = true;
    }
    onKeyDown(e: KeyboardEvent) {
        this.showPicker = false;
        const allowedKeys = ["Tab", "ArrowRight", "ArrowLeft", "F5", "Home", "End"];
        if (allowedKeys.includes(e.key) || e.ctrlKey)
            return true;
        e.preventDefault();
        const val = (<HTMLInputElement>e.target).value;
        let ss = (<HTMLInputElement>e.target).selectionStart;
        if (e.key === "Backspace") {
            if (ss === 0 && (<HTMLInputElement>e.target).selectionEnd === 10) {
                this.year = null;
                this.month = null;
                this.day = null;
                this.tempSelectionStart = 0;
            } else if (ss && ss <= 5) {
                this.year = null;
                this.tempSelectionStart = 0;
            } else if (ss && ss <= 8) {
                this.month = null;
                this.tempSelectionStart = 5;
            } else {
                this.day = null;
                this.tempSelectionStart = 8;
            }
        } else if (!isNaN(parseInt(e.key))) {
            if (ss === 4 || ss === 7) ss++;
            if (ss != null && ss < 10) {
                switch (ss) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        let yearStr;
                        if (this.year) {
                            yearStr = this.year.toString().split("");
                            yearStr[ss] = e.key;
                            this.year = parseInt(yearStr.join(""));
                        } else {
                            this.year = parseInt(e.key + "300");
                        }
                        break;
                    case 5: {
                        let temp = parseInt(
                            e.key + (val[ss + 1] !== "_" ? val[ss + 1] : "0")
                        );
                        this.month = temp > 0 ? (temp <= 12 ? temp : 12) : 1;
                        break;
                    }
                    case 6: {
                        let temp = parseInt((val[ss - 1] !== "_" ? val[ss - 1] : "0") + e.key);
                        this.month = temp > 0 ? (temp <= 12 ? temp : 12) : 1;
                        break;
                    }
                    case 8: {
                        let temp = parseInt(e.key + (val[ss + 1] !== "_" ? val[ss + 1] : "0"));
                        if (temp == 0) temp = 1;
                        this.day =
                            this.days.indexOf(temp) !== -1
                                ? temp
                                : this.days[this.days.length - 1];
                        break;
                    }
                    case 9: {
                        let temp = parseInt((val[ss - 1] !== "_" ? val[ss - 1] : "0") + e.key);
                        this.day =
                            this.days.indexOf(temp) !== -1
                                ? temp
                                : this.days[this.days.length - 1];
                        break;
                    }
                }
            }
            this.tempSelectionStart = (ss != null && ss + 1) || 0;
        }
        this.$forceUpdate();
    }
    closePicker(e: KeyboardEvent) {
        if (e.key == "Escape") {
            e.stopPropagation();
            this.showPicker = false;
            this.requireTogglePickerButtonFocus = true;
        }
    }
    onValueChanged(value: string) {
        try {
            const dateArr = value.split("/");
            const year = parseInt(dateArr[0]);
            const month = parseInt(dateArr[1]);
            const day = parseInt(dateArr[2]);
            if (!isNaN(year)) this.year = year;
            if (!isNaN(month)) this.month = month;
            if (!isNaN(day)) this.day = day;
        } catch { }
    }
    @Watch("month")
    onMonthChange() {
        this.generateDays();
    }
    @Watch("selectedValue")
    onSelectedValueChanged() {
        (<HTMLInputElement>this.$refs.mainInput).setCustomValidity("");
        if (!this.showPicker && document.activeElement != this.$refs.mainInput) {
            if (this.selectedValue && this.selectedValue.indexOf("_") === -1) {
                this.$emit("input", this.selectedValue);
            } else {
                this.$emit("input", "");
            }
        }
    }
    onDaySelection(e: Event, tableDay: number) {
        e.preventDefault();
        this.day = tableDay;
        this.showPicker = false;
        this.requireTogglePickerButtonFocus = true;
    }
    _registerDocumentClickListener() {
        document.addEventListener("click", this._documentClickListener);
    }
    _documentClickListener(e: MouseEvent) {
        if (
            !(<HTMLTableElement>this.$refs.mainTable).contains(<Node>e.target) &&
            !(<HTMLButtonElement>this.$refs.togglePickerButton).contains(
                <Node>e.target
            )
        ) {
            this.showPicker = false;
            document.removeEventListener("click", this._documentClickListener);
        }
    }
    initCalendar(date?: string) {
        if (!date) {
            date = this.today;
        }
        const dateArr = date!.split("/");
        if (this.year != parseInt(dateArr[0]))
            this.year = parseInt(dateArr[0]);
        if (this.month != parseInt(dateArr[1]))
            this.month = parseInt(dateArr[1]);
        if (this.day != parseInt(dateArr[2]))
            this.day = parseInt(dateArr[2]);
        this.generateDays();
    }
    generateDays() {
        if (this.year && this.month) {
            this.days = this.twentyNineDays.slice();
            for (
                let day = 30;
                day <= (this.month <= 6 ? 31 : this.month <= 11 ? 30 : 29);
                day++
            ) {
                this.days.push(day);
            }
            if (this.month == 12) {
                const criterion = this.year < 1343 ? 21 : 33;
                if (
                    this.year % criterion === 1 ||
                    this.year % criterion === 5 ||
                    this.year % criterion === 9 ||
                    this.year % criterion === 13 ||
                    this.year % criterion === 17 ||
                    this.year % criterion === 22 ||
                    this.year % criterion === 26 ||
                    this.year % criterion === 30
                )
                    this.days.push(30);
            }
            if (this.month && this.day) {
                if (this.days.indexOf(this.day) === -1)
                    this.day = this.days[this.days.length - 1];
            }
        }
    }
    toShamsi(grgYear: number, grgMonth: number, grgDay: number) {
        var hshYear = grgYear - 621;
        var hshMonth, hshDay;
        var grgLeap = this.grgIsLeap(grgYear);
        var hshLeap = this.hshIsLeap(hshYear - 1);
        var hshElapsed;
        var grgElapsed = this.grgSumOfDays[grgLeap ? 1 : 0][grgMonth - 1] + grgDay;
        var XmasToNorooz = hshLeap && grgLeap ? 80 : 79;
        if (grgElapsed <= XmasToNorooz) {
            hshElapsed = grgElapsed + 286;
            hshYear--;
            if (hshLeap && !grgLeap) hshElapsed++;
        } else {
            hshElapsed = grgElapsed - XmasToNorooz;
            hshLeap = this.hshIsLeap(hshYear);
        }
        for (var i = 1; i <= 12; i++) {
            if (this.hshSumOfDays[hshLeap ? 1 : 0][i] >= hshElapsed) {
                hshMonth = i;
                hshDay = hshElapsed - this.hshSumOfDays[hshLeap ? 1 : 0][i - 1];
                break;
            }
        }
        return `${hshYear}/${hshMonth}/${hshDay}`;
    }
    toGregorian(hshYear: number, hshMonth: number, hshDay: number) {
        var grgYear = hshYear + 621;
        var grgMonth, grgDay;
        var hshLeap = this.hshIsLeap(hshYear);
        var grgLeap = this.grgIsLeap(grgYear);
        var hshElapsed = this.hshSumOfDays[hshLeap ? 1 : 0][hshMonth - 1] + hshDay;
        var grgElapsed;
        if (
            hshMonth > 10 ||
            (hshMonth == 10 && hshElapsed > 286 + (grgLeap ? 1 : 0))
        ) {
            grgElapsed = hshElapsed - (286 + (grgLeap ? 1 : 0));
            grgLeap = this.grgIsLeap(++grgYear);
        } else {
            hshLeap = this.hshIsLeap(hshYear - 1);
            grgElapsed =
                hshElapsed +
                79 +
                (hshLeap ? 1 : 0) -
                (this.grgIsLeap(grgYear - 1) ? 1 : 0);
        }
        for (var i = 1; i <= 12; i++) {
            if (this.grgSumOfDays[grgLeap ? 1 : 0][i] >= grgElapsed) {
                grgMonth = i;
                grgDay = grgElapsed - this.grgSumOfDays[grgLeap ? 1 : 0][i - 1];
                break;
            }
        }
        return grgYear + "-" + grgMonth + "-" + grgDay;
    }
    grgIsLeap(Year: number) {
        return Year % 4 == 0 && (Year % 100 != 0 || Year % 400 == 0);
    }
    hshIsLeap(Year: number) {
        Year = (Year - 474) % 128;
        Year = (Year >= 30 ? 0 : 29) + Year;
        Year = Year - Math.floor(Year / 33) - 1;
        return Year % 4 == 0;
    }
    hshDayOfWeek(hshYear: number, hshMonth: number, hshDay: number) {
        var value;
        value = hshYear - 1376 + this.hshSumOfDays[0][hshMonth - 1] + hshDay - 1;
        for (let i = 1380; i < hshYear; i++) if (this.hshIsLeap(i)) value++;
        for (let i = hshYear; i < 1380; i++) if (this.hshIsLeap(i)) value--;
        value = value % 7;
        if (value < 0) value = value + 7;
        return value;
    }
}
