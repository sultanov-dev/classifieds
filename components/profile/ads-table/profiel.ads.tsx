'use client'

import { tableData } from '@/data/table.data'

import { columns } from './columns'
import { DataTable } from './data-table'

export default function ProfileAds() {
  return <DataTable data={tableData} columns={columns} />
}
