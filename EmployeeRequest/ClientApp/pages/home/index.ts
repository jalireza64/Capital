import { Vue, Component, Watch } from "vue-property-decorator";
import { EventType, getCurrentDate, formatNumber } from "../../assets/utilities";
import SvDatepicker from "../../components/datepicker/datepicker.vue";
import '@progress/kendo-ui/js/kendo.buttongroup.js';

@Component({
    components: {
        SvDatepicker
    }
})
export default class HomeIndex extends Vue {

    
    formModel = {
        meetingAgreement: false
    }
    shareholderModel = {};
    getShareholderInformation() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Home/GetShareholder",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.shareholderModel = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    priorityPrint() {
        this.setPrintFlag()
        this.$router.push({ name: "report", params: { model: JSON.stringify(this.shareholderModel) } });
    }

    meetingPaperPrint() {
        this.setPrintFlag()
        this.$router.push({ name: "report", params: { model: JSON.stringify(this.shareholderModel) } });
    }

    mounted() {
        $('.app').removeClass('back');
        getCurrentDate((result: any) => {
            this.getShareholderInformation();
        });
    }

    setPrintFlag() {
        window.app.$emit(EventType.StartWaiting);
        debugger;
        $.ajax({
            type: "POST",
            url: "/api/Shared/setPrintFlag",
            dataType: "json",
            data: {
                //@ts-ignore
                shrh_code: this.shareholderModel.shrh_code,
                //@ts-ignore
                comp_id: this.shareholderModel.comp_id,
            },
            success: result => {
                if (result != null) {

                } else {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message, getNotificationType(result.ResponseType))
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }
} 