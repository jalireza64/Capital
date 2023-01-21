import { Vue, Component, Prop } from "vue-property-decorator";
import { EventType } from "../../assets/utilities";
//import "../../assets/stimulsoft/scripts/stimulsoft.reports.js";
//import "../../assets/stimulsoft/scripts/stimulsoft.viewer.js";
//import "stimulsoft-reports-js";

@Component({})
export default class CustomReportIndex extends Vue {
    @Prop()
    model?: any;


    mounted() {
        if (!this.model) {
            //@ts-ignore
            this.$root.$children[0].popupNotificationWidget.show(this.$MessagesLibrary.get("NoDataFound"), "warning");
            this.$router.push("/");
            return;
        }

        if (window.orientation !== undefined) {
            $("main").css("z-index", 11);
        }

        const reportsSrc = "/ClientApp/assets/stimulsoft/scripts/stimulsoft.reports.js";
        const viewerSrc = "/ClientApp/assets/stimulsoft/scripts/stimulsoft.viewer.js";

        let reportsScript = null;
        let viewerScript: HTMLScriptElement | null = null;

        if (!document.querySelector(`script[src="${reportsSrc}"]`)) {
            reportsScript = document.createElement("script");
            reportsScript.src = reportsSrc;
            document.body.appendChild(reportsScript);
        }

        if (reportsScript) {
            reportsScript.addEventListener("load", () => {
                if (!document.querySelector(`script[src="${viewerSrc}"]`)) {
                    viewerScript = document.createElement("script");
                    viewerScript.src = viewerSrc;
                    document.body.appendChild(viewerScript);
                }
                if (viewerScript) {
                    viewerScript.addEventListener("load", () => {
                        this.continueLoading();
                    });
                } else {
                    this.continueLoading();
                }
            });
        } else {
            if (!document.querySelector(`script[src="${viewerSrc}"]`)) {
                viewerScript = document.createElement("script");
                viewerScript.src = viewerSrc;
                document.body.appendChild(viewerScript);
            }
            if (viewerScript) {
                viewerScript.addEventListener("load", () => {
                    this.continueLoading();
                });
            } else {
                this.continueLoading();
            }
        } 
    }

    viewer: Stimulsoft.Viewer.StiViewer | null = null;


    createViewer() {
        // Specify necessary options for the viewer
        Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("/content/reportLocalization/fa.xml", true);


        var options = new Stimulsoft.Viewer.StiViewerOptions();
        options.height = "100%";
        options.exports.showExportToWord2007 = false;
        options.exports.showExportToCsv = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToExcel2007 = false;
        options.exports.showExportToHtml = false;
        options.exports.showExportToHtml5 = false;
        options.toolbar.fontFamily = "vazir";
        options.exports.showExportDialog = false;
        options.toolbar.showAboutButton = false;
        options.toolbar.showFindButton = false;
        options.toolbar.showPrintButton = true;


        options.appearance.scrollbarsMode = true;
        options.toolbar.showDesignButton = false;
        options.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Direct;
        options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Div;


        // Create an instance of the viewer
        this.viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);

