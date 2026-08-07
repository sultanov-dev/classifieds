'use client'

import { tableData } from '@/data/table.data'

import { columns } from './columns'
import { DataTable } from './data-table'

export default function ProfileAds() {
  return (
    <div className="mt-10">
      <DataTable data={tableData} columns={columns} />
    </div>
  )
}
