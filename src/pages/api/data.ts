// pages/api/data.ts
import { neon } from '@neondatabase/serverless';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  MedicalService,
  City,
  EthnicGroup,
  Attraction,
  Food,
  Hotel,
  Transport,
  LocalProduct,
  Festival,
  LocalWeather,
} from '../../types/MedicalService';

// 封装 neon 函数，添加类型支持
const sql = neon(process.env.DATABASE_URL!);
async function query<T>(queryText: string, params?: any[]): Promise<T[]> {
  const result = await sql(queryText, params);
  return result as T[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | MedicalService[]
    | City[]
    | EthnicGroup[]
    | Attraction[]
    | Food[]
    | Hotel[]
    | Transport[]
    | LocalProduct[]
    | Festival[]
    | LocalWeather[]
    | { error: string }
  >
) {
  // 只允许 GET 请求
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { type, cityId } = req.query;

    // 检查 type 参数是否存在
    if (!type) {
      res.status(400).json({ error: 'Type parameter is required' });
      return;
    }

    switch (type) {
      case 'medical':
        // 查询医疗服务
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=medical' });
          return;
        }
        const medicalQuery = 'SELECT * FROM medical_services WHERE city_town_id = $1';
        const medicalResult = await query<MedicalService>(medicalQuery, [cityId]);
        res.status(200).json(medicalResult);
        break;

      case 'city':
        // 查询所有城市
        const cityQuery = 'SELECT * FROM cities_towns ORDER BY distance_from_chengdu ASC';
        const cityResult = await query<City>(cityQuery);
        res.status(200).json(cityResult);
        break;

      case 'ethnic_group':
        // 查询民族信息
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=ethnic_group' });
          return;
        }
        const ethnicGroupQuery = 'SELECT * FROM ethnic_groups WHERE city_town_id = $1';
        const ethnicGroupResult = await query<EthnicGroup>(ethnicGroupQuery, [cityId]);
        res.status(200).json(ethnicGroupResult);
        break;

      case 'attraction':
        // 查询景点信息
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=attraction' });
          return;
        }
        const attractionQuery = 'SELECT * FROM attractions WHERE city_town_id = $1';
        const attractionResult = await query<Attraction>(attractionQuery, [cityId]);
        res.status(200).json(attractionResult);
        break;

      case 'food':
        // 查询美食信息
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=food' });
          return;
        }
        const foodQuery = 'SELECT * FROM foods WHERE city_town_id = $1';
        const foodResult = await query<Food>(foodQuery, [cityId]);
        res.status(200).json(foodResult);
        break;

      case 'hotel':
        // 查询酒店信息
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=hotel' });
          return;
        }
        const hotelQuery = 'SELECT * FROM hotels WHERE city_town_id = $1';
        const hotelResult = await query<Hotel>(hotelQuery, [cityId]);
        res.status(200).json(hotelResult);
        break;

      case 'transport':
        // 查询交通方式信息
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=transport' });
          return;
        }
        const transportQuery = 'SELECT * FROM transports WHERE city_town_id = $1';
        const transportResult = await query<Transport>(transportQuery, [cityId]);
        res.status(200).json(transportResult);
        break;

      case 'local_product':
        // 查询特产信息
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=local_product' });
          return;
        }
        const localProductQuery = 'SELECT * FROM local_products WHERE city_town_id = $1';
        const localProductResult = await query<LocalProduct>(localProductQuery, [cityId]);
        res.status(200).json(localProductResult);
        break;

      case 'festival':
        // 查询节日活动信息
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=festival' });
          return;
        }
        const festivalQuery = 'SELECT * FROM festivals WHERE city_town_id = $1';
        const festivalResult = await query<Festival>(festivalQuery, [cityId]);
        res.status(200).json(festivalResult);
        break;

      case 'local_weather':
        // 查询当地天气信息
        if (!cityId) {
          res.status(400).json({ error: 'cityId is required for type=local_weather' });
          return;
        }
        const localWeatherQuery = 'SELECT * FROM local_weather WHERE city_town_id = $1';
        const localWeatherResult = await query<LocalWeather>(localWeatherQuery, [cityId]);
        res.status(200).json(localWeatherResult);
        break;

      default:
        // 处理不支持的 type 参数
        res.status(400).json({ error: 'Invalid type parameter' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
