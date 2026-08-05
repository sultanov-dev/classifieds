export interface IProduct {
  id: number
  images: string[]
  title: string
  price: string
  isLiked: boolean
  region: string
  createdAt: Date
}

export const productData: IProduct[] = [
  {
    id: 1,
    images: ['/car.jpg', '/car2.jpeg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: false,
    region: 'toshkent',
    createdAt: new Date(),
  },
  {
    id: 2,
    images: ['/car2.jpeg', '/car.jpg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: true,
    region: 'Surxondaryo viloyati',
    createdAt: new Date(),
  },
  {
    id: 3,
    images: ['/car.jpg', '/car2.jpeg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: false,
    region: 'namangan viloyati',
    createdAt: new Date(),
  },
  {
    id: 4,
    images: ['/car2.jpeg', '/car.jpg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: true,
    region: 'xorazm viloyati',
    createdAt: new Date(),
  },
]
