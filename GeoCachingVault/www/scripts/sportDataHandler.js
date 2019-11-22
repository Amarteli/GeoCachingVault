var sportDataHandler = {
    //Add the record in database, it adds record or row in Web SQL (SQLite)
    addAction: function (usrname, sprttype, sprtplace, sprtdate, sprtlen) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "insert into diarydata( username, sporttype, sportplace, sportdate, sportlen) values( ?, ?, ?, ?, ?)",
                    [usrname, sprttype, sprtplace, sprtdate, sprtlen],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("add product error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { }
        );
    },
} 