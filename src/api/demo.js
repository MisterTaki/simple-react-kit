import { request } from '@/service';

export default async function test(params) {
  return request.get('/api/demo', { params });
}
