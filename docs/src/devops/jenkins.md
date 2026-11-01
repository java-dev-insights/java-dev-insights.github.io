# Jenkins


- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/) :arrow_upper_right:
- Don't forget to leave a star on our repository! :star:

Jenkins is an open source automation server.  
It helps automate the parts of software development related to building, testing, and deploying.

## get a property

This happens because printenv shows environment variables, but in your build.gradle you are using System.getProperty('CI'), which reads Java system properties, not environment variables.

To access the CI environment variable in build.gradle, use System.getenv('CI') instead:

```sh
println "####### CI: ${System.getenv('CI')}"
if (System.getenv('CI') == 'true') {
    // your logic here
}
```

## Http Request Plugin

- [HTTP Request Plugin](https://www.jenkins.io/doc/pipeline/steps/http_request/#http-request-plugin){target="_blank"}

## Using Docker with Pipeline

[![Jenkins Minute - Using a Dockerfile with Jenkins Pipeline](http://img.youtube.com/vi/Pi2kJ2RJS50/0.jpg)](http://www.youtube.com/watch?v=Pi2kJ2RJS50){target="_blank"}

- [Using Docker with Pipeline](https://www.jenkins.io/doc/book/pipeline/docker/){target="_blank"}

```groovy
pipeline {
    agent {
        docker { image 'node:24.13.1-alpine3.23' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --eval "console.log(process.platform,process.env.CI)"'
            }
        }
    }
}
```
