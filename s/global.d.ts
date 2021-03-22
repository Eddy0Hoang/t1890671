/*
 * @Date: 2021-03-17 19:33:07
 * @LastEditTime: 2021-03-17 19:34:32
 * @FilePath: \server\global.d.ts
 * @Description: TODO:
 */

declare module "*.json"
{ const value: any;
  export default value;
}

// This will allow you to load JSON from remote URL responses

declare module "json!*"
{ const value: any;
  export default value;
}