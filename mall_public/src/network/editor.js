
import {request} from "./request";

export default function uploadImages(formData) {
    return request({
        url: '/file/import',
        params: {
            file: formData
        },
        method: "post",
    })
}
