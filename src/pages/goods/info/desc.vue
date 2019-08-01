<template>
    <div>
        <div class="desc" ref="desc">
            {{ goodsInfoData.bodys }}
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { lazyImg } from "../../../assets/js/libs/utils";
import Swiper from "../../../assets/js/libs/swiper/swiper";

let { mapState, mapMutations } = createNamespacedHelpers("goodsInfo")
export default {
    components: {},
    props: {},
    data() {
        return {
        }
    },
    watch: {},
    computed: {
        ...mapState(["goodsInfoData"])
    },
    methods: {},
    created() {
        // console.log(this.goodsInfoData.bodys)

    },
    mounted() {
        console.log(this.goodsInfoData.bodys)
        this.$refs["desc"].innerHTML = this.goodsInfoData.bodys
    }
}
</script>
<style scoped>
.desc {
    background: rgb(239, 239, 239);
    width: 100%;
}
</style>