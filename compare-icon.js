require('shelljs/global');
var images = require("images");

var compareIcon = function(iconPath, icon2Path){
    var icons = ls(iconPath);
    var icons2 = ls(icon2Path);
    console.log('icons num: ', icons.length, icons2.length);
    for(var i = 0; i < icons.length; i++){
        if(icons[i] !== icons2[i]){
            console.log('different icon name: ', icons[i], icons2[i] );
        } else {
            var iconSize = images(iconPath + '/' + icons[i]).size();
            var icon2Size = images(icon2Path + '/' + icons2[i]).size();
            if (iconSize.width * 2 !== icon2Size.width || iconSize.height * 2 !== icon2Size.height) {
               console.log(icons[i], iconSize, icons2[i], icon2Size);
            }
        }
    }

}

compareIcon('icons', 'icons@2')
