import { getClassifyData } from '../../api/goods/classify/index'
let modules = {
    //命名空间
    namespaced: true,
    state: {
        classifyData: []
    },
    mutations: {
        getClassify(state, payload) {
            console.log(getClassifyData())

            getClassifyData().then(res => {
                console.log(res)
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].checked = false;
                }
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].cid === payload.cid) {
                        res.data[i].checked = true;
                        break;
                    }
                }
                if (res.code === 200) {
                    state.classifyData = res.data;
                }
            })
            if (payload.callback) {
                payload.callback()
            }

        }
    },
    actions: {
        getClassify(conText, payload) {
            conText.commit("getClassify", payload);
        }
    }
}

export default modules