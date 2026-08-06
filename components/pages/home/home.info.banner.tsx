import { AwardIcon, BotMessageSquareIcon, ShieldIcon, ZapIcon } from 'lucide-react'

export default function InfoBanner() {
  return (
    <div className="mb-10 grid grid-cols-1 gap-6 rounded-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
          <ShieldIcon className="size-8 text-purple-300" />
        </div>
        <div className="flex flex-col">
          <h6 className="text-base font-semibold">Xavfsiz va Ishonchli</h6>
          <span className="text-muted-foreground text-xs font-normal tracking-tight">
            100% xavfsiz bitimlar
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <ZapIcon className="size-8 text-yellow-300" />
        </div>
        <div className="flex flex-col">
          <h6 className="text-base font-semibold">Tez va Oson</h6>
          <span className="text-muted-foreground text-xs font-normal tracking-tight">
            Elon berish juda qulay
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
          <BotMessageSquareIcon className="size-8 text-purple-300" />
        </div>
        <div className="flex flex-col">
          <h6 className="text-base font-semibold">24/7 qollab-quvvatlash</h6>
          <span className="text-muted-foreground text-xs font-normal tracking-tight">
            Har doim siz bilan birga
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
          <AwardIcon className="size-8 text-purple-300" />
        </div>
        <div className="flex flex-col">
          <h6 className="text-base font-semibold">Sifat kafolati</h6>
          <span className="text-muted-foreground text-xs font-normal tracking-tight">
            Tekshirilgan elonlar
          </span>
        </div>
      </div>
    </div>
  )
}
