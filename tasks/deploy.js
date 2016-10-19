var https = require('https');
var parse = require('url').parse;
var fs = require('fs');

module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('artdeploy', 'Task for deploying artifacts to JFrog Artifactory', function () {
        var done = this.async();
        var options = this.options();
        var urlObj = parse(options.repositoryPath);
        var targetPath = options.targetPath;
        var requestOptions = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + '/' + targetPath + '/' + options.version + '/' + targetPath + '.tgz',
            method: 'PUT',
            headers: {
                'X-JFrog-Art-Api': options.apiKey
            }
        };

        fs.createReadStream(options.packagePath)
            .pipe(https.request(requestOptions, function (response) {
                    if (response.statusCode === 201) {
                        grunt.log.writeln('Artifact successfully deployed.');
                        done();
                    } else {
                        grunt.log.error('Unexpected error from ' + urlObj.hostname);
                        done(false);
                    }
                })
            );
    });
};
