function env() {
    if (window.location.host.indexOf("localhost") >= 0) {
      return "development";
    }else{
      return "production";
    }
}
  
const URLS = {
    development: `http://${window.location.host.replace("3000", "8000")}/`,
    production: ""
};
  
export const API_URL = URLS[env()];
  
export function defaultConfig() {
  return {
    headers: { 'Accept': 'application/json',
    'Content-Type': 'application/json' } 
  }
}