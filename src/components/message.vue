<template>
    <!-- <transition name="message-fade"> -->
        <div class="message" v-show="show">
        <span class="icon"></span>
            <p>{{message}}</p>
        </div>
    <!-- </transition> -->
</template>

<script>
    export default {
        name: 'v-message',
        mounted() {
            this.StartTime();
        },
        data() {
            return {
                message: '123',
                show: false,
                timer: null
            }
        },
        methods: {
            StartTime() {
                this.show = true;
                if (this.timer) {
                    clearTimeOut(this.timer)
                } else {
                    this.timer = setTimeout(() => {
                        this.show = false
                    }, 3000);
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .message {
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 30px;
        background-color: #1b1b1b;
        color: white;
        z-index: 1000000;
        border-radius: 10px;
    }
</style>