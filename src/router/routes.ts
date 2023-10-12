export default [
    {
        path: '/home',
        component: () => import("@/pages/home/index.vue"),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/hospital',
        component: () => import("@/pages/hospital/index.vue"),
        children: [
            {
                path: 'register',
                component: () => import("@/pages/hospital/register/index.vue"),
                meta: { title: '预约挂号' }
            },
            {
                path: 'registerDetail',
                component: () => import("@/pages/hospital/register/register_detail.vue"),
                meta: { title: '预约第一步' }
            },
            {
                path: 'registrationPage',
                component: () => import("@/pages/hospital/register/registration_page.vue"),
                meta: { title: '预约第二步' }
            },
            {
                path: 'detail',
                component: () => import("@/pages/hospital/detail/index.vue"),
                meta: { title: '医院详情' }
            },
            {
                path: 'notice',
                component: () => import("@/pages/hospital/notice/index.vue"),
                meta: { title: '预约通知' }
            },
            {
                path: 'close',
                component: () => import("@/pages/hospital/close/index.vue"),
                meta: { title: '停诊信息' }
            },
            {
                path: 'search',
                component: () => import("@/pages/hospital/search/index.vue"),
                meta: { title: '查询/取消' },
            }
        ]
    },
    {
        path: '/wxlogin',
        component: () => import("@/pages/wxLogin/index.vue"),
    },
    {
        path: '/user',
        component: () => import("@/pages/vip/index.vue"),
        children: [
            {
                path: 'profile',
                component: () => import('@/pages/vip/profile/index.vue'),
                meta: { title: '账号信息' },
            },
            {
                path: 'patient',
                component: () => import('@/pages/vip/patient/index.vue'),
                meta: { title: '就诊人管理' }
            },
            {
                path: 'order',
                component: () => import('@/pages/vip/order/index.vue'),
                meta: { title: '挂号订单' }
            },
            {
                path: 'feedback',
                component: () => import('@/pages/vip/feedback/index.vue'),
                meta: { title: '意见反馈' }
            },
            {
                path: 'certification',
                component: () => import('@/pages/vip/certification/index.vue'),
                meta: { title: '实名认证' }
            }
        ]
    },
    {
        path: '/',
        redirect: '/home'
    }
]