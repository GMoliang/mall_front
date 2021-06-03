/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/2
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/2
 **/
import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home');
const Profile =() => import('../views/profile/Profile');
const Orders = () => import('../views/order/Orders');
const Cart = () => import('../views/cart/Cart');
const Item = () => import('../views/item/Item')
const ItemList = () => import('../views/item/ItemList')
const ChangePwd = () => import('../views/profile/info/ChangePwd');
const Detail = () => import('../views/profile/info/Detail');
const Favorite = () => import('../views/profile/favorite/Favorite');
const Address = () => import('../views/profile/address/Address');
const Shop = () => import('../views/profile/shop/ShopRegister');
const AliPay = () => import("../views/order/orderDetail/AliPay")

const OrderDetail = () => import('../views/order/orderDetail/OrderDetail');


Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: "home",
        component: Home
    },
    {
        path: '/itemList/:cid3',
        name: "itemList",
        component: ItemList
    },

    {
        path: '/item/:itemId',
        name: "item",
        title: "商品详情",
        component: Item
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/order/detail/:oid',
        name: 'OrderDetail',
        component: OrderDetail,
    },
    {
        path: '/order/alipay/',
        name: 'AliPy',
        component: AliPay,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        children:[ // 其它所有组件都是 profile的子组件
            {
                path: "/",
                redirect: 'info/detail'
            },
            {
                path: "info/detail",
                name: "Detail",
                component: Detail,
            },
            {
                path: "info/address",
                name: "Address",
                component: Address,
            },
            {
                path: "item/favorite",
                name: "favorite",
                component: Favorite,
            },
            {
                path: "info/pwd",
                name: "changePwd",
                component: ChangePwd
            },
            {
                path: 'item/order',
                name:'itemOrder',
                component: Orders
            },
            {
                path: 'cart/listing',
                name:'CartList',
                component: Cart
            },
            {
                path: 'shop/register',
                name:'shopRegister',
                component: Shop
            },


        ]
    }

];


export default new Router({
    routes,
    mode: 'history'
})
