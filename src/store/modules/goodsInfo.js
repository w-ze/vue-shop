import { getContentData } from "../../api/goods/info/content"
import { getCommentData } from "../../api/goods/info/comment"
import { getAttrData } from "../../api/goods/info/attr";
let modules = {
    namespaced: true,
    state: {
        goodsInfoData: [],
        commentsData: [],
        isCommentsNull: true,
        attrData: [],
        pageInfo: { 123: 123 }
    },
    mutations: {
        getContent(state, payload) {
            // console.log(123)
            getContentData(payload.gid).then(res => {
                // console.log(res)
                if (res.code === 200) {
                    state.goodsInfoData = res.data;
                }
            })
            if (payload.callback) {
                payload.callback()
            }
        },
        getComment(state, payload) {
            console.log(payload)

            getCommentData(payload.gid, payload.curPage).then(res => {
                if (res.code === 200) {
                    state.commentsData = res.data;
                    state.pageInfo = res.pageinfo;
                    state.isCommentsNull = false
                } else {
                    state.isCommentsNull = true
                }
            })
            if (payload.callback) {
                payload.callback()
            }
        },
        getAttr(state, payload) {
            getAttrData(payload.gid).then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res.data[i].values.length; j++) {
                        res.data[i].values[j].checked = false;
                    }
                }
                // console.log(res)

                if (res.code === 200) {
                    state.attrData = res.data;
                }
            })
        }
    },
    actions: {
        getContent(conText, payload) {
            conText.commit("getContent", payload);
        },
        getComment(conText, payload) {
            conText.commit("getComment", payload);
        },
        getAttr(conText, payload) {
            conText.commit("getAttr", payload);
        },
    }
}

export default modules;