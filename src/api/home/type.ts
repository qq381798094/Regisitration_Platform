// 定义首页模块的TS类型
export interface IResponseData {
    code: number
    message: string
    ok: boolean
}

// 代表已有的医院数据的TS类型
export interface IHospital {
    id: string
    createTime: string
    updateTime: string
    isDeleted: number
    param: {
        hostypeString: string
        fullAddress: string
    }
    hoscode: string
    hosname: string
    hostype: string
    provinceCode: string
    cityCode: string
    districtCode: string
    address: string
    logoData: string
    intro: string
    route: string
    status: number
    bookingRule: {
        cycle: number
        quitDay: number
        quitTime: string
        releaseTime: string
        stopTime: string
        rule: string[]
    }
}

// 存储全部已有医院数组的类型
export type Content = IHospital[];

// 获取已有医院接口返回的数据TS类型
export interface IHospitalResponseData extends IResponseData {
    data: {
        content: Content
        pageable: {
            sort: {
                sorted: boolean
                unsorted: boolean
                empty: boolean
            }
            pageNumber: number
            pageSize: number
            offset: number
            paged: boolean
            unpaged: boolean
        }
        totalPages: number
        totalElements: number
        last: boolean
        first: boolean
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        numberOfElements: number
        size: number
        number: number
        empty: boolean
    }
}

// 医院等级或者医院地区的TS类型
export interface IHospitalLevelAndRegion {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {},
    parentId: number,
    name: string,
    value: string,
    dictCode: string,
    hasChildren: boolean
}
// 给数组绑定一个类型，数组的每一个元素都是上面那个类型
export type HospitalLevelAndRegionArr = IHospitalLevelAndRegion[];

// 获取等级或者医院地区接口所返回的数据类型
export interface HospitalLevelAndRegionResponseData extends IResponseData {
    data: HospitalLevelAndRegionArr
}

// 医院搜索结果数据类型约束
export interface IHospitalInfo extends IResponseData {
    data: Content
}