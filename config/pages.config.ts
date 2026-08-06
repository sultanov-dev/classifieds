class PublicPages {
  HOME = '/'
  CATEGORYF = '/category'
  PRODUCTS = '/products'
}

export const publicPages = new PublicPages()

class AuthPages {
  REGISTER = '/register'
  LOGIN = '/login'
}

export const authPages = new AuthPages()

class ProtectPages {
  LIKED = '/profile/liked'
  SETTINGS = '/profile/settings'
  ADS = '/profile/ads'
  SEARCH = '/profile/search'
}

export const protectPages = new ProtectPages()
