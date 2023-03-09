import jwt_decode from "jwt-decode";

export const useJwtDecode = (jwt) => jwt_decode(jwt);
