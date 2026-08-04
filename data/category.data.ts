import { CarIcon, SmartphoneIcon, type LucideIcon } from 'lucide-react'

interface ICategory {
  id: string
  label: string
  slug: string
}

interface ICategoryData {
  id: number
  label: string
  Icon?: LucideIcon
  category: ICategory[]
}

export const categoryData: ICategoryData[] = [
  {
    id: 1,
    Icon: CarIcon,
    label: 'transport',
    category: [
      {
        id: '1',
        label: 'Yengil avtomobil',
        slug: 'yengil-automobil',
      },
      {
        id: '2',
        label: 'mahsus transport',
        slug: 'mahsux-transport',
      },
      {
        id: '3',
        label: 'motosikl',
        slug: 'motosikl',
      },
    ],
  },
  {
    id: 2,
    Icon: SmartphoneIcon,
    label: 'elektronika',
    category: [
      {
        id: '4',
        label: 'Telefon va akssesuarlar',
        slug: 'telefon-akssesuarlar',
      },
      {
        id: '5',
        label: 'televizorlar',
        slug: 'televizorlar',
      },
      {
        id: '6',
        label: 'Noutbook',
        slug: 'noutbook',
      },
      {
        id: '7',
        label: 'planshetlar',
        slug: 'planshetlar',
      },
    ],
  },
]
