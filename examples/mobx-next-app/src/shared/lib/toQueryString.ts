export function toQueryString(params?: Record<string, string | number | boolean | undefined | null>): string {
    if(!params){
        return ''
    }
    const qs = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null) // Убираем `undefined` и `null`
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`) // Кодируем
        .join("&");

    return `?${qs}`
}