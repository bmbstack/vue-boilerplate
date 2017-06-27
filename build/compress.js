#!/usr/bin/env node

/**
 * 压缩src/resources/目录下的所有图片
 * 因为每个月只有500张图片的免费额, 请仅在项目完成时压缩一到二次
 */
const tinify = require('tinify');
const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');

const exts = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
tinify.key = "6hb2cG85wqz7w0WsBGg-CYHC1AWKdgjK";

const dir = path.join(__dirname, '../src/resources');
fs.readdir(dir, { encoding: 'utf8' }, (err, files = []) => {
    if (err) {
        return console.error(err);
    }

    const compressionTasks = [];

    files.filter(item => exts.includes(path.extname(item))).forEach((item) => {
        try {
            compressionTasks.push(new Promise((resolved, rejected) => {
                const dest = path.join(dir, item);
                const statOfBefore = fs.statSync(dest);
                // core
                tinify.fromFile(dest).toFile(dest, (err) => {
                    if (err)
                        return rejected(err);

                    const statOfAfter = fs.statSync(dest);
                    console.info(`${item} [${colors.green(statOfBefore.size)}] -> ${colors.grey('compress')} -> ${item} [${colors.green(statOfAfter.size)}]`);
                    resolved(statOfBefore.size - statOfAfter.size);
                });
            }));
        } catch (e) {
            /* handle error */
            console.warn(colors.yellow(`compress ${item} has an error: ${e.message}`));
        }
    });

    Promise.all(compressionTasks).then((result) => {
        console.info(`${colors.bgGreen("summary")}: ${ result.reduce((sum, item) => sum += item) }`);
    }).catch(e => console.warn(colors.red(e.message)));
});


