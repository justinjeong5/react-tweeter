exports.loginRequired = (req, res, next) => {
  if (req.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ code: 'loginRequired', message: '로그인이 필요합니다.' })
  }
}
exports.logoutRequired = (req, res, next) => {
  if (req.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ code: 'loginUserAccessDenied', message: '로그인하지 않은 사용자만 접근 가능합니다.' })
  }
}