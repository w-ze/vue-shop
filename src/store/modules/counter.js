let modules={
    //命名空间
    namespaced:true,
    state:{
        total:1
    },
    mutations:{
        changeTotal(state,payload){
            state.total=payload.count
        }
    }
}
export default modules;
