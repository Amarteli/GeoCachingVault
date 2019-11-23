var locationDataHandler = {
    //Add the record in database, it adds record or row in Web SQL (SQLite)
    addAction: function (usrname, locationText, locationGPS) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "insert into geodata( username, geotext, geolocation) values( ?, ?, ?)",
                    [usrname, locationText, locationGPS],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("Add Geodata error: " + error.message);
                        alert(error);
                        var r = confirm("Add Geodata error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { }
        );
    },
    updateRowData: function (usrname, locationText, locationGPS, row) {
        databaseHandler.db.transaction(
            function (tx) {
                //alert(usrname + ", " + locationText + ", " + locationGPS + ", " + row );
                tx.executeSql(
                    "UPDATE geodata SET geotext = ? ,  geolocation = ?  WHERE rowid  = ? ",
                    [locationText, locationGPS, row],
                    function (tx, results) {
                        getLocationdata();
                                            },
                    function (tx, error) {
                        alert(error);
                        var r = confirm("Geodata update error: " + error.message);
                        console.log("Geodata update error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { }

        );
    },
    deleteRowData: function ( row) {
        databaseHandler.db.transaction(
            function (tx) {
                //alert(usrname + ", " + locationText + ", " + locationGPS + ", " + row);
                tx.executeSql(
                    "DELETE FROM geodata WHERE rowid = ?",
                    [row],
                    function (tx, results) {
                        getLocationdata();
                    },
                    function (tx, error) {
                        alert(error);
                        var r = confirm("Geodata delete error: " + error.message);
                        console.log("Geodata delete error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { }

        );
    },

} 