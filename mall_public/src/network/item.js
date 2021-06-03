/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/3
 **/

import {request} from "./request";


export function getSpuBySpuId(spuId) {
    return request( {
        url: "/item/getItem",
        params: {
            spuId
        }
    })
}



// 根据用户查询商品
export function selectGoodsByUser() {
    return request({
        url:"/goods/getByUser",
    })
}

// 根据用户查询商品
export function selectAllGoods() {
    return request({
        url:"/goods/all",
    })
}


//查询所有商品
export function getAllGoods() {
    return request({
        url:"/goods/listing",
    })
}

//该商品是否点赞
export function getItemStarState(userId,spuId) {
    return request( {
        url: '/favorite/getItemStart',
        params: {
            userId,
            spuId,
        }
    })
}

/**
 * //用户给商品点赞
 * @param gid
 * @returns {AxiosPromise}
 */
export function getItemStar(userId,spuId) {
    return request( {
        url: '/favorite/collectItem',
        params: {
            userId
        },
        data: spuId,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

/**
 * 用户取消点赞
 * @param gid
 * @returns {AxiosPromise}
 */
export function cancelItemStar(userId,spuId) {
    return request( {
        url: '/favorite/cancleItem',
        params: {
            userId
        },
        data: spuId,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

//添加购物车
export function addCartItem(item) {
    return request( {
        url: '/cart/addCartItem',
        data: item,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

//根据用户查询购物车
export function selectCart(userId) {
    return request( {
        url: '/cart/selectCart',
        params: {
            userId
        },
        method: "get",
    })
}

//修改购物车数量
export function updateCartCount(cartDO) {
    return request( {
        url: '/cart/addItemCount',
        data:cartDO,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

//删除购物车
export function deleteCartItem(cartId) {
    return request( {
        url: '/cart/deleteCartItem',
        data: cartId,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

//根据用户查询购物车
export function selectItemList(cid3) {
    return request( {
        url: '/item/getItemList',
        params: {
            cid3
        },
        method: "get",
    })
}
//查询商品分类列表
export function categoryList(){
    return request({
        url: '/category/listing',
    })
}
//查询商品收藏表
export function favoriteList(userId){
    return request({
        url: '/favorite/getFavoriteList',
        params: {
            userId
        },
        method: "get",
    })
}

//删除收藏
export function deleteFavoriteItem(userId,spuId){
    return request({
        url: '/favorite/cancleItem',
        params: {
            userId
        },
        data:spuId,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

