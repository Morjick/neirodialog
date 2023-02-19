export default async function findPermissions(authorization: string, permission: string, jwt) {
  if (!authorization) return {
    message: 'Не удалось пройти авторизацию',
    ok: false,
    status: 401
  }
  const token = authorization.split(' ')[1]
  const verify = jwt.verify(token, {
    secret: process.env.JWT_SECRET_KEY
  })

  if (verify.permissons && Array.isArray(verify.permissons)) {
    const permisson = verify.permissons.find(el => el == permission)

    if (!permisson) {
      return {
        message: 'У вас нет доступа для выполнения этого действия',
        ok: false,
        sucses: false,
        status: 301
      }
    } else {
      return {
        message: 'Права доступа подтверждены',
        ok: true,
        sucses: true,
        status: 200
      }
    }
  } else {
    return {
      message: 'У вас нет доступа для выполнения этого действия',
      ok: false,
      sucses: false,
      status: 301
    }
  }
}