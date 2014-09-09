#!/bin/bash

path_icon=./img/icons
path_icon2=./img/icons@2
#首先比较数量
icon_count= ls -l $path_icon | grep '^-' | wc -l
icon2_count= ls -l $path_icon2 | grep '^-' | wc -l
if test $icon_count -ne $icon2_count
then
  echo "icon: $icon_count icon2: $icon2_count"
fi
files=$(ls $path_icon/)

for file in $files
do
    filename=$(basename $file )
    file2=${path_icon2}/${filename}
    
    diff ${file} ${file2} 1>/dev/null 2>&1 && result=0 || result=1

    if [ "$result" == 1 ];then
        echo "$filename is diff"
    fi
done
