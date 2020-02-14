#!/bin/bash
function ergodic(){
  for file in `ls $1`
  do
      local path=$1"/"$file
      local name=$file
      local size=`du --max-depth=1 $path|awk '{print $1}'`
      x $name
  done
}
IFS=$'\n' #这个必须要，否则会在文件名中有空格时出错
INIT_PATH=".";
ergodic $INIT_PATH