        this.viewer.renderHtml("viewer-content");
    }

    showReport() {
        // Forcibly show process indicator
        this.viewer!.showProcessIndicator();

        // Timeout need for immediate display loading report indicator
        setTimeout(() => {
            // Create a new report instance
            var report = new Stimulsoft.Report.StiReport();
            Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHm4lqN+V3/fvJECXRrqdoEPZqYyFXh3g3K9oCDFvgzMl4c9KudQQwMJ6nO6w7rHz59BhwYgDE0QzKtjY2WxEejTNewbNDXY492M2mDsK1Hb4t6MoFYGbSoID0gow3VC5cFhvcOKVoagiHq6/4iqFc3RS7nZQBp95+WB6N1fR//H7OBlvfuBKldvC1pJh6pTW/7HRdOclErt/EGwivx9SpuDNabWWBfIZJBdJsvKjpoIsDQGibWk8Y8F9V1mCLf88FurWwEZ9WzXePbJn+wfabHM+a7pqDAXhsaW33UEW6vQ3kgLrVjbcHWdhtYbp5j6ZeIMLBCW2LXiCZpzy3N3XqjlroV/s7KRZGeZMvRrLWhcM8YJ6sBTMUyQrF/Fk3d5f0WbAf7+opIA5rhxY+qgwWcE42S+HOOcMgb2IWtj5ycC/GXZ4o9qtk2WWJzCC+ygckXK7iI5pzhzScGmLCBrFnjyE5EP65FViVDSCcNl6hUFw7wwRtcQq5pnOu6wHRXsSpwNPufWaRqE4gd7hbrQoPqki4BLOYgGOQjZ3kJdc7MG47nVT62z1ScLsjH73q4yhABt8h1wmJl0LanKnE6EGkvZPCrDBBf0sZp12sJrxK8FGsPUKrBNZ5f4VuYkdzWS1ed2m5MZNHkDDd3LncYkQnLPh/MYAsnc2ud715njwiM62xIWYk9lIrmCWJU3JVcexRDS3/l7Po9UU5gx2xJKUW1tWOXKQ9GqQZYtn/rl804VMC1/tWr4X2XU1otulny5P8YkZ7BTG6zmkcW6raROxv7xkSUwE0LK2FmIpeBr29Zxn0QUYBtC09J+wVD5y00f/1jMU+k1jQmi1n2tpWgy6CxAHPPrQFhk0FsGXEDg82IELCKncbqkfqgT0QyV262YL2uxrcbcJ1Wrzf4llEX90hMa3oZK5wdQLrCBkXIlXverhGL3I09fR6lcXDMj8A3vrQrhr4bwYcWTH0hyJCPVLYIVxAFLwgV8wk700QOo3z32sSWKnyMHVx3brFB8I7rOPaW2Sc8rBxc1E9EvNcqiTwRd9QA3lIdR2Hpc4jyn5dx8PT6GTNGXNKhoTZDLrGMtYqXw4rVOXfkE8+opF4+/H602ockCI/IY7C65+sxooNgSg+9LpzImUt6GdtrvF8HrvJ0rUW6ZiAmGaQmqdrHfwC3K+QKU4UEWuLU1GPG+PKMrYEbtT/Hei7NPA5sOqHqbzaMsW7zj+enlhuEUeMdlxqfQs1QtTERrzX2HXv/JZ43rASH4ycuGftLR2v3AOHhtBCoYOCszhOiHYGmH0I9lwi8HDRTXjkuoRU1Zxmz9rSIQy35/aypV339OS7p4VydO5LibEiwugzaNHXCZalEPShhcWzTAq6+uCb+jA9ob+Za4yICRdIjgot/E5ZQNZl2VEhFmWR7pYSB7MB24z0ysVf3igAc50/3Lr4d7mQ7SgmtKFoejGOjvb75YOq/pEJGxCo1xIS+jhZklyLuiwmtyDe7Xmpn33fip22qx2iF7FYW71AyuT3tTPn2a7Jc2wXlPCAxB6dqx0eeX4fWA3+RIosUTxTyA7a/SM95pwN9FKYFPZ8TcTqDIq0Ntc57IdX5u1To=";
 
            // Load reports from JSON object

            report.dictionary.databases.clear();

            var dataSet = new Stimulsoft.System.Data.DataSet("Sample");
            dataSet.readJson(JSON.parse(this.model));
            debugger;
            if (window.orientation !== undefined) {
                
                report.loadFile("/reports/" + JSON.parse(this.model).form_path + "Mob.mrt");
            } else {
                report.loadFile("/reports/" + JSON.parse(this.model).form_path +".mrt");
            }

            //report.loadFile("/reports/SimpleList.mrt");
            report.regData(dataSet.dataSetName, "", dataSet);

            report.render();
            // Assign the report to the viewer
            this.viewer!.report = report;

        }, 50);
    }

    continueLoading() {
        this.createViewer();
        this.showReport();
    };
} 