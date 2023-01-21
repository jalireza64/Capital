import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { generateCustomValidity } from "../../assets/utilities";

@Component({})
export default class SvTimepicker extends Vue {
    @Prop({ default: "05:25" })
    value!: string | null;

    @Prop({ default: false })
    required!: boolean;

    mask = "##:##";

    text = this.value || "";

    tempSelectionStart = 0;

    pickerShown = false;

    selectedValue = this.value || "";

    cellHeight = 0;

    isMobile = !!window.orientation || navigator.userAgent.includes("Android");

    mounted() {
        this.selectedValueChanged();
        this.text = this.text || this.mask.replace(/\$/g, "_").replace(/\#/g, "_");
        this.cellHeight = parseInt(getComputedStyle(this.$el).getPropertyValue("--cell-height"));

        const input = this.$refs.input as HTMLInputElement;
        input.id = this.$el.id;
        this.$el.id = "";
    }

    updated() {
        this.$refs.input && (<HTMLInputElement>this.$refs.input).setSelectionRange(
            this.tempSelectionStart || 0,
            this.tempSelectionStart || 0
        );
    }

    @Watch("value")
    valueChange() {
        if (this.value || !this.text.includes("_")) {
            this.text = this.value || this.mask.replace(/\$/g, "_").replace(/\#/g, "_");
        }
        this.selectedValue = this.value || "";
    }

    @Watch("selectedValue")
    selectedValueChanged() {
        if (this.value != this.selectedValue)
            this.$emit("input", this.selectedValue);
    }

    @Watch("text")
    textChange() {
        const input = this.$refs.input as HTMLInputElement;
        if (this.text.includes("_")) {
            this.$emit("input", null);
            if (this.required !== false) {
                input.setCustomValidity(generateCustomValidity(input));
            } else {
                input.setCustomValidity("");
            }
        }
        else {
            this.$emit("input", this.text);
            input.setCustomValidity("");
        }
    }

    @Watch("required")
    requiredChange() {
        this.textChange();
    }

    togglePicker() {
        this.pickerShown = !this.pickerShown;
        if (this.pickerShown) {
            const hour = this.selectedValue ? parseInt(this.selectedValue.split(":")[0]) : 0;
            const minute = this.selectedValue ? parseInt(this.selectedValue.split(":")[1]) : 0;
            this.move(this.$refs.hour as HTMLElement, 1, hour);
            this.move(this.$refs.minute as HTMLElement, 1, minute);
            document.addEventListener("click", this.documentClickListener);
        }
    }

    documentClickListener(e: MouseEvent) {
        if (
            !(this.$refs.timepicker as HTMLElement).contains(e.target as Node) &&
            !(this.$refs.togglePicker as HTMLElement).contains(e.target as Node)
        ) {
            this.pickerShown = false;
            document.removeEventListener("click", this.documentClickListener);
        }
    }
    
    keydown(e: KeyboardEvent) {
        if (!e.target)
            return;
        const target = e.target as HTMLInputElement;
        //control keys are always allowed
        const alwaysAllowedKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Home", "End", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Tab", "Enter"];
        if (alwaysAllowedKeys.includes(e.key) || e.ctrlKey)
            return true;
        target.selectionStart = target.selectionStart || 0;
        if (e.key === "Backspace") {
            if (target.selectionEnd == target.selectionStart) target.selectionStart && target.selectionStart--;
            for (let index = (target.selectionEnd || 0) - 1; index >= target.selectionStart; index--) {
                let maskLetter = this.mask[index];
                if (!maskLetter) {
                    e.preventDefault();
                    return false;
                }
                const placeholders = ["$", "#"];
                if (!placeholders.includes(maskLetter)) {
                    continue;
                }
                this.text = this.text.substr(0, index) + "_" + this.text.substr(index + 1);
            }
            this.tempSelectionStart = target.selectionStart;
            this.$forceUpdate();
            e.preventDefault();
            return false;
        } else {
            let maskLetter = this.mask[target.selectionStart];
            if (!maskLetter) {
                e.preventDefault();
                return false;
            }
            const placeholders = ["$", "#"];
            while (!maskLetter || !placeholders.includes(maskLetter)) {
                target.selectionStart = target.selectionStart + 1;
                target.setSelectionRange(target.selectionStart, target.selectionStart);
                maskLetter = this.mask[target.selectionStart];
            }
            if (e.key !== "Delete") {
                switch (target.selectionStart) {
                    case 0:
                        if (!e.key.match(/[0-2]/)) {
                            e.preventDefault();
                            return false;
                        }
                        break;
                    case 1:
                        if (!e.key.match(/[0-9]/)) {
                            e.preventDefault();
                            return false;
                        }
                        break;
                    case 3:
                        if (!e.key.match(/[0-5]/)) {
                            e.preventDefault();
                            return false;
                        }
                        break;
                    case 4:
                        if (!e.key.match(/[0-9]/)) {
                            e.preventDefault();
                            return false;
                        }
                        break;
                    default:
                        e.preventDefault();
                        return false;
                }
                this.text = this.text.substr(0, target.selectionStart) + e.key + this.text.substr(target.selectionStart + 1);
                const hour = Number(this.text.substr(0, 2));
                if (!isNaN(hour) && hour > 23) {
                    this.text = `23${this.text.substr(2)}`;
                }
            } else {
                this.text = this.text.substr(0, target.selectionStart) + "_" + this.text.substr(target.selectionStart + 1);
            }
            this.tempSelectionStart = target.selectionStart + 1;
            this.$forceUpdate();
            e.preventDefault();
            return false;
        }
    }

    move(currentTarget: HTMLElement, direction: 1 | -1, value?: number) {
        const focused = currentTarget.children.item(2);
        let val = value != null ? value : (parseInt(focused!.textContent!) + (direction > 0 ? 1 : -1));
        const isHour = currentTarget.classList.contains("hour");
        if (val > (isHour ? 23 : 59)) {
            val = 0;
        } else if (val < 0) {
            val = isHour ? 23 : 59;
        }
        Array.from(currentTarget.children).forEach((o, i) => {
            let override = null;
            if (val == 0) {
                if (i == 0) {
                    override = isHour ? "22" : "58";
                } else if (i == 1) {
                    override = isHour ? "23" : "59";
                }
            } else if (val == 1) {
                if (i == 0) {
                    override = isHour ? "23" : "59";
                }
            } else if (val == (isHour ? 22 : 58)) {
                if (i == 4) {
                    override = "00";
                }
            } else if (val == (isHour ? 23 : 59)) {
                if (i == 3) {
                    override = "00";
                } else if (i == 4) {
                    override = "01";
                }
            }
            o.textContent = override != null ? override : (val + i - 2).toString().padStart(2, "0");
            if (i == 2) {
                if (!this.selectedValue) {
                    this.selectedValue = "00:00";
                }
                if (isHour) {
                    this.selectedValue = o.textContent[0] + this.selectedValue.substr(1);
                    this.selectedValue = this.selectedValue.substr(0, 1) + o.textContent[1] + this.selectedValue.substr(2);
                } else {
                    this.selectedValue = this.selectedValue.substr(0, 3) + o.textContent[0] + this.selectedValue.substr(4);
                    this.selectedValue = this.selectedValue.substr(0, 4) + o.textContent[1] + this.selectedValue.substr(5);
                }
            }
        });
    }

    lastHourTouchY = 0;
    lastMinuteTouchY = 0;

    touchMoveCounter = 0;

    touchMove(e: TouchEvent) {
        const currentTarget = e.currentTarget as HTMLElement;
        const isHour = currentTarget.classList.contains("hour");
        const touchY = e.changedTouches[0].clientY;
        console.log(touchY);
        const lastTouchY = isHour ? this.lastHourTouchY : this.lastMinuteTouchY;
        if (touchY == lastTouchY) return;
        if (isHour) {
            this.lastHourTouchY = touchY;
        } else {
            this.lastMinuteTouchY = touchY;
        }
        const touchDir = touchY > lastTouchY ? -1 : 1;
        if (++this.touchMoveCounter > 6) {
            this.touchMoveCounter = 0;
            for (let i = 1; i <= Math.abs(touchY - lastTouchY); i += 6 + (i / Math.abs(touchY - lastTouchY))) {
                setTimeout(() => {
                    //Array.from(currentTarget.children).forEach(o => {
                    //    const el = o as HTMLElement;
                    //    el.style.paddingTop = "0";
                    //    el.style.paddingBottom = "0";
                    //});
                    if (touchDir > 0) {
                        this.move(currentTarget, 1);
                    } else {
                        this.move(currentTarget, -1);
                    }
                }, i * 10);
            }
            if (touchDir > 0) {
                this.move(currentTarget, 1);
            } else {
                this.move(currentTarget, -1);
            }
        } else {
            Array.from(currentTarget.children).forEach(o => {
                const el = o as HTMLElement;
                const padding = 2 * this.touchMoveCounter + "px";
                el.style.paddingBottom = "0";
                el.style.paddingTop = "0";
                if (touchDir > 0) {
                    if (this.touchMoveCounter > 3) {
                        el.style.paddingTop = padding;
                    } else {
                        el.style.paddingBottom = padding;
                    }
                } else {
                    if (this.touchMoveCounter > 3) {
                        el.style.paddingBottom = padding;
                    } else {
                        el.style.paddingTop = padding;
                    }
                }
            });
        }
    }

    touchEnd(e: TouchEvent) {
        const currentTarget = e.currentTarget as HTMLElement;
        Array.from(currentTarget.children).forEach(o => {
            const el = o as HTMLElement;
            el.style.paddingTop = "0";
            el.style.paddingBottom = "0";
        });
        //this.touchMoveCounter = 5;
        //this.touchMove(e);
    }

    wheel(e: WheelEvent) {
        this.move(e.currentTarget as HTMLElement, e.deltaY > 0 ? 1 : -1);
    }
}