import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { placeHolderImageBase64, resizeImage } from "../../assets/utilities";

const dataUrlPrepend = "data:image/png;base64,";

@Component({})
export default class SvImagepicker extends Vue {
    @Prop({})
    value?: string;
    @Prop({ default: 768 })
    maxSize!: number;
    dataUrl = dataUrlPrepend + placeHolderImageBase64;
    get hasImage() {
        return this.dataUrl != dataUrlPrepend + placeHolderImageBase64;
    }

    @Watch("value", { immediate: true })
    valueChange() {
        this.dataUrl = dataUrlPrepend + (this.value || placeHolderImageBase64);
        const fileInput = this.$refs.fileInput as HTMLInputElement;
        fileInput && (fileInput.value = "");
    }

    async imageChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0];
        if (file) {
            this.dataUrl = await resizeImage({ maxSize: this.maxSize, file: file });
            this.$emit("input", this.dataUrl.slice(this.dataUrl.indexOf(",") + 1));
        } else {
            this.dataUrl = dataUrlPrepend + placeHolderImageBase64;
            this.$emit("input", null);
        }
    }

    clickFileInput() {
        const fileInput = this.$refs.fileInput as HTMLInputElement;
        fileInput.click();
    }

    clearImage() {
        const fileInput = this.$refs.fileInput as HTMLInputElement;
        fileInput && (fileInput.value = "");
        this.dataUrl = dataUrlPrepend + placeHolderImageBase64;
        this.$emit("input", null);
    }
}
