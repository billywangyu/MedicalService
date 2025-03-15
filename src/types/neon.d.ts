// types/neon.d.ts
import { QueryResult } from '@neondatabase/serverless';

declare module '@neondatabase/serverless' {
  interface ServerlessClient {
    /**
     * 执行 SQL 查询并返回类型化结果
     */
    sql<T = any>(query: string, params?: any[]): Promise<T[]>;
  }
}
