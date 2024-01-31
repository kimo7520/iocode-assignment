import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  flattenObject(obj: any): any[] {
    const result: any[] = [];
  
    function recurse(current: {[key:string]: string}, path: string[] = []) {
      for (const key in current) {
        const value = current[key];
  
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            recurse(value[i], path.concat(`${key}[${i}]`));
          }
        } else if (typeof value === 'object' && value !== null) {
          recurse(value, path.concat(key));
        } else {
          result.push({ path: path.concat(key).join('.'), value });
        }
      }
    }
  
    recurse(obj);
    return result;
  }
}
