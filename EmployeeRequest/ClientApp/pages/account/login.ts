import { Vue, Component, Watch } from "vue-property-decorator";
import * as CryptoJS from "crypto-js";
import { ResponseType, getNotificationType, EventType } from "../../assets/utilities";
import '@progress/kendo-ui/js/kendo.buttongroup.js';
@Component({

})
export default class AccountLogin extends Vue {
    canLoginByActiveDirectory = false;
    loginByActiveDirectory = false;
    CaptchaImage = "";
    user = {
        str1: "",
        str2: "",
        str3: "",
        compId: "",
        numericStr: "",
        username: "",
        password: "",
        captchaText: "",
        loginType: 0,
        passwordType: "password"
    };
    direction = "rtl";
    persianDatasource = ["-", "آ", "ا", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "ژ", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی", "أ", "إ", "ء", "ؤ", "ئ"];
    englishDatasource = ["-","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "R", "T", "W", "X", "Y", "Z"];

    strDatasource = this.persianDatasource;

    loginTypeSelect(e: any) {
        if (e.indices == 0) {
            this.direction = "rtl";
            this.strDatasource = this.persianDatasource;
        }

        if (e.indices == 1) {
            this.direction = "ltr";
            this.strDatasource = this.englishDatasource;
        }
    }

    showLoginType() {
        $(this.$refs.loginByAd).slideToggle();
    }
    
    encrypt(value: string) {
        var key = CryptoJS.enc.Utf8.parse('8080808080808080');
        var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted.toString();
    }

    login() {

        if (this.user.compId != "") {
            if (this.user.str1 != "-" && this.user.str2 != "-" && this.user.str3 != "-" && this.user.numericStr.length == 5) {
                window.app.$emit(EventType.StartWaiting);
                var bbsCode = this.user.str1 + this.user.str2 + this.user.str3 + this.user.numericStr;
                $.ajax({
                    type: "POST",
                    url: "/api/Account/Login",
                    data: {
                        captchaText: this.encrypt(this.user.captchaText),
                        username: this.encrypt(bbsCode),
                        password: this.encrypt(this.user.password),
                        CompId: this.encrypt(this.user.compId),
                    },
                    dataType: "json",
                    success: result => {
                        if (result != null) {
                            debugger;
                            if (result.ResponseType === ResponseType.Ok) {
                                window.app.$emit(EventType.Login);
                                this.$router.push("/");
                            } else {
                                //@ts-ignore
                                this.$root.$children[0].popupNotificationWidget.show(result.Message, getNotificationType(result.ResponseType))
                            }
                        }
                    },
                    complete: () => {
                        window.app.$emit(EventType.EndWaiting);
                    }
                });
            } else {
                //@ts-ignore
                return this.$root.$children[0].popupNotificationWidget.show(this.$MessagesLibrary.get('BBSCodeISNotValid'), getNotificationType(ResponseType.Warning))
            }
        } else {
            //@ts-ignore
            return this.$root.$children[0].popupNotificationWidget.show(this.$MessagesLibrary.get('PleaseSelectCompany'), getNotificationType(ResponseType.Warning))

        }


    }

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

    showPasswordInLoginState = true;
    showRememberMeInLoginState = true;
    passwordWidth = "100%";

    showPassword() {

        if (this.user.passwordType === "password") {
            this.user.passwordType = "text";
        } else {
            this.user.passwordType = "password";
        }

    }

    companyDataSource = [];

    getAllCompany() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Account/GetAllCompany",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.companyDataSource = result;
                    this.$nextTick(() => {
                        this.user.compId = "2";
                    });

                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    companyLoginMessage = "";

    @Watch('user.compId')
    GetCompanyLoginMessage() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Account/GetCompanyLoginMessage",
            data: {
                compId: this.user.compId
            },
            dataType: "json",
            success: result => {
                if (result != null) {
                    debugger;
                    this.companyLoginMessage = result.login_message;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    mounted() {
        $('.app').addClass('back');
        this.getAllCompany();
        this.getCaptchaImage();
        this.getVersion();

        document.addEventListener("keyup", event => {
            if (event.getModifierState && event.getModifierState("CapsLock")) {
                this.showCapsLockNotification = true;
            } else {
                this.showCapsLockNotification = false;
            }
        });
    }

    showCapsLockNotification = false;

    getCaptchaImage() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Account/ShowCaptchaImageInByte",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.CaptchaImage = result.Data;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }
}
