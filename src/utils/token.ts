const TOKEN_KEY = 'token';

export const getToken = (): string | null => 
    document.cookie
        .split('; ')
        .find(row => row.startsWith(`${TOKEN_KEY}=`))
        ?.split('=')[1] || null;
        
export const clearToken = (): void => {
  document.cookie = `${TOKEN_KEY}=; Max-Age=0; path=/;`;
};