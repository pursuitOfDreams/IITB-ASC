const bcrypt = require('bcrypt');
const pass = "abcd";
const passwordValid = bcrypt.compareSync(pass, "fc4b5fd6816f75a7c81fc8eaa9499d6a299bd803397166e8c4cf9280b801d62c");
console.log(passwordValid)
