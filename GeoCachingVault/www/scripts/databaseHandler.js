var databaseHandler = {
    //Ari Martelius, 1800582
    db: null,
    createDatabase: function () {
        this.db = window.openDatabase(
            "GeoVault.db",
            "1.0",
            "Geo cache vault database",
            1000000);
        this.db.transaction(
            function (tx) {
                
                //Creating tables
                tx.executeSql(
                    "create table if not exists userdata( username text primary key, passwords text)",
                [],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    })
                tx.executeSql(
                    "create table if not exists geodata(rowid INTEGER PRIMARY KEY AUTOINCREMENT, username text, geotext text, geolocation text)",
                    [],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    })
            },
            function (error) {
                console.log("Transaction error:" + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully:");
            },
        );
    }
}