<template>
    <div v-if="initRender">
        <Navbar :staticData="pageStaticData.header"/>
        <router-view />
        <Footer :logo="pageStaticData.logo" :staticData="pageStaticData.footer" />
    </div>
</template>

<script>
    import axios from 'axios';
    import { ref, reactive, onMounted, computed } from 'vue';

    import Navbar from './components/Navbar/Navbar';
    import Footer from './components/Footer/Footer';

    export default {
        name: "Ui",

        components: {
            Navbar,
            Footer
        },

        setup() {
            const pageStaticData = ref();
            const initRender = ref(false);

            const getPageStatics = () => {
                axios.get('/api/page-statics')
                    .then((response) => {
                        pageStaticData.value = response.data;
                        initRender.value = true;
                    })
                    .catch((error) => {

                    });
            }

            onMounted(() => {
                getPageStatics()
            });

            return {
                initRender,
                pageStaticData
            }
        }
    };
</script>