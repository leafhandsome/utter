<template>
    <div>
        <div>
            <ali-upload :url.sync="uploadUrl" :multiple="true" :id="uploadId" :code.sync="uploadCode"></ali-upload>
        </div>
        <div v-for="url in uploadUrl">
            ![](url)
        </div>
    </div>
</div>
</template>
<script>
    import aliUpload from './upload.vue';
    export default {
        components: {
            aliUpload
        },
        data() {
            return {
                uploadUrl: [],
                uploadId: 'file',
                uploadCode: 0
            };
        },
        watch: {
            uploadCode(val) {
                console.info(val)
            }
        }
    };
</script>