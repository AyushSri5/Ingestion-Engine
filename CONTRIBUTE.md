## Docker Installation

    - Install docker
    - Create a network - docker create network node-app
    - Start postgres
        - docker run -p 5432:5432 --name postgres --network node-app -e POSTGRES_PASSOWORD=mysecretpassword
    - Build the image - docker build -p 3000:3000 --network node-app node-project .  
    - Run the image - docker run --network node-app node-project

## Docker Compose Steps
    - Install docker docker compose 
    - Run `docker compose up`