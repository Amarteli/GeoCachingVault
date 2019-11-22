var getLocationHandler = {
    //Add the record in database, it adds record or row in Web SQL (SQLite)
    
    getLocationData: function ( usrname) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(                 
                    "Select * From geodata Where geodata.username = ? ",
                     [usrname],
                     function (tx, results) {
                         if (results.rows.length > 0) {
                             
                             var i;
                             $("#txtList").innerHTML = "";
                            for (i = 0; i < results.rows.length; i++ ) {
                               $("#txtList").append("<tr><td>" + results.rows.item(i).sporttype + "</td><td>" + results.rows.item(i).sportdate + "</td><td><img src='/img/ok.ico' alt='ok' class='image' onclick='showData(" + i + ")'></td></tr>");
                                
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
                                
                                    $("#showSport").val(results.rows.item(i).sporttype);
                                    $("#showPlace").val(results.rows.item(i).sportplace);
                                    $("#showDate").val(results.rows.item(i).sportdate);
                                    $("#showTime").val(results.rows.item(i).sportlen);
                                    { break; }
                                }
                            }
                        }
                    },
                    function (tx, error) {
                        alert(error);
                        var r = confirm("login error: " + error.message);
                        console.log("login error: " + error.message);

                    }
                );
            },
            function (error) { },
            function () { }

        );
    },
}