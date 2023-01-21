import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component({})
export default class SvContextmenu extends Vue {
    @Prop()
    target?: HTMLElement;

    @Prop()
    gridRef: any;

    shown = false;
    timestamp = 0;
    clientX = 0;
    clientY = 0;

    @Watch("shown")
    shownChange() {
        this.$nextTick(() => {
            const el = this.$el as HTMLElement;
            const boundingClientRect = el.getBoundingClientRect();
            if (boundingClientRect.right > window.innerWidth) {
                el.style.right = (window.innerWidth - parseInt(el.style.left!)) + "px";
                el.style.left = "auto";
            }
            if (boundingClientRect.bottom > window.innerHeight) {
                el.style.bottom = (window.innerHeight - parseInt(el.style.top!)) + "px";
                el.style.top = "auto";
            }
        });
    }
    
    get grid() {
        return this.gridRef ? this.gridRef.kendoWidget() : null;
    }

    listener(e: MouseEvent | TouchEvent) {
        if (!(e instanceof MouseEvent)) {
            if (performance.now() - this.timestamp < 300) return;
            if (Math.abs(e.changedTouches[0].clientX - this.clientX) > 20 || Math.abs(e.changedTouches[0].clientY - this.clientY) > 20) return;
        }
        e.preventDefault();
        this.shown = false;
        if (this.grid) {
            this.grid.select((e.target as HTMLElement).closest("tr"));
        }
        this.$nextTick(() => {
            const el = this.$el as HTMLElement;
            el.style.right = "auto";
            el.style.bottom = "auto";
            if (!(e instanceof MouseEvent)) {
                el.style.left = e.changedTouches[0].clientX + "px";
                el.style.top = e.changedTouches[0].clientY + "px";
            } else {
                el.style.left = e.clientX + "px";
                el.style.top = e.clientY + "px";
            }
            this.shown = true;
            this.$nextTick(() => {
                el.focus();
            });
        });
    }

    @Watch("target")
    targetChange() {
        if (this.target) {
            if (!navigator.userAgent.includes("iPhone")) {
                this.target.addEventListener("contextmenu", e => this.listener(e));
            } else {
                this.target.addEventListener("touchstart", e => {
                    this.clientX = e.changedTouches[0].clientX;
                    this.clientY = e.changedTouches[0].clientY;
                    this.timestamp = performance.now();
                });
                this.target.addEventListener("touchend", e => this.listener(e));
            }
        }
    }

    mounted() {
        this.targetChange();
        window.addEventListener("scroll", () => {
            this.shown = false;
        }, true);
    }

    focusOut() {
        setTimeout(() => {
            const el = this.$el as HTMLElement;
            if (!el.contains(document.activeElement)) {
                this.shown = false;
            }
        }, 0);
    }
}
