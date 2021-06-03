

import {request} from "./request";

export function selCommentReviewer(params) {
    return request({
        url: '/comment/selCommentReviewer',
        params
    })
}

export function insComment(data) {
    return request({
        url: '/comment/insComment',
        data,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

