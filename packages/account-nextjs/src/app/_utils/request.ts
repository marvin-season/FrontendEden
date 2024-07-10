export const request = async (url: string, options: RequestInit = {
  headers: {
    'Content-Type': 'application/json'
  }
}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
  }
};
