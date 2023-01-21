<template>
    <div class="app rtl">
        <ul class="bg-bubbles" v-show="this.$router.currentRoute.fullPath.startsWith('/account/login')">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <kendo-notification ref="popupNotification" :position-top="80"
                            :position-left="20"
                            stacking="down"></kendo-notification>
        <kendo-dialog :modal="true"
                      ref="exitConfirm"
                      :visible="false"
                      :width="300"
                      :title="$CaptionsLibrary.get('Exit')">
            {{$MessagesLibrary.get('DoYouWantToLogoff')}}
            <kendo-dialog-action :text="$CaptionsLibrary.get('Yes')"
                                 :primary="true"
                                 :action="exit">
            </kendo-dialog-action>
            <kendo-dialog-action :text="$CaptionsLibrary.get('No')"></kendo-dialog-action>
        </kendo-dialog>

        <div dir="ltr" class="waiting-bar" v-show="waitingsCount"></div>

        <header>
            <div to="/" style="display:flex; align-items:center;padding-right:8px;" v-show="!this.$router.currentRoute.fullPath.startsWith('/account/login')">
                <button @click.prevent="$router.back()" style="color:white;outline:none;cursor:pointer">
                    <i class="fas fa-arrow-right fa-2x"></i>
                </button>
            </div>
            <div to="/" style="display:flex;margin-right:8px; align-items:center" v-show="this.$router.currentRoute.fullPath.startsWith('/account/login')">
                <img v-bind:src="logo" />
                <span class="company-name">{{customerName}}</span>
            </div>

            <div class="left">
                <div class="change-theme-container" style="margin-right:2px;margin:5px;cursor:pointer">
                    <div class="change-theme" @click.prevent="toggleColorList">
                        <div class="color-container  circle-icon">
                            <div class="color color1" :style="{backgroundColor:selectedTheme().color1}">

                            </div>
                            <div class="color color2" :style="{backgroundColor:selectedTheme().color2}">

                            </div>
                            <div class="color color3" :style="{backgroundColor:selectedTheme().color3}">

                            </div>
                        </div>
                    </div>
                    <div ref="colorList" tabindex="-1" class="color-list k-content" v-show="isColorListShown" @focusout="colorListFocusOut">
                        <button class="color-container" v-for="theme in themes" @click.prevent="setTheme(theme.value)">
                            <div class="color color1" :style="{backgroundColor:theme.color1}">

                            </div>
                            <div class="color color2" :style="{backgroundColor:theme.color2}">

                            </div>
                            <div class="color color3" :style="{backgroundColor:theme.color3}">

                            </div>
                        </button>
                    </div>
                </div>
                <div class="change-theme-container" v-show="!isLoginPage()" style="margin:5px;cursor:pointer">
                    <div @click.prevent="profile" v-show="!isLoginPage()" class="circle-icon">
                        <div>
                            <i style="vertical-align:middle" class="fa fa-home"></i>
                        </div>
                    </div>
                </div>
                <div class="change-theme-container" v-show="!isLoginPage()" style="margin:5px;cursor:pointer">
                    <div @click.prevent="toggleMenu" v-show="!isLoginPage()" class="circle-icon">
                        <div>
                            <i style="vertical-align:middle" class="fa fa-user"></i>
                        </div>
                    </div>
                    <div ref="menu" tabindex="-1" class="menu k-content" v-show="isMenuShown" @focusout="menuFocusOut">
                        <div style="text-align:center">{{$UserInfo.fullName}}</div>
                        <hr />
                        <kendo-button class="k-button menu-button" @click.prevent="about">
                            <div>
                                <i class="fa fa-info-circle"></i>&nbsp;{{$CaptionsLibrary.get("AboutApplication")}}
                            </div>
                        </kendo-button>
                        <hr />
                        <kendo-button class="k-button k-primary menu-button" @click.prevent="exitConfirm">
                            <div>
                                <i class="fa fa-sign-out-alt"></i>&nbsp;{{$CaptionsLibrary.get("Exit")}}
                            </div>
                        </kendo-button>
                    </div>
                </div>
            </div>
        </header>
        <!--<nav class="k-content" id="navigation" v-show="!isLoginPage()" @click="navigate" @focusout="navFocusOut">
            <ul>
                <li>
                    <button class="k-content">
                        <i class="fa fa-cogs"></i>
                        <span>{{$CaptionsLibrary.get('System')}}</span>
                    </button>
                    <ul class="k-alt">
                        <li>
                            <button class="k-content">
                                <span>{{$CaptionsLibrary.get('Dashboard')}}</span>
                            </button>
                            <ul class="k-content">
                                <li v-show="hasDashboardUsers">
                                    <router-link to="/account/users">
                                        <i class="fa fa-users fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('Users')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasDashboardAccessLevels">
                                    <router-link to="/account/accessLevels">
                                        <i class="fa fa-low-vision fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('AccessLevel')}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <button class="k-content">
                        <i class="fa fa-scroll"></i>
                        <span>{{$CaptionsLibrary.get('Reports')}}</span>
                    </button>
                    <ul class="k-alt">
                        <li>
                            <button class="k-content">
                                <span>{{$CaptionsLibrary.get('Shares')}}</span>
                            </button>
                            <ul class="k-content">
                                <li v-show="hasRpt43">
                                    <router-link to="/reports/rpt43">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('ShareAmountSwing')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRpt14">
                                    <router-link to="/reports/rpt14">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('ShareholderCombination')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRptShrMaxBuyer">
                                    <router-link to="/reports/rptMaxBuyer">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('BuyingMostShare')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRptShrMaxSeller">
                                    <router-link to="/reports/rptMaxSeller">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('SellingMostShare')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRptShrSellerBuyer">
                                    <router-link to="/reports/rptSellerBuyer">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('ShareSwing')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRptShr44">
                                    <router-link to="/reports/rpt44">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('CountAndQuantTransaction')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRptShrSeason">
                                    <router-link to="/reports/rptSeason">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('MonthTransactionState')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRptShrSeasonGroup">
                                    <router-link to="/reports/rptSeasonGroup">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('SeasonTransactionState')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRptShr44Agent">
                                    <router-link to="/reports/rpt44Agent">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('AgentsSituation')}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button class="k-content">
                                <span>{{$CaptionsLibrary.get('Finance')}}</span>
                            </button>
                            <ul class="k-content">
                                <li v-show="hasRpt0702">
                                    <router-link to="/reports/rpt0702">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('PayToShareholders')}}</span>
                                    </router-link>
                                </li>
                                <li v-show="hasRpt0702Assign">
                                    <router-link to="/reports/rpt0702Assign">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('AssignToShareholders')}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button class="k-content">
                                <span>{{$CaptionsLibrary.get('Capital')}}</span>
                            </button>
                            <ul class="k-content">
                                <li v-show="hasRptShrAmntCap">
                                    <router-link to="/reports/rptAmntCap">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('PayFromShareholderInCap')}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button class="k-content">
                                <span>{{$CaptionsLibrary.get('Users')+' '+$CaptionsLibrary.get('Shares')}}</span>
                            </button>
                            <ul class="k-content">
                                <li v-show="hasRptShrUserTask">
                                    <router-link to="/reports/rptUserTask">
                                        <i class="fa fa-table fa-2x"></i>
                                        <span>{{$CaptionsLibrary.get('UserPerformance')}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>-->
        <main id="shell">
            <transition name="fade">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
    </div>
</template>

<script lang="ts" src="./main.ts">
</script>

<style>
    .buy-mode {
        color: green;
    }

    .sell-mode {
        color: red;
    }

    .menu-button {
        width: 100%;
        margin-bottom: 10px;
        display: grid;
        grid-template-columns: repeat(1, minmax(100px, 1fr));
    }

        .menu-button div {
            display: flex;
            align-items: center
        }

    *:not(input):not(select):not(textarea) {
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    .badge {
        position: absolute;
        background-color: dodgerblue;
        height: 2rem;
        top: 1rem;
        left: 1.5rem;
        width: 2rem;
        text-align: center;
        line-height: 2rem;
        font-size: 1rem;
        border-radius: 50%;
        color: white;
    }

    .profile-badge {
        background-color: dodgerblue;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        text-align: center;
        line-height: 2.5rem;
        font-size: 1rem;
        color: white;
    }

    .circle-icon {
        background-color: white;
        width: 2.7rem;
        height: 2.7rem;
        border-radius: 50%;
        text-align: center;
        line-height: 2.7rem;
        font-size: 1rem;
        color: black;
        font-size: 1.8rem;
    }

    .alert-badge {
        background-color: red;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        text-align: center;
        line-height: 2.5rem;
        font-size: 1rem;
        color: white;
    }

    .event-badge {
        background-color: dodgerblue;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        text-align: center;
        line-height: 2rem;
        font-size: 1rem;
        color: white;
        margin-right: auto;
    }

    ul{
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    dl, dt, dd{
        margin: 0;
    }

    .waiting-bar{
        position: fixed;
        width: 100vw;
        height: 5px;
        --color: rgb(10,132,255);
        background-image: linear-gradient(to left, transparent 0%, transparent 50%, var(--color) 60%, var(--color) 90%, transparent 100%);
        z-index: 20;
        animation: move-background 1.05s infinite cubic-bezier(.67,.33,.33,.67);
    }

    @keyframes move-background{
        from{
            background-position-x: 0vw;
        }

        to{
            background-position-x: 100vw;
        }
    }

    .waiting-bg {
        background-color: gray;
        position: fixed;
        top:0;
        right:0;
        width:100vw;
        height:100vh;
        opacity: .9;
        z-index: 11111111111111111;
    }

    .waiting {
        text-align:center;
        position: fixed;
        top: calc(50vh - var(--loading-size) / 2);
        left: calc(50vw - var(--loading-size) / 2);
        width: var(--loading-size);
        z-index: 1;
        color: black;
        height: var(--loading-size);
        --loading-size: 161px;
    }

    button {
        border: none;
        background: none;
        cursor: pointer;
    }

    .k-button > *:not(:last-child){
        margin-left: .5rem;
    }

    .left{
        margin-right: auto;
        display: flex;
        align-items: center;
    }

    .search {
        position: relative;
        margin-left: 1rem;
    }

    .search .k-widget{
        padding: 1px;
    }

    .search-input-icon-wrapper {
        position: absolute;
        left: .1rem;
        top: 3px;
        padding: .15rem .4rem;
        border-radius: 4px;
    }

    .search-button {
        color: white;
        font-size: 1.3rem;
        padding: 0;
        margin-left: 1rem;
    }

    .event-button{
        color: white;
        font-size: 1.3rem;
        padding: 0;
    }

    .change-theme-container {
        /*margin-right: auto;*/
        position: relative;
    }

    .color-list {
        display: grid;
        grid-template-columns: repeat(3,40px);
        grid-gap: 5px;
        position: absolute;
        top: 43px;
        left: 0;
        box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
        padding:0.5rem;
    }

    .menu {
        width:150px;
        position: absolute;
        top: 48px;
        left: 0;
        box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
        padding: 0.5rem;
    }

    .events {
        width: 200px;
        position: absolute;
        top: 40px;
        left: 0;
        box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
        padding: 0.5rem;
    }

    .color-container{
        width:35px;
        height:35px;
        position:relative;
    }

    .color {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        position: absolute;
        filter: drop-shadow(0px 0px 1px gray)
    }

    .color1{
        top:4px;
        left:11px;
    }

    .color2 {
        bottom: 5px;
        left: 4px;
    }

    .color3 {
        bottom: 5px;
        right: 4px;
    }

    a{
        color: currentColor;
        text-decoration: none;
    }

        html {
            font-size: 13px;
        }


    @media(min-width: 1000px) {
        html {
            font-size: 13px;
        }
    }

    .app {
        height: 100vh;
        display: grid;
        width: 100vw;
        grid-template-areas: "header" "navigation" "shell";
        grid-template-rows: 60px 40px 1fr;
    }

    header {
        grid-area: header;
        display: flex;
        background-color: black;
        align-items: center;
        padding: 0 0;
        height: 60px;
        margin-bottom: .15rem;
        z-index: 10;
    }

    .company-name {
        padding-right:10px;
        color: white;
        font-weight: bold;
    }

        header img {
            padding: 0.5rem;
            width: 1.5rem;
            line-height: 2rem;
        }

    .selected-bar {
        position: absolute;
        bottom: 2px;
        right: 4px;
        left: 4px;
        height: 2px;
    }

    #navigation {
        grid-area: navigation;
        z-index: 4;
        height: 40px;
    }

        #navigation ul {
            border-radius: 5px;
        }

        #navigation li {
            border-width: 1px;
            border-style: solid;
        }

        #navigation button {
            position: relative;
        }

        #navigation button[disabled] {
            filter: brightness(1.3) opacity(.7);
            cursor: default;
        }

        #navigation a * {
            pointer-events: none;
        }

        #navigation .selected {
            background-color: red;
        }

        #navigation > ul {
            display: flex;
            align-items: stretch;
            height: 100%;
            box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
            position: relative;
        }

            #navigation > ul > li {
                flex: 1 1;
                text-align: center;
            }

                #navigation > ul > li > button {
                    display: block;
                    width: 100%;
                    height: 100%;
                    font-size: 1.3rem;
                    line-height: 2.6rem;
                    padding: 0;
                }

                    #navigation > ul > li > button > span {
                        margin-right: .5rem;
                        font-size: 1.1rem;
                    }

                #navigation > ul > li > ul {
                    position: absolute;
                    right: 40px;
                    width: calc(100vw - 2 * 40px);
                    display: flex;
                    box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
                }

                    #navigation > ul > li > ul > li {
                        width: 110px;
                        box-sizing: border-box;
                        height: 35px;
                    }

                    #navigation > ul > li > ul > li > button {
                        display: block;
                        padding: .5rem;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    #navigation > ul > li > ul > li > ul {
                        position: absolute;
                        width: 100vw;
                        display: flex;
                        grid-auto-flow: column;
                        justify-content: start;
                        padding: .1rem;
                        box-sizing: border-box;
                        box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
                        right: 0;
                        padding: 0;
                    }

                        #navigation > ul > li > ul > li > ul > li {
                            width: 110px;
                            box-sizing: border-box;
                        }

                        #navigation > ul > li > ul > li > ul > li > a {
                            display: grid;
                            justify-items: center;
                            align-items: center;
                            grid-gap: .75rem;
                            padding: .1rem;
                            padding-top: .5rem;
                            width: 105px;
                            height: 90px;
                            overflow: hidden;
                        }

    #shell{
        grid-area: shell;
        height: calc(100vh - 60px - 70px);
    }

    @media(min-width: 1000px) {
        .watch-grid{
            width:800px;
            height:300px;
        }

        #navigation .scroll {
            display: none !important;
        }

        #navigation > ul > li {
            position: relative;
        }

            #navigation > ul > li > ul {
                right: 50%;
                width: auto;
                transform: translateX(50%);
            }

                #navigation > ul > li > ul > li {
                    position: relative;
                }

                    #navigation > ul > li > ul > li > ul {
                        width: auto;
                        right: -1px;
                        justify-content: center;
                        background-color: transparent;
                        box-shadow: none;
                    }

    }

    @media(max-width: 1000px){
        .watch-grid{
            width:300px;
            height:300px;
        }

        .app {
            grid-template-areas: "header" "shell" "navigation";
            grid-template-rows: 60px 1fr 40px;
        }

        .search{
            position: fixed;
            top: 61px;
            right: 0;
            width: 100vw;
        }

        .search .k-widget{
            width: 100%;
        }

            .search .k-widget::before {
                content: " ";
                position: absolute;
                background-color: white;
                width: 100%;
                height: 100%;
                z-index: -1;
            }

        #shell {
            height: calc(100vh - 60px - 90px);
        }

        #navigation {
            position: fixed;
            width: 100%;
            bottom: 0;
            height: 50px;
        }

            #navigation .scroll {
                position: fixed;
                width: 40px;
                font-size: 1.3rem;
                color: inherit;
                border: inherit;
            }

                #navigation .scroll * {
                    pointer-events: none;
                }

            #navigation .outer-scroll {
                bottom: 50px;
                height: 40px;
                z-index: 1;
            }

            #navigation .inner-scroll {
                bottom: 90px;
                height: 110px;
                z-index: 2;
            }

            #navigation .scroll-left {
                right: 0;
                box-shadow: -2px -2px 8px 0 rgba(0,0,0,.2);
            }

            #navigation .scroll-right {
                left: 0;
                box-shadow: 2px -2px 8px 0 rgba(0,0,0,.2);
            }

            #navigation > ul > li > button > span{
                display: none;
            }

            #navigation > ul > li > ul {
                border-radius: 0;
                box-shadow: -2px -2px 8px 0 rgba(0,0,0,.2);
                bottom: 50px;
                height: 40px;
                display: grid;
                grid-auto-flow: column;
                overflow-x: auto;
                justify-content: start;
                scrollbar-width: none;
            }

                #navigation > ul > li > ul > li, #navigation > ul > li > ul > li > button {
                    border-radius: 0;
                    width: 140px;
                    height: 40px;
                }

                #navigation > ul > li > ul::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                }

                #navigation > ul > li > ul > li > ul {
                    border-radius: 0;
                    box-shadow: none;
                    font-size: 95%;
                    position: fixed;
                    bottom: 90px;
                    box-shadow: -2px -2px 8px 0 rgba(0,0,0,.2);
                    overflow-x: auto;
                    right: 40px;
                    width: calc(100vw - 2 * 40px);
                    scrollbar-width: none;
                }

                    #navigation > ul > li > ul > li > ul::-webkit-scrollbar {
                        width: 0;
                        height: 0;
                    }

                    #navigation > ul > li > ul > li > ul > li, #navigation > ul > li > ul > li > ul > li > a {
                        border-radius: 0;
                        width: 140px;
                        box-sizing: border-box;
                    }

                    #navigation > ul > li > ul > li > ul > li {
                        height: 110px;
                        border: none;
                    }

                        #navigation > ul > li > ul > li > ul > li > a {
                            height: 100%;
                            padding: 10px;
                        }
    }

    .small{
        font-size: 85%;
    }

    .transparent{
        background-color: transparent;
        border: none;
    }

    .whole-row {
        grid-column: 1 / -1;
    }

    main{
        padding: 1rem;
        flex: 1;
        overflow: auto;
    }

    .page {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

        .page > * {
            margin-bottom: 1.5rem;
        }

            .page > *:last-child {
                margin-bottom: 0;
            }

    .flex {
        flex: 1 1;
        min-height: 200px;
    }

    .seq {
        display: flex;
    }

        .seq > * {
            margin-left: .5rem;
            flex: 1 1;
        }

        .seq > *:last-child{
            margin-left: auto;
        }

    .form-group {
        display: flex;
        flex-direction: column;
    }

        .form-group label {
            margin-bottom: 0.2rem;
        }

    .break-line{
        grid-column-start:1;
    }

    .bs-docs-example {
        position: relative;
        padding: .5rem;
        font-size: 1rem;
        box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
        margin-bottom:15px;
        padding-bottom:15px;
    }

        .bs-docs-example .title {
            font-weight: bold;
            padding: .5rem;
            margin: -.5rem;
            box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
            margin-bottom: 1rem;
            text-align: right;
        }
            .bs-docs-example .title svg {
                margin-right: .5rem;
                margin-left: .5rem;
            }

        .bs-docs-example:after {
            content: attr(data-content);
            position: absolute;
            top: 0;
            left: 0;
            padding: 3px 7px;
            font-weight: bold;
            color: #9DA0A4;
            font-size: 1rem;
        }

        .rtl .bs-docs-example:after {
            left: auto;
            right: 0;
        }

    .k-rtl .k-list-filter > .k-icon{
        left: 13px;
    }

    .width-100 {
        width: 100%;
        display: block;
    }

    .profile-photo {
        width:2.5rem;
        height:2.5rem;
        border-radius: 50%;
        display:flex;
        align-items:center;
    }

    .event-container {
        display: grid;
        grid-template-columns: repeat(1, minmax(200px, 1fr));
        grid-gap: 20px;
        padding: 10px;
    }

    .k-multiselect {
        overflow: hidden;
    }

    .k-dialog[style*="display: flex;"]{
        display: block !important;
    }

    .k-window[style*="display: flex;"]{
        display: block !important;
    }

    .k-window-content{
        overflow: visible !important;
    }

.back{
        background: linear-gradient(327deg, #e5ff00, #00fcff, #448687);
        background-size: 600% 600%;

        -webkit-animation: ShareManagement 21s ease infinite;
        -moz-animation: ShareManagement 21s ease infinite;
        animation: ShareManagement 21s ease infinite;
    }

@-webkit-keyframes ShareManagement {
    0%{background-position:11% 0%}
    50%{background-position:90% 100%}
    100%{background-position:11% 0%}
}
@-moz-keyframes ShareManagement {
    0%{background-position:11% 0%}
    50%{background-position:90% 100%}
    100%{background-position:11% 0%}
}
@keyframes ShareManagement {
    0%{background-position:11% 0%}
    50%{background-position:90% 100%}
    100%{background-position:11% 0%}
}

.k-tabstrip > .k-content {
    border-color: transparent !important;
}

form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}

.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 17s;
          animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
          animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.40);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
          animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.30);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
          animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
          animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
</style>
<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
        padding: 10px;
    }

    .chart-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
        grid-gap: 20px;
        padding: 10px;
    }

    @media(max-width: 800px) {
        .chart-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: 20px;
            padding: 10px;
        }
    }
</style>
