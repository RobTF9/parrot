async function http<T>(endpoint: RequestInfo, config: RequestInit): Promise<T> {
  const request = new Request(endpoint, config);
  try {
    const response = await fetch(request);
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function get<T>(
  endpoint: string,
  config?: RequestInit
): Promise<T> {
  const init = { method: 'GET', ...config };
  const response = await http<T>(endpoint, init);
  return response;
}

export async function post<T, U>(
  endpoint: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = {
    method: 'POST',
    body: JSON.stringify(body),
    ...config,
  };
  const response = await http<U>(endpoint, init);
  return response;
}

export async function put<T, U>(
  endpoint: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = {
    method: 'PUT',
    body: JSON.stringify(body),
    ...config,
  };
  const response = await http<U>(endpoint, init);
  return response;
}
