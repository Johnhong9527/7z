#!/usr/bin/env node
const fs = require('fs');
const node_7z = require('node-7z');
const path = require('path');
const ora = require('ora');
const file_path = process.argv[2] || 1;

// return;
// console.log(path.resolve(file_path));

(async function () {
  const _is_file = await isFile(file_path);
  let resolve = path.resolve(file_path);
  let mySevenStream = null;
  resolve = resolve.replace(/\s/g, '\\ ');
  // 判断文件或目录路径是否正确
  if (_is_file) {
    // 压缩当前目录下所有文件
    if (file_path === '.') {
      console.log('压缩当前目录下所有文件');
      const allFiles = await fs.readdirSync(file_path);

      let i = 0;
      let len = allFiles.length;
      x(allFiles[i]);
      function x(path) {
        //  忽略部分文件
        if (
          path.search(/^\./) < 0 &&
          path.search(/\.7z/g) < 0 &&
          path.search(/node_modules/g) < 0 &&
          path.search(/yarn\.lock/g) < 0 &&
          path.search(/package\.json/g) < 0
        ) {
          console.log(`正在压缩${path}`);
          const spinner = ora(`${path}.7z: 0%`).start();
          mySevenStream = node_7z.add(`${path}.7z`, `${path}`, {
            $progress: true,
            // method: ['x9'],
            // method: ['0=LZMA2'],
            method: ['0=BCJ', '1=LZMA:d=21'],
          });
          mySevenStream.on('progress', function (progress) {
            spinner.text = `${path}.7z: ${progress.percent}%`;
          });
          mySevenStream.on('end', function () {
            spinner.stop();
            i++;
            if (i < len) {
              x(allFiles[i]);
            } else {
              console.log('压缩完毕啦');
            }
          });
        }
      }
      // for (let i = 0; i < allFiles.length; i++) {
      // 	//  忽略部分文件
      // 	if (
      // 		allFiles[i].search(/^\./) < 0 &&
      // 		allFiles[i].search(/\.7z/g) < 0 &&
      // 		allFiles[i].search(/node_modules/g) < 0 &&
      // 		allFiles[i].search(/yarn\.lock/g) < 0 &&
      // 		allFiles[i].search(/package\.json/g) < 0
      // 	) {
      // 		console.log(`正在压缩${allFiles[i]}`);
      // 		mySevenStream = node_7z.add(`${allFiles[i]}.7z`, `${allFiles[i]}`, {
      // 			$progress: true,
      // 			method: ['x9'],
      // 		});
      // 		/*// 目录
      // 		if (await isDirectory(allFiles[i])) {
      // 			node_7z.add(`${allFiles[i]}.7z`, `${allFiles[i]}`, {
      // 				$progress: true,
      // 				method: ['x9'],
      // 			});
      // 		} else {
      // 			// 文件
      // 			node_7z.add(`${allFiles[i]}.7z`, `${allFiles[i]}`, {
      // 				$progress: true,
      // 				method: ['x9'],
      // 			});
      // 		}*/
      // 	}
      // }
    } else {
      // 压缩输入文件
      mySevenStream = node_7z.add(`${file_path}.7z`, `${file_path}`, {
        $progress: true,
        method: ['x9'],
      });
      const spinner = ora(`${file_path}.7z: 0%`).start();
      mySevenStream.on('progress', function (progress) {
        spinner.text = `${file_path}.7z: ${progress.percent}%`;
      });
      mySevenStream.on('end', function () {
        spinner.stop();
      });
    }
  }
  mySevenStream = null;
})();

function isFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) reject(err);
      resolve(true);
    });
  });
}

function isDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) reject(err);
      resolve(stats.isDirectory());
    });
  });
}

function allFile(files) {
  let;
}
