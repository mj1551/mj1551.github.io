var dashboard,int;
var timeleft
let dsList = [];
let dsCheck = [];
let dsTimes = [];

$(document).ready(function () {
    tableau.extensions.initializeAsync().then(() => {
        timeleft = document.getElementById("int").value;
        let c = 0;
        dashboard = tableau.extensions.dashboardContent.dashboard;
        dashboard.worksheets.forEach(function (ws, index) {
            ws.getDataSourcesAsync().then(data => {
                c++
                for (ds of data) {
                    dsList[ds.name] = ds;
                    dsCheck[ds.name] = 0;
                }
                if (c == dashboard.worksheets.length) {
                    createList();
                }
            });
        });
    });
});

function createList() {
    let datasources = "";
    for (ds in dsList) {
        datasources += '<input id="check-' + dsList[ds].name + '" type="checkbox"> ' + dsList[ds].name + "</br>";
    }
    document.getElementById('dsList').innerHTML = datasources;
    pb();
}

function start(dsList) {
        for (ds in dsList) {
            if (document.getElementById('check-' + dsList[ds].name).checked == true) {

                dsTimes[dsList[ds].name] = Date.now()
                console.log(dsList[ds].name + ' started at: ' + dsTimes[dsList[ds].name]);

                dsList[ds].refreshAsync()
                    .then(console.log(dsList[ds].name + ' finished at: ' +Date.now()+ '. Took ' + (Date.now()-dsTimes[dsList[ds].name]) + 'ms'))
            }
        }
}

function pb() {
    setTimeout(function () {
        timeleft = timeleft - 1
        document.getElementById("progressBar").value = timeleft;
        console.log('timeleft', timeleft)
        if (timeleft <= 0){
            start(dsList);
            timeleft = document.getElementById("int").value;
        }
        pb()
    }, 1000);
}
