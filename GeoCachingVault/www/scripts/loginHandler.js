var loginHandler = {
    //Add the record in database, it adds record or row in Web SQL (SQLite)
    loginUser: function ( usrname, psswords) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(                 
                    "Select * From userdata Where userdata.username = ? And userdata.passwords = ? ",
                     [usrname, psswords],
                     function (tx, results) {
                         if (results.rows.length > 0) {
                             //alert("loghandler " + usrname);
                             sessionStorage.setItem("user_info", usrname);
                             var nameinfo = sessionStorage.getItem("user_info");
                             //alert("loginhandler " + nameinfo + nameinfo.length);
                             $.mobile.changePage("index.html");
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
}