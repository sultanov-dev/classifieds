type TAttribute = {
  label: string
  value: string | number
}

export interface IProduct {
  id: number
  images: string[]
  category: string
  title: string
  price: string
  isLiked: boolean
  region: string
  createdAt: string
  attribute: TAttribute[]
}

export const productData: IProduct[] = [
  {
    id: 1,
    category: 'car',
    images: ['/car.jpg', '/car2.jpeg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: false,
    region: 'toshkent',
    attribute: [
      { label: 'Marka', value: 'BYD' },
      { label: 'Model', value: 'Chazor DMI' },
      { label: 'Ishlab chiqarilgan yil', value: 2025 },
      { label: 'Yurgani', value: '0 km' },
      { label: 'Karobka', value: 'Avtomat' },
    ],
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 2,
    category: 'phone',
    images: ['/car2.jpeg', '/car.jpg'],
    title: 'Iphone 15 pro max 95%',
    price: '12300000 so’m',
    isLiked: true,
    region: 'Surxondaryo viloyati',
    attribute: [
      { label: 'Brend', value: 'Apple' },
      { label: 'Xotira', value: '256 GB' },
      { label: 'Rangi', value: 'Titan Natural' },
      { label: 'Holati', value: 'Yangi' },
      { label: 'Batareykasi', value: '95%' },
    ],
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 3,
    category: 'car',
    images: ['/car.jpg', '/car2.jpeg'],
    title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
    price: '370 196 800 so’m',
    isLiked: false,
    region: 'toshkent',
    attribute: [
      { label: 'Marka', value: 'BYD' },
      { label: 'Model', value: 'Chazor DMI' },
      { label: 'Ishlab chiqarilgan yil', value: 2025 },
      { label: 'Yurgani', value: '0 km' },
      { label: 'Karobka', value: 'Avtomat' },
    ],
    createdAt: '2026-08-06T12:32:00+05:00',
  },
  {
    id: 4,
    category: 'phone',
    images: ['/car2.jpeg', '/car.jpg'],
    title: 'Iphone 15 pro max 95%',
    price: '12300000 so’m',
    isLiked: true,
    region: 'Surxondaryo viloyati',
    attribute: [
      { label: 'Brend', value: 'Apple' },
      { label: 'Xotira', value: '256 GB' },
      { label: 'Rangi', value: 'Titan Natural' },
      { label: 'Holati', value: 'Yangi' },
      { label: 'Batareykasi', value: '95%' },
    ],
    createdAt: '2026-08-06T12:32:00+05:00',
  },
]
