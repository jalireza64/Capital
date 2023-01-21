<template>
    <div class="rtl">
        <kendo-panelbar ref="lockInfoPanel" id="lockInfoPanel" class="panel-bar">
            <div id="item2">
                <i class="fa fa-lock"></i>&nbsp;
                {{$CaptionsLibrary.get('LockInformation')}}
                <div ref="item2">
                    <div class="container">
                        <div class="form-group break-line">
                            <label><span>{{$CaptionsLibrary.get("EndUser")}}</span>: {{customerName}}</label>
                        </div>
                        <div class="form-group">
                            <label><span>{{$CaptionsLibrary.get("Version")}}</span>: {{version}}</label>
                        </div>
                        <div class="form-group">
                            <label><span>{{$CaptionsLibrary.get("MobileVersion")}}</span>: <abbr v-show="mobileLockState">{{$CaptionsLibrary.get("Have")}}</abbr><span v-show="!mobileLockState">{{$CaptionsLibrary.get("HaveNot")}}</span></label>
                        </div>
                        <div class="form-group" style="text-align:center !important">
                            <label><span>{{$MessagesLibrary.get("ForMoreInformationScanIt")}}</span></label><br />
                            <div style="text-align:center !important;">
                                <kendo-qrcode :value="'http://www.raadeen.ir/services/priorityCertificate.html'" :size="200" :encoding="'UTF_8'"></kendo-qrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </kendo-panelbar>
        <!--<div @click="createPdfWithCss">Test</div>-->
    </div>
</template>

<script lang="ts" src="./about.ts">
</script>

<style scoped>
    .panel-bar{
        margin-bottom:20px;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        grid-gap: 20px;
        padding:10px;
    }

    .form-group span{
        font-weight:bold;
    }

</style>
