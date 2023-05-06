const svgCaptcha = require('svg-captcha');


exports.getCode = (req, res) => {
  
  let codeConfig = {
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    height: 37.5,
    width: 101

  }
  let captcha = svgCaptcha.create(codeConfig);
  req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
  
  
  let codeData = {
    img: captcha.data
  }
  res.json(codeData);
}