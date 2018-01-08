function onLoaded() {
	var csInterface = new CSInterface();
	var appName = csInterface.hostEnvironment.appName;
	var appVersion = csInterface.hostEnvironment.appVersion;

	// document.getElementById("dragthing").style.backgroundColor = "lightblue";
	// var caps = csInterface.getHostCapabilities();

	loadJSX();

	// Listen for event sent in response to rendering a sequence.
	csInterface.addEventListener("com.adobe.csxs.events.PProPanelRenderEvent", function(event){
		alert(event.data);
	});

	csInterface.addEventListener("com.adobe.csxs.events.WorkspaceChanged", function(event){
		alert("New workspace selected: " + event.data);
	});

	// register for messages
	VulcanInterface.addMessageListener(
	    VulcanMessage.TYPE_PREFIX + "com.DVA.message.sendtext",
	    function(message) {
	        var str = VulcanInterface.getPayload(message);
	        // You just received the text of every Text layer in the current AE comp.
	    }
	);
	csInterface.evalScript('$._PPP_.keepPanelLoaded()');
	// register project item selected callback
	csInterface.evalScript('$._PPP_.registerProjectPanelChangedFxn()');
}

function loadJSX() {
    var csInterface = new CSInterface();

    var appName = csInterface.hostEnvironment.appName;
    var extensionPath = csInterface.getSystemPath(SystemPath.EXTENSION);

    // load general JSX script independent of appName
	var extensionRootGeneral = extensionPath + '/jsx/';
    csInterface.evalScript('$._ext.evalFiles("' + extensionRootGeneral + '")');

    // load JSX scripts based on appName
    var extensionRootApp = extensionPath + '/jsx/' + appName + '/';
    csInterface.evalScript('$._ext.evalFiles("' + extensionRootApp + '")');
}

function evalScript(script, callback) {
	new CSInterface().evalScript(script, callback);
}
