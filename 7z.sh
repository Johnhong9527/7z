#!/bin/bash
function ergodic(){
  for file in `ls $1`
  do
    local path=$1"/"$file
    # local name=$file
    # local size=`du --max-depth=1 $path|awk '{print $1}'`
    7z a $file'.7z' -mmt9
  done
}
IFS=$'\n' #这个必须要，否则会在文件名中有空格时出错
INIT_PATH=".";
ergodic $INIT_PATH

 
# function ergodic(){
#   for file in `ls $1`
#   do
#     if [ -d $1"/"$file ]
#     then
#       ergodic $1"/"$file
#     else
#       local path=$1"/"$file
#       # echo $path
#       echo $1
#     fi
#   done
# }
 
# IFS=$'\n'
# INIT_PATH="`pwd`";
# ergodic $INIT_PATH
