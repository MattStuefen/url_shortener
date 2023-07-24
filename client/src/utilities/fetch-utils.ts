export const getJson = async <T>(url: string, params?: Record<string, string|number>): Promise<T> => {
    const fullUrl = buildUrl(url, params);
    const res = await fetch(fullUrl);
    return <T>(await res.json());
};

const buildUrl = (url: string, params?: Record<string, string|number>): string => {
    const paramString = Object.keys(params ?? {})
        .filter(x => params[x] !== undefined)
        .map(x => `${x}=${params[x]}`).join('&');
    return paramString !== "" ? `${url}?${paramString}` : url;
};

export const post = async (url: string, body: Record<string, string>): Promise<Response> => {
    const bodyStr = JSON.stringify(body);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const res = await fetch(url, {method: "post", body: bodyStr, headers: headers });
    if(res.status < 200 || res.status >= 300)
        throw new Error(res.statusText);
    return res;
};