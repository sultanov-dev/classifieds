export interface IProduct {
  id: number
  images: string[]
  title: string
  price: string
  isLiked: boolean
  region: string
  createdAt: string
}

export const productData: IProduct[] = [
  {
    id: 1,
    images: ['/car.jpg', '/car2.jpeg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: false,
    region: 'toshkent',
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 2,
    images: ['/car2.jpeg', '/car.jpg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: true,
    region: 'Surxondaryo viloyati',
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 3,
    images: ['/car.jpg', '/car2.jpeg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: false,
    region: 'namangan viloyati',
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 4,
    images: ['/car2.jpeg', '/car.jpg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: true,
    region: 'xorazm viloyati',
    createdAt: '2026-08-06T12:32:00+05:00',
  },
]
