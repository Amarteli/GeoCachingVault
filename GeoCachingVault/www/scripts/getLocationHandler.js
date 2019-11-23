var getLocationHandler = {
    //Ari Martelius, 1800582
    //Getting geocaches from database
    getLocationData: function ( usrname) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(                 
                    "Select * From geodata Where geodata.username = ? ",
                     [usrname],
                     function (tx, results) {
                         if (results.rows.length > 0) {
                             var i;
                            //Clearing geocache view
                             $("#txtList tr").remove();
                             //Adding all found geocaches to page
                            for (i = 0; i < results.rows.length; i++ ) {
                                $("#txtList").append("<tr><td>" + results.rows.item(i).geotext + "</td><td>" + results.rows.item(i).geolocation + "</td><td><img src='/img/ok.ico' alt='ok' class='image' onclick='showData(" + i + ")'></td></tr>");
                            }             
                         }
                        },
                     function (tx, error) {
                         alert(error);
                        var r = confirm("login error: " + error.message );
                        console.log("login error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { }
        );
    },

    showRowData: function (usrname, rowid) {
        //Moving selected geocache data for modifying
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "Select * From geodata Where geodata.username = ?  ",
                    [usrname],
                    function (tx, results) {
                        var i;

                        if (results.rows.length > 0) {
                            for (i = 0; i < results.rows.length; i++) {
                                if (i == rowid) {
                                //rowinfo is hidden field
                                    $("#showLocation").val(results.rows.item(i).geotext);
                                    $("#showGPS").val(results.rows.item(i).geolocation);
                                    $("#rowInfo").val(results.rows.item(i).rowid);
                                    
                                    { break; }
                                }
                            }
                        }
                    },
                    function (tx, error) {
                        alert(error);
                        var r = confirm("Geodata selection error: " + error.message);
                        console.log("Geodata selection error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { }

        );
    },
}