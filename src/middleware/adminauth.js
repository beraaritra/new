import jwt from "jsonwebtoken";
require('dotenv').config();
import { NextResponse } from "next/server";

const ADMIN_ACCESS_TOKEN = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxKQHvlUTg16ociIeLSuS
HciM+HILGUZxepVq2zC487kz+HCpequSG/GcTvubxt7itaDtY3dY4++k+D2dUiZB
ZZJUoEkJNoV6hfg5XB8EjAgVGa0B6TrzZVWI74m5z0dPkUTdZkAClvox2hAQ3FoQ
gvkRH1GAvYQOy048BojyEiV/tYHyxDUhCboqx5K1ssyqe2WBxG0LpCo/WrqiXqL5
MaT9lxAU4f6UgvzEpw1fxBewnWG8FBvdBVfKkS0VW4k+gLz7C3UJ5PS/4u8LgWA+
A7WwMJ5ZacnWKGkL/8XJ9uXi0FMh/QQ4+PxopyLWEqJF/QrgJEAutwOQegrSdVAl
BNvomtsj2ir7iuMeElfQKqxqhSn/bU07VqqIfWw+NJLYnrab4sX28OHErlWoWKuv
oIHwADQpQ7fsqRIIG3Y4/Gj1mZ2aote5yO4MXlKCTP8+1xh0sw8LZyRbkKWuEACA
v380neUFZRZ8Zxaix8/93XqYNFRRz8HnBtGzUqv3iYD8fgnm/hLQWMqsAfwaRtI7
DMjzEK+V7KRl5YGrYnSY6AIjfESrnXiJqDMXf5Fz1/6LyqqN40+yfvKW5lfPNirD
qdS+FrsdhDSmfzmDmjFO5n1c91U8dQZrwy2o5r9uvPJMD0AfVlZYmKDvRyLEwsIN
QOTLhiUDTTrF3+Xqmr3LFX0CAwEAAQ==
-----END PUBLIC KEY-----`;
// const secretKey = process.env.ADMIN_ACCESS_TOKEN



console.log(process.env.ADMIN_ACCESS_TOKEN)

const auth = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({authenticationError: true, status: 401, message: "Token not provided" });
      return;
    }

    const tokenParts = token.split(" ");
    const tokentoVerify = tokenParts[1];
    console.log(tokentoVerify);
    
    console.log(ADMIN_ACCESS_TOKEN)

    jwt.verify(
      tokentoVerify,
    //   secretKey,
     ADMIN_ACCESS_TOKEN,
      {"algorithms":["RS256"]},
      (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            reject({authenticationError: true, status: 401, message: "Token expired" });
          } else if (err.name === "JsonWebTokenError") {
            console.log(err)
            reject({authenticationError: true, status: 401, message: "Invalid token" });
          } else {
            reject({authenticationError: true, status: 500, message: "Internal server error" });
          }
          reject()
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = auth;