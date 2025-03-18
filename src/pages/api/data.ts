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

const sql = neon(process.env.DATABASE_URL!);
async function query<T>(queryText: string, params?: any[]): Promise<T[]> {
  const result = await sql(queryText, params);
  return result as T[];
}

// 定义每种类型对应的表名
const typeToTableMap: Record<string, string> = {
  medical: 'medical_services',
  city: 'cities_towns',
  ethnic_group: 'ethnic_groups',
  attraction: 'attractions',
  food: 'foods',
  hotel: 'hotels',
  transport: 'transports',
  local_product: 'local_products',
  festival: 'festivals',
  local_weather: 'local_weather',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    // 只允许 GET 请求
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { type, cityId } = req.query;

    // 检查 type 参数是否存在
    if (!type) {
      return res.status(400).json({ error: 'Type parameter is required' });
    }

    // 检查 type 是否有效
    if (!Object.keys(typeToTableMap).includes(type as string)) {
      return res.status(400).json({ error: 'Invalid type parameter' });
    }

    // 检查 cityId 是否必需
    const requiresCityId = type !== 'city';
    if (requiresCityId && !cityId) {
      return res.status(400).json({ error: 'cityId is required for this type' });
    }

    // 动态生成查询语句
    const tableName = typeToTableMap[type as string];
    const queryText = requiresCityId
      ? `SELECT * FROM ${tableName} WHERE city_town_id = $1`
      : `SELECT * FROM ${tableName} ORDER BY distance_from_chengdu ASC`;
    const queryParams = requiresCityId ? [cityId] : [];

    // 执行查询
    const result = await query(queryText, queryParams);

    // 返回结果
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
