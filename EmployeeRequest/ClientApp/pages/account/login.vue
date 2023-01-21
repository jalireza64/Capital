<template>
    <div class="rtl" style="display:flex;align-items:center;height:100%;">

        <form class="container bs-docs-example k-content" @submit.prevent="login">
            <div class="title k-alt" style="display: grid;grid-template-columns: repeat(1, 1fr);">
                <div style="position:relative">
                    <div class="grid-content-title-right" style="position:absolute">
                        <i class="fa fa-key"></i>
                        {{$CaptionsLibrary.get('Login')}}
                    </div>
                    <div class="grid-content-title-left" style="direction:ltr">
                        <i class="fab fa-codepen"></i>
                        {{version}}
                    </div>
                </div>
            </div>

            <span>سامانه جامع خدمات ارزش افزوده بورسی</span>
            <div class="form-group">
                <kendo-dropdownlist v-model="user.compId"
                                    id="companyId"
                                    ref="companyId"
                                    :data-source="companyDataSource"
                                    :data-text-field="'company_name'"
                                    :data-value-field="'comp_id'"
                                    :filter="'contains'"
                                    class="width-100">
                </kendo-dropdownlist>
            </div>
            <div class="form-group">
                <div v-show="user.compId != ''" class="k-block k-info-colored" style="direction:rtl;text-align:justify">
                    {{companyLoginMessage}}
                </div>
                <br v-show="user.compId != ''" />
                <div class="form-group">
                    <kendo-buttongroup id="loginType" :index="0" @select="loginTypeSelect">
                        <kendo-buttongroup-button style="width:100%">{{$CaptionsLibrary.get("Actual") +' '+ $CaptionsLibrary.get("And") +' '+$CaptionsLibrary.get("Legal")}}</kendo-buttongroup-button>
                        <kendo-buttongroup-button style="width:100%">{{$CaptionsLibrary.get("LatinLegal")}}</kendo-buttongroup-button>
                    </kendo-buttongroup>
                </div>
                <br />
                <div class="captcha-wrapper" v-bind:dir="direction">
                    <label for="username" style="display:none">{{$CaptionsLibrary.get("Username")}}</label>
                    <kendo-dropdownlist v-model="user.str1"
                                        id="str1"
                                        :auto-close="false"
                                        :data-source="strDatasource" style="width:20%">
                    </kendo-dropdownlist>
                    <kendo-dropdownlist v-model="user.str2"
                                        id="str2"
                                        :auto-close="false"
                                        :data-source="strDatasource" style="width:20%">
                    </kendo-dropdownlist>
                    <kendo-dropdownlist v-model="user.str3"
                                        id="str3"
                                        :auto-close="false"
                                        :data-source="strDatasource" style="width:20%">
                    </kendo-dropdownlist>
                    <kendo-maskedtextbox id="numericStr" mask="00000" v-model="user.numericStr" type="text" style="width:60%" :placeholder="$CaptionsLibrary.get('NumericOfBBSCode')" required>
                    </kendo-maskedtextbox>
                </div>
            </div>
            <!--<div class="form-group">
        <label for="username" style="display:none">{{$CaptionsLibrary.get("Username")}}</label>
        <k-input id="username" v-model="user.username" type="text" class="width-100" :placeholder="$CaptionsLibrary.get('Username')" required />
    </div>-->
            <div class="form-group">
                <div class="captcha-wrapper">
                    <label for="password" style="display:none">{{$CaptionsLibrary.get("Password")}}</label>
                    <k-input id="password" v-model="user.password" v-bind:type="user.passwordType" v-bind:style="{width:passwordWidth}" :placeholder="$CaptionsLibrary.get('Password')" required />
                    <kendo-button v-show="this.user.passwordType === 'password' && this.showPasswordInLoginState == true" class="k-button k-primary" @click.prevent="showPassword"><i class="far fa-eye"></i></kendo-button>
                    <kendo-button v-show="this.user.passwordType !== 'password' && this.showPasswordInLoginState == true" class="k-button k-primary" @click.prevent="showPassword"><i class="far fa-eye-slash"></i></kendo-button>
                </div>
            </div>
            <div class="form-group break-line k-block k-warning-colored" v-show="showCapsLockNotification">
                <div style="display:flex;align-items:center;">
                    <i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;
                    <label style="direction:ltr">{{$CaptionsLibrary.get("CapsLockIsOn")}}</label>
                </div>
            </div>
            <div class="form-group">
                <div class="captcha-wrapper">
                    <k-input v-model="user.captchaText" type="text" style="width:62%" :placeholder="$CaptionsLibrary.get('CaptchaText')" required />
                    <img class="captcha-image" :src="'data:img/png;base64,'+CaptchaImage" alt="Captcha Image" />
                    <kendo-button class="k-button k-primary" @click.prevent="getCaptchaImage"><i class="fa fa-sync"></i></kendo-button>
                </div>
            </div>
            <div class="form-group">
                <kendo-button class="k-button k-primary">{{$CaptionsLibrary.get("Entry")}}</kendo-button>
            </div>
        </form>

        <div class="copyright">
            Copyright © 2020 <a href="http://www.raadeen.ir" target="_blank">raadeen</a>. All rights reserved.
        </div>

    </div>
</template>

<script lang="ts" src="./login.ts">
</script>

<style scoped>
    .switch-wrapper{
        display: flex;
        align-items: center;
    }

    .switch-wrapper label{
        flex: 1 1;
        text-align: right;
    }

    .grid-header {
        display: flex;
        align-items: center;
    }

    .grid-content-title-right {
        flex: 1 1;
        text-align: right;
    }

    .grid-content-title-left {
        flex: 1 1;
        text-align: left;
    }

    .logo {
        width: 7rem;
        float: right;
    }

    .captcha-wrapper {
        display: flex;
        align-items: center;
    }

    .captcha-wrapper button{
        height:2.3rem !important;
        width:2.3rem !important;
    }

    .captcha-wrapper img{
        height:calc(10px + 1.4285714286em);
        width:30%;
    }

    .container {
        margin: auto;
        width: 350px;
        text-align: center;
        display: grid;
        grid-row-gap: 1.5rem;
    }

    .captcha-image{
        height: 30px;
    }

    .box-center{
        direction:ltr;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25px; 
    }

    .copyright{
        direction:ltr;
        width:100%;
        position: absolute;
        top: 99%;
        left: 1%;
        margin-top: -25px; 
    }
</style>
