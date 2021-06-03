import {request} from "./request";



//查看物流信息
export function expressDetail() {
    return request({
        url: '/express/detail',
    })
}
