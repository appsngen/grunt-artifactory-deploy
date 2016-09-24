# grunt-artifactory-deploy

> Deploy artifacts to JFrog Artifactory.

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-artifactory-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-artifactory-deploy');
```


## Artifactory deploy task
_Run this task with the `grunt artdeploy` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### api_key
Type: `String`  

API key from your account.

#### repository_path
Type: `String`

Url to artifact repository.

#### target_path
Type: `String`

Target file path at repository.

#### package_path
Type: `String`

Path to target `.tgz` file for deploy.
