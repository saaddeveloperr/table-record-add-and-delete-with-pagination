var basePath = "templates";
require.config({
    //baseUrl: "js/scripts",
    baseUrl: ".",
    // alias libraries paths
    paths: {

        // here we define path to NAMES
        // to make controllers and their lazy-file-names independent


        //Koru

        "korucont": basePath + "/koru/korutask/js/koruController",


    },
    deps: ['js/app-dynamic']

});

	
	 
