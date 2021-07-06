

<template>
    <div id="profile">
        <el-container >
            <el-aside style=" height: calc(100vh);" width="200px">
                <v-card
                        class="mx-auto"
                        height="100%"
                        width="300">
                    <v-list>
                        <v-list-item to="/home">
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>
                        <v-list-item  v-for="(item, id) in menus"
                                      :to="basePath + item.path"
                                      v-key="id">
                            <v-list-item-icon>
                                <v-icon>{{item.action}}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>{{item.title}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
<!--                <v-toolbar flat class="transparent">
                    <v-list class="pa-0">
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img src="/assets/2.jpeg">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>文攀</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <v-divider/>-->
                <!-- 左侧菜单 -->

            </el-aside>

            <el-main style="">
                <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item >{{item1}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{item2}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div style="margin-top: 12px">
                        <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
                    <router-view/>

                </div>
            </el-main>

        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        components: {
        },
        data() {
            return {
                dark: false,// 是否暗黑主题
                drawer: true,// 左侧导航是否隐藏
                miniVariant: false,// 左侧导航是否收起
                menuMap: {},
                basePath: "/profile",
                menus: [
                  {
                    action: "mdi-form-textbox-password",
                    title: "修改密码",
                    path: "/info/pwd",
                  },
                  {
                    action: "mdi-map-marker-outline",
                    title: "地址管理",
                    path:"/info/address",
                  },
                  {
                    action: "mdi-star-box-multiple-outline",
                    title: "我的收藏",
                    path:"/item/favorite",
                  },
                  {
                    action: "mdi-reorder-horizontal",
                    title: "我的订单",
                    path:"/item/order",
                  },
                  {
                    action: "mdi-registered-trademark",
                    title: "注册店铺",
                    path:"/shop/register",
                  },
                ]
            }
        },
        computed: {
            items() {
                return this.menus;
            },
          /*  item1() {
                const arr = this.$route.path.split("/");
                console.log(arr);
                console.log(this.menuMap[arr[2]]);
                return this.menuMap[arr[2]].name;
            },
            item2() {
                const arr = this.$route.path.split("/");
                return this.menuMap[arr[2]][arr[3]];
            }*/
        },
        watch: {},
        created() {
            this.menus.forEach(m => {
                const p1 = m.path.slice(1);
                this.menuMap[p1] = {name: m.title};
                m.items.forEach(i => {
                    this.menuMap[p1][i.path.slice(1)] = i.title;
                })
                console.log(this.menuMap);
            })
        }
    }
</script>

<style scoped>

</style>
