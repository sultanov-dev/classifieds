import { IProduct } from './product.data'

export type TProfileAd = Omit<IProduct, 'isLiked' | 'region'>

export const tableData: TProfileAd[] = [
  {
    id: 1,
    images: ['/car.jpg', '/car2.jpeg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 2,
    images: ['/car2.jpeg', '/car.jpg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 3,
    images: ['/car.jpg', '/car2.jpeg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 4,
    images: ['/car2.jpeg', '/car.jpg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    createdAt: '2026-08-06T12:32:00+05:00',
  },
]
