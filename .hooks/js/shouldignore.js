(function () {
    'use strict';

    var fs = require('fs');
    var path = require('path');
    var minimatch = require('minimatch');
    var endOfLine = require('os').EOL;
    var fileToCheck = process.argv[2];
    var i, maskPathRelativeToRepoRoot, shouldIgnoreChangedFile, posixCWD, posixDirname;

    var ignores = fs.readFileSync(path.join(__dirname, 'ignore.txt'))
        .toString('utf-8')
        .split(endOfLine)
        .filter(function (ignoreMask) {
            // skip empty strings and comments
            return ignoreMask && !ignoreMask.startsWith('#');
        });

    if (!fileToCheck) {
        console.log('Expected to check a file, but got nothing');
        process.exit(-1);
    }

    shouldIgnoreChangedFile = false;
    posixCWD = process.cwd().split('\\').join('/');
    posixDirname = __dirname.split('\\').join('/');

    for (i = 0; i < ignores.length; i++) {
        // assume that cwd for the hook is repo root
        maskPathRelativeToRepoRoot = path.posix.relative(posixCWD, path.posix.join(posixDirname, ignores[i]));

        if (minimatch(fileToCheck.toLowerCase(), maskPathRelativeToRepoRoot.toLowerCase())) {
            shouldIgnoreChangedFile = true;
            break;
        }
    }

    console.log(shouldIgnoreChangedFile);
    process.exit(0);
}());
