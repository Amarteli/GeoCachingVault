var loginHandler = {
    //Ari Martelius, 1800582
    //Add the record in database, it adds record or row in Web SQL (SQLite)
    loginUser: function ( usrname, psswords) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(                 
                    "Select * From userdata Where userdata.username = ? And userdata.passwords = ? ",
                     [usrname, psswords],
                     function (tx, results) {
                         if (results.rows.length > 0) {
                             
                             sessionStorage.setItem("user_info", usrname);
                             var nameinfo = sessionStorage.getItem("user_info");
                             //On successful login user is moved to main page
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