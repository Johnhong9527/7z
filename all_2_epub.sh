#!/bin/bash
#格式：./all_2_epub.sh 路径名
dst=$(echo $1|sed 's/\/$//')	
for file in $(ls "$dst"|grep .txt)