import Vue from "vue"
let modules = {
    //命名空间
    namespaced: true,
    state: {
        cartData: localStorage.cartData ? JSON.parse(localStorage.cartData) : []
    },
    mutations: {
        addItem(state, payload) {
            console.log(JSON.stringify(payload.attrs))
            let isSame = false;
            if (state.cartData.length > 0) {
                for (let key in state.cartData) {
                    console.log
                    if (state.cartData[key].gid === payload.gid && JSON.stringify(state.cartData[key].attrs) === JSON.stringify(payload.attrs)) {
                        isSame = true;
                        state.cartData[key].amount += payload.amount;
                        break;
                    }
                }
            }
            console.log(isSame)
            if (!isSame) {
                state.cartData.push(payload)
            }
            localStorage['cartData'] = JSON.stringify(state.cartData);
        },
        inAmount(state, payload) {
            state.cartData[payload.index].amount++;
            //防止数据更改好不渲染
            Vue.set(state.cartData, payload.index, state.cartData[payload.index])
            localStorage['cartData'] = JSON.stringify(state.cartData);

        },
        deAmount(state, payload) {
            state.cartData[payload.index].amount > 1 ? state.cartData[payload.index].amount-- : 1;
            Vue.set(state.cartData, payload.index, state.cartData[payload.index]);
            localStorage['cartData'] = JSON.stringify(state.cartData);

        },
        delItem(state, payload) {
            state.cartData.splice(payload.index, 1)
            localStorage['cartData'] = JSON.stringify(state.cartData);

        },
        // 选择商品 
        selectItem(state, payload) {
            state.cartData[payload.index].checked = !state.cartData[payload.index].checked;
            Vue.set(state.cartData, payload.index, state.cartData[payload.index])
        },
        // 全选反选
        allSelectItem(state, payload) {
            if (state.cartData.length > 0) {
                for (let key in state.cartData) {
                    state.cartData[key].checked = payload.allchecked;
                }
            }
        }
    },
    getters: {
        total(state) {
            let total = 0;
            if (state.cartData.length > 0) {
                for (let key in state.cartData) {
                    if (state.cartData[key].checked) {
                        total += parseFloat(state.cartData[key].amount * state.cartData[key].price)

                    }
                }
            }

            return parseFloat(total.toFixed(2));
        },
        freight(state) {
            if (state.cartData.length > 0) {
                let freightArr = [];
                for (let key in state.cartData) {
                    if (state.cartData[key].checked) {
                        freightArr.push(state.cartData[key].freight)
                    }
                }
                console.log(freightArr)
                return freightArr.length > 0 ? Math.max.apply(null, freightArr) : 0;

            }
            return 0;
        },

    }
}
export default modules;
