$._PPP_ = {
    getSelected: function() {
        $.writeln("test");
        var selectedItem = app.project.selectedItem();
        this.say(selectedItem);
    },
    loadTags: function() {
        var path = "C:\\Users\\milad\\AppData\\Roaming\\Adobe\\CEP\\extensions\\Milad-Premiere\\jsx\\PPRO\\tags.js";
        var file = new File(path);
        var test = $.evalFile(path);
        file.open('r');
        var read = file.read();
        file.close();
    },
    writingToJs: function() {
        var string = "$._tags = {\n\t";

        for (var key in $._tags){
            var newArray = $._tags[key].sort();
            string += "\"" + key + "\"" + ": [" +
                "\n\t\t" + newArray
                .map(function(tag){return "\"" + tag + "\""})
                .join(",") + "]" + ',\n\t';
        };
        string = string.substr(0,string.length-3) + "\n}";
        return string;
    },
    writeToTags: function() {
        var pathBackup = "C:\\Users\\milad\\AppData\\Roaming\\Adobe\\CEP\\extensions\\Milad-Premiere\\jsx\\PPRO\\tags_backup.js";
        var path = "C:\\Users\\milad\\AppData\\Roaming\\Adobe\\CEP\\extensions\\Milad-Premiere\\jsx\\PPRO\\tags.js";
        var file = new File(path);
        var fileBackup = new File(pathBackup);
        file.open('w');
        file.write(this.writingToJs());
        file.close();
        fileBackup.open('w');
        fileBackup.write(this.writingToJs());
        fileBackup.close();
    },
    splitTag: function(tag){
        function removeHash(tags) {
          return tags.map(function(tag) {
            return tag.split("#")[1];
          })
        }

        function removeSpaces(tag) {
          return tag.split(" ");
        }

        function createTagObject(tag) {
            // $.writeln(JSON.stringify(tag));
            // $.writeln(typeof tag);
          var tagObject = {};
          tag.forEach(function(tag) {
            var splitTag = tag.split("_");
            tagObject[splitTag[0]] = splitTag.slice(1).reduce(function(prev, curr){prev.push(curr); return prev},[])
          })
          console.log(tagObject);
          return tagObject;
        }

        var removeTagSpaces = removeSpaces(tag); // #Action_VR-Demo, #City_NY
        var removeTagHashes = removeHash(removeTagSpaces); //Action_VR-Demo City_NY
        var tagObject = createTagObject(removeTagHashes); // { Action: ['VR-Demo'], County: []}
    },
    say: function(something) {
        var newSomething = JSON.stringify(something);
        $.writeln(newSomething); // output to ExtendScript Toolkit Console
        alert(newSomething); // invoke a warning popup
    },
    test: function() {
        this.say("test");
    },
    keepPanelLoaded : function() {
        app.setExtensionPersistent("com.adobe.PProPanel", 0); // 0, while testing (to enable rapid reload); 1 for "Never unload me, even when not visible."
    },
    registerProjectPanelChangedFxn : function() {
		success = app.bind("onSourceClipSelectedInProjectPanel", $._PPP_.projectPanelSelectionChanged);
	},
    loadCurrentTags : function() {
        return JSON.stringify($._tags);
    },
    projectPanelSelectionChanged : function() {
        var remainingArgs 	= arguments.length;
        var message 		= arguments.length + " items selected: ";

        for (var i = 0; i < arguments.length; i++) {
            message += arguments[i].name;
            remainingArgs--;
            if (remainingArgs > 1) {
                message += ', ';
            }
            if (remainingArgs === 1){
                message += ", and ";
            }
            if (remainingArgs === 0) {
                message += ".";
            }
        }
        app.setSDKEventMessage(message, 'info');
    }
}
/*
getMetaData: function(){
},
readTags: function() {
    var tags = $.evalFile('tags.js');
    $.writeln(tags);
},
testButton: function(something) {
    this.readTags();
},
traverse_project_items: function() {
    var fileArray = [];

    var methodObject = {
        'clip': function(){
            fileArray.push(child); },
        'file': function(child){
            fileArray.push(child); },
        'bin': function(child){
            stack.push(child); }, }

    if (!app.project.rootItem) return "rootItem is not available";

    var stack = [app.project.rootItem];
    while (stack.length > 0) {
        var item = stack.shift();
        if (item === undefined || item.children === undefined || item.children.numItems < 1) continue;
        var numChildren = item.children.numItems;
        for (var i = 0; i < numChildren; i++) {
            var child = item.children[i];
            var method = this.whatKind(child);
            methodObject[method](child);
        }
    }

    function transformFunction(item) {
        return item.name;
    }
    var result = '[' + fileArray.map(transformFunction).join(", ") + ']';
    $.writeln("result:", result);
    return result;
},
whatKind: function(child) {
    switch(child.type){
        case ProjectItemType.CLIP:
            return 'clip';
            break;
        case ProjectItemType.FILE:
            return 'file';
            break;
        case ProjectItemType.BIN:
            return 'bin'
            break;
        default:
    }
},

*/
