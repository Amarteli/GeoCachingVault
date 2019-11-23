var pwdHandler = {
    //Ari Martelius, 1800582
    //Add the record in database, it adds record or row in Web SQL (SQLite)
    addUser: function ( username, passwords) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "insert into userdata( username, passwords) values( ?, ?)",
                    [ username, passwords],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("add user error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { },
            $.mobile.changePage("login.html"),
        );
    },
}