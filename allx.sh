#!/bin/bash
function ergodic() {
  for file in $(ls $1); do
    if [ -d $1"/"$file ]; then
      ergodic $1"/"$file
      #    elif [ ${name##*.} ]; then
    elif [ "${file##*.}"x = "zip"x ]; then
      local path=$1"/"$file
      local name=$file
      local size=$(du --max-depth=1 $path | awk '{print $1}')
      local extract_dir=${name%.*}
      #      echo $name  $size $path
      #      echo ${name##*.}
      unzip $name -d $extract_dir 
      #echo $(basename  "$name")
      #echo ${name%.*}
      #echo $name
      # ebook-convert $name $name".epub" --output-profile=tablet
    fi
  done
}
IFS=$'\n' #这个必须要，否则会在文件名中有空格时出错
INIT_PATH="."
ergodic $INIT_PATH
