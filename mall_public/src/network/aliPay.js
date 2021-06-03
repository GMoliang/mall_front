import {request} from "./request";

export function aliPcPay(data) {
    return request( {
        url: '/ali/pay',
        params: {
            data
        }
    })
}

