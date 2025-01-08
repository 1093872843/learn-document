# cookie 和 token 都存放在 header 中，为什么不会劫持 token？

token主要是为了防止csrf攻击，浏览器会自动带上cookie但是不会自动带上token，所以cookie更容易被劫持
