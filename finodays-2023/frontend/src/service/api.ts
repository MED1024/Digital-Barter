async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config)
  const response = await fetch(request)

  if (!response.ok) {
    throw new Error(`name:${response.status} message:${response.statusText}`)
  }

  // may error if there is no body, return empty array
  return response.json().catch(() => ({}))
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'get', ...config }
  return await http<T>(path, init)
}

export async function post<T, U>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<U> {
  const init = { method: 'post', body: JSON.stringify(body), ...config }
  return await http<U>(path, init)
}

export async function put<T, U>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<U> {
  const init = { method: 'put', body: JSON.stringify(body), ...config }
  return await http<U>(path, init)
}

// Пример использования
// type RequestBody = {
// 	userId: number
// 	title: string
// 	body: string
// }

// type ResponseBody = RequestBody & {
// 	id: string
// }

// const newPost = {
// 	userId: 1,
// 	title: 'my post',
// 	body: 'some content',
// }

// const response = await fetch.post<RequestBody, ResponseBody>(
// 	'https://jsonplaceholder.typicode.com/posts',
// 	newPost
// )
