const API_URL = import.meta.env.VITE_API_URL || 'http://travelairwings.com/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    console.log(`📍 Base URL: ${this.baseUrl}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors', // Explicitly set CORS mode
      });

      console.log(`📡 API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        console.error(`❌ API Error:`, error);
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API Success:`, Array.isArray(data) ? `${data.length} items` : 'data received');
      return data;
    } catch (error: any) {
      console.error(`❌ API request failed: ${url}`);
      console.error(`❌ Error details:`, error);
      console.error(`❌ Error message:`, error.message);
      console.error(`❌ Error name:`, error.name);
      
      // Provide more helpful error messages
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        throw new Error(`Cannot connect to backend API at ${this.baseUrl}. Please ensure backend is running on port 3001.`);
      }
      
      // Re-throw to let React Query handle it
      throw error;
    }
  }

  // Packages
  async getPackages(featured?: boolean) {
    const params = featured !== undefined ? `?featured=${featured}` : '';
    return this.request<any[]>(`/packages${params}`);
  }

  async getPackage(id: string) {
    return this.request<any>(`/packages/${id}`);
  }

  // Services
  async getServices() {
    return this.request<any[]>('/services');
  }

  // Pages
  async getPages() {
    return this.request<any[]>('/pages');
  }

  async getPageBySlug(slug: string) {
    return this.request<any>(`/pages/slug/${slug}`);
  }

  // Blogs
  async getBlogs(limit?: number, offset?: number) {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ blogs: any[]; total: number; limit: number; offset: number }>(`/blogs${query}`);
  }

  async getBlogBySlug(slug: string) {
    return this.request<any>(`/blogs/slug/${slug}`);
  }

  // Settings
  async getSettings() {
    return this.request<Record<string, any>>('/settings');
  }

  // Enquiries
  async createEnquiry(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    return this.request<any>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(API_URL);

