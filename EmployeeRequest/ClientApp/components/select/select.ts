import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component({})
export default class SvDropdown extends Vue {
  @Prop({ type: Array })
  items!: Array<any>;
  @Prop()
  value: any;
  selectedValue = this.value;
  updated() {
    (<HTMLSelectElement>this.$refs.select).value = this.selectedValue ? this.selectedValue.toString() : "";
  }
  @Watch("value")
  onValueChanged() {
    this.selectedValue = this.value;
    this.$forceUpdate();
  }
  @Watch("selectedValue")
  afterSelectedValueChanged() {
    this.$emit("input", this.selectedValue);
  }
}