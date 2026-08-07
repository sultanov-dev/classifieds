import { Heading } from '@/shared/heading'

import { SettingsForm } from './settings.form'

export function SettingsContent() {
  return (
    <div className="my-9">
      <Heading title="Sozlamalar" className="mb-10" />
      <SettingsForm />
    </div>
  )
}
