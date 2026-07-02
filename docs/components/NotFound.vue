<template>
    <div class="container flex-column">
        <h1>Not Found !</h1>
        <div class="flex-column">
            <img id="404-2" src="https://i.pinimg.com/736x/a3/be/7b/a3be7bf75029c1eb317746fa5bc021b3.jpg" />
            <img id="404-1" src="https://elementor.com/cdn-cgi/image/f=auto,w=1201/blog/wp-content/uploads/2021/03/Redesign-Your-Website_8.png"/>
            <img id="404-2" src="https://miro.medium.com/v2/resize:fit:1400/1*ASPrAbd2qtFVSVuru7Y7Rw.png" />
        </div>        
    </div>    
</template>

<script setup>
    console.log('Default Layout slots not-found')
</script>

<style scoped>
* {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    
        .container {
            margin: 5rem auto;
        }

        .flex-column {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: linear-gradient(135deg, #1e1e2f, #2b2b45);
            color: white;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        div {
            max-width: 1000px;
            padding: 20px;
        }

        h1 {
            font-size: 4rem;
            margin-bottom: 30px;
            letter-spacing: 2px;
            animation: fadeIn 0.5s ease-in-out;
        }

        img {
            width: 100%;
            max-width: 500px;
            margin: 15px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 1.5s ease-in-out;
        }

        img:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
            h1 {
                font-size: 2.5rem;
            }

            img {
                width: 90%;
            }
        }
</style>
