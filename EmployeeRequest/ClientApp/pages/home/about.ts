import { Vue, Component } from "vue-property-decorator";
import { EventType, ResponseType as ResponseType, getNotificationType, getContractValidity } from "../../assets/utilities";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

@Component({

})
export default class HomeAbout extends Vue {

    calculationFaults = [];

    version = "";

    getVersion() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Shared/GetVersion",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.version = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    customerName = "شرکت رادین انفورماتیک";

    mobileLockState = true;

    createPdf() {
        var doc = new jsPDF()
        var test = (this.$refs.item2 as any).innerHTML;
        doc.fromHTML(test, 10, 10)
        doc.save('a4.pdf')
    }

    createPdfWithCss() {
        //const doc = new jsPDF();
        var doc = new jsPDF({
            orientation: 'landscape'
        })

        /** WITH CSS */
        var canvasElement = document.createElement('canvas');
        html2canvas((this.$refs.item2 as any), {
            canvas: canvasElement
        }).then(function (canvas:any) {
            var img = canvas.toDataURL("image/jpeg", 0.8);
            doc.addImage(img, 'JPEG', 0, 0,297,210);
            doc.save("sample.pdf");
        });
    }

    mounted() {
        this.getVersion();

        (this.$refs.lockInfoPanel as any).kendoWidget().expand($("#item2"), false);
        $('#item2 > span').addClass('k-state-selected');
    }
} 