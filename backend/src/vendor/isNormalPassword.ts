import createHref from "./createHref"

export default async function checkPassword(password: string, name?: string) {
  if(!password.split(' ').join('').length) return {
    message: 'Не используйте, пожалуйста, пробела',
    normal: false,
    warning: false
  }

  if(name && (password == name || name.toLocaleLowerCase() == await createHref(password) )) {
    return {
      message: 'Не используйте в качестве пароля своё имя, даже в транслите',
      normal: false,
      warning: false
    }
  }

  if(password.includes('1234') || password.includes('qwer') || password.includes('zxcv') || password.includes('123456789')) return {
    message: 'Старайтесь избегать в пароле сочитания цифр от 1 до 9 и буквенно-строчные сочитания (например, qwerty). Так злоумышленник сможет легко Вас взломать',
    normal: false,
    warning: false
  }

  if(password.includes('password') || password.includes('0000') || password.includes('1111')  || password.includes('2222')) return {
    message: 'Пароль слишком простой',
    normal: false,
    warning: false
  }

  if(password.includes('00')) return {
    message: 'Не советуется использовать год рождения',
    normal: true,
    warning: true
  }
  
  return {
    message: 'Пароль отлично подошёл',
    normal: true,
    warning: false
  }
}