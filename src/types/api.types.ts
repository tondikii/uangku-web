export interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
