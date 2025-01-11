import {jwtDecode} from 'jwt-decode';

export function addDaysToDate(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const isTokenExpired = (token: string | undefined): boolean => {
    if (!token) return true;
    
    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken.exp) return true;
        const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch {
      return true;
    }
  };

    
