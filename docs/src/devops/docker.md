# Docker


## Concepts

[Dockerhub](hub.docker.com){target}


## Dockerfile

```bash
# file: Dockerfile


```

## Docker Compose

Need an OS with Java installed - One such image is amazoncorretto
amazoncorretto - different images for same java version based on feature included
- alpine : 

```yaml
# file: docker-compose.yml
FROM amazoncorretto:21.0.2-alpine3.19       # Base image to provide os and jdk
COPY build/libs/my-app.jar app.jar          # copy the jar to root of the OS
ENTRYPOINT ["java","-jar","/app.jar"]       # java -jar build/libs/app.jar

docker build -t a04t/imagename:v01 .        # intel
docker build  --platform linux/amd64 -t a04t/imagename:v01 . # mac chips
```

## Package Managers in base images

- There are several Linux distributions and the different ways they manage packages.
- Knowing how to use multiple package managers can prove life-saving for downloading or installing software from repositories, plus updating, handling dependencies and uninstalling software.
- Example - Dockerfile with `` will have apt package available which can be explored [here](https://hub.docker.com/layers/library/gradle/5.6.2-jdk11/images/sha256-cce6d30de651d794d051670726f79e2721cf9954b19dd6888cf08386821624fa){target="_blank"}
- [5 Best Linux Package Managers for Linux Newbies](https://www.tecmint.com/linux-package-managers/){target="_blank"}

```Dockerfile
FROM gradle:5.6.2-jdk11

RUN apt-get update && apt-get install -y bash git curl zip unzip locales
```

## Difference between Docker Images

- [Difference Between Openjdk Docker Images: Slim vs Slim-Stretch vs Stretch vs Alpine](https://www.baeldung.com/ops/java-openjdk-docker-images-slim-vs-slim-stretch-vs-stretch-vs-alpine){target="_blank"}
