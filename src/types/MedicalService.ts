// types/MedicalService.ts
/**
 * BaseEntity - 基础实体接口
 */
interface BaseEntity {
  id: string; // UUID 类型
  city_town_id: string; // UUID 类型
  created_at: string; // 时间戳
}

/**
 * MedicalService - 医疗服务信息接口
 */
export interface MedicalService extends BaseEntity {
  name: string; // 医疗服务名称
  type: string; // 服务类型
  contact_info: string | null; // 联系方式
  operating_hours: string | null; // 营业时间
  address: string | null; // 地址
  emergency_service: boolean; // 是否提供急诊服务
  description: string | null; // 描述
}

/**
 * City - 城市信息接口
 */
export interface City {
  id: string; // 城市 ID
  name: string; // 城市名称
  province: string; // 省份
  altitude: number; // 海拔
  area: number; // 面积
  population: number; // 人口
  distance_from_chengdu: number; // 距离成都的距离
  description: string; // 描述
  created_at: string; // 创建时间
}

/**
 * EthnicGroup - 民族信息接口
 */
export interface EthnicGroup {
  id: string; // UUID 类型
  cityTownId: string; // 关联的城镇 ID
  name: string; // 民族名称
  population: number; // 民族人口数量
  description?: string; // 可选字段，描述
  createdAt: Date; // 创建时间
}

/**
 * Attraction - 景点表接口
 */
export interface Attraction extends BaseEntity {
  name: string; // 景点名称
  type: string; // 景点类型
  description?: string; // 描述
  entrance_fee?: number; // 门票价格
  rating?: number; // 评分
}

/**
 * Food - 美食表接口
 */
export interface Food extends BaseEntity {
  name: string; // 美食名称
  type: string; // 美食类别
  description?: string; // 美食描述
  is_local_specialty?: boolean; // 是否为当地特色
  recommended_reason?: string; // 推荐理由
  price_range?: string; // 价格区间
  recommended_restaurant?: string; // 推荐餐馆
  rating?: number; // 评分
}

/**
 * Hotel - 酒店表接口
 */
export interface Hotel extends BaseEntity {
  name: string; // 酒店名称
  type: string; // 酒店类型
  description?: string; // 描述
  price_range?: string; // 价格区间
  rating?: number; // 评分
}

/**
 * Transport - 交通方式表接口
 */
export interface Transport extends BaseEntity {
  type: string; // 交通方式
  description?: string; // 描述
  price_range?: string; // 价格区间
}

/**
 * LocalProduct - 特产表接口
 */
export interface LocalProduct extends BaseEntity {
  name: string; // 特产名称
  type: string; // 类型
  description?: string; // 描述
  price_range?: string; // 价格区间
  recommended_store?: string; // 推荐商店
  rating?: number; // 评分
}

/**
 * Festival - 节日活动表接口
 */
export interface Festival extends BaseEntity {
  name: string; // 节日名称
  date: string; // 日期
  description?: string; // 节日描述
  main_activities?: string; // 主要活动
  cultural_significance?: string; // 文化意义
  expected_visitors?: number; // 预期游客人数
}

/**
 * LocalWeather - 当地天气表接口
 */
export interface LocalWeather extends BaseEntity {
  recorded_at: string; // 记录时间
  temperature?: number; // 温度
  weather_condition?: string; // 天气情况
  wind_speed?: number; // 风速
  humidity?: number; // 湿度
  visibility?: number; // 能见度
  sunrise?: string; // 日出时间
  sunset?: string; // 日落时间
}
