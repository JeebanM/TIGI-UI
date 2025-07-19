

export const apiCall = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
  
    return response.json();
  };
  

