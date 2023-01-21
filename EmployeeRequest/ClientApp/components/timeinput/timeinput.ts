import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { generateCustomValidity } from "../../assets/utilities";

@Component({})
export default class SvTimepicker extends Vue {
    @Prop({ default: 0 })
    value!: number;

    @Prop({ default: false })
    required!: boolean;

    @Prop({ default: false })
    acceptMinus!: boolean;

    sign: 1 | -1 = 1;
    
    input!: HTMLInputElement;

    @Watch("value")
    valueChange() {
        this.input.value = `${Math.floor(Math.abs(this.value) / 60).toString().padStart(3, "0")}:${(Math.abs(this.value) % 60).toString().padStart(2, "0")}`;
        if (this.value) {
            this.input.setCustomValidity("");
        } else {
            this.input.setCustomValidity(generateCustomValidity(this.input));
        }
        this.sign = this.value >= 0 ? 1 : -1;
    }

    @Watch("required")
    requiredChange() {
        this.input.setCustomValidity("");
    }

    mounted() {
        this.input = this.$refs.input as HTMLInputElement;
        this.input.required = this.required;
        this.input.id = this.$el.id;
        this.$el.id = "";
        this.valueChange();
    }

    blur() {
        const value = parseInt(this.input.value.substring(0, 3)) * 60 + parseInt(this.input.value.substring(4));
        this.$emit("input", this.sign * value);
    }
    
    keydown(e: KeyboardEvent) {
        const alwaysAllowedKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Home", "End", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Tab", "Enter"];
        if (alwaysAllowedKeys.includes(e.key) || e.ctrlKey)
            return;
        e.preventDefault();
        switch (e.key) {
            case "Backspace":
                if (this.input.selectionEnd == this.input.selectionStart) {
                    if (!this.input.selectionStart) {
                        this.sign = 1;
                        return;
                    }
                    const value = `${this.input.value.substring(0, this.input.selectionStart! - 1)}${this.input.selectionStart == 4 ? ":" : "0"}${this.input.value.substring(this.input.selectionStart!)}`;
                    setCursor(this.input, this.input.selectionStart ? this.input.selectionStart - 1 : 0);
                    this.input.value = value;
                    return;
                };
                let value = `${this.input.value.substring(0, this.input.selectionStart!)}${"".padStart(this.input.selectionEnd! - this.input.selectionStart!, "0")}${this.input.value.substring(this.input.selectionEnd!)}`;
                value = `${value.substring(0, 3)}:${value.substring(4)}`;
                setCursor(this.input, this.input.selectionStart!);
                this.input.value = value;
                return;
            case "-":
                if (this.acceptMinus) {
                    this.sign = -1;
                }
                return;
            case "+":
                this.sign = 1;
                return;
            default:
                switch (this.input.selectionStart) {
                    case 0:
                    case 1:
                    case 2:
                    case 5:
                        {
                            if (!e.key.match(/[0-9]/)) return;
                            const value = `${this.input.value.substring(0, this.input.selectionStart!)}${e.key}${this.input.value.substring(this.input.selectionStart! + 1)}`;
                            setCursor(this.input, this.input.selectionStart! + 1);
                            this.input.value = value;
                            break;
                        }
                    case 3:
                    case 4:
                        {
                            if (!e.key.match(/[0-5]/)) return;
                            const value = `${this.input.value.substring(0, 4)}${e.key}${this.input.value[5]}`;
                            setCursor(this.input, 5);
                            this.input.value = value;
                            break;
                        }
                }
                return;
        }

        function setCursor(input: HTMLInputElement, position: number) {
            Vue.nextTick(() => {
                input.selectionStart = input.selectionEnd = position;
            });
        }
    }
}
