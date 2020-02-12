#!/bin/bash
#
#for((i=1;i<=10;i++));
#do
#echo $(expr $i \* 3 + 1);
#done

#ebook-convert files/5-2中国远征军（下）.azw3 out/5-2中国远征军（下）.epub --output-profile=tablet

#function read_dir() {
#  path=$1
#  files=$(ls $path)
#  echo $files
#  for file in $files
#  do
#    echo $file >> file.txt
##    echo $1"/"$file #在此处处理文件即可
##    ebook-convert $1"/"$file $1"/"$file".epub" --output-profile=tablet
#  done
#}
#读取第一个参数
#read_dir $1



#============ get the file name ===========
#path=$1
#Folder_A="/home/youname/shell/gotfilename/bin"
function ergodic(){
  for file in `ls $1`
  do
    if [ -d $1"/"$file ]
    then
      ergodic $1"/"$file
#    elif [ ${name##*.} ]; then
    elif [ "${file##*.}"x = "azw3"x ]||[ "${file##*.}"x = "mobi"x ]
     then
      local path=$1"/"$file
      local name=$file
      local size=`du --max-depth=1 $path|awk '{print $1}'`
#      echo $name  $size $path
#      echo ${name##*.}
      ebook-convert $name $name".epub" --output-profile=tablet
    fi
  done
}
IFS=$'\n' #这个必须要，否则会在文件名中有空格时出错
INIT_PATH=".";
ergodic $INIT_PATH