export const request = async ({
                                url,
                                data = undefined,
                                config = {
                                  method: 'GET',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  }
                                },
                                request = null
                              }) => {

  const input = request || new Request(url, {
    ...config,
    body: JSON.stringify(data),
  });

  return fetch(input).then(res => res.json());
}