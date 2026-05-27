"use client";

export function TotalEarningsSection() {
  return (
    <div className="w-full space-y-4">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-teko text-xl text-white">Total Earnings overview</h2>
      </div>

      {/* Main Card */}
      <div className="bg-[#131624] border border-[#151A2A] rounded-[10px] p-6 space-y-4">
        {/* Earnings Table */}
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid gap-4 pb-2 text-center sm:grid-cols-3 sm:text-left">
            <div className="font-teko text-sm text-[#6A6F84] sm:text-left">Product/affil</div>
            <div className="font-teko text-sm text-[#6A6F84]">Direct affil</div>
            <div className="font-teko text-sm text-[#6A6F84]">Depth affil</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-4">
            <div className="grid gap-4 rounded-lg bg-[#0F121D] px-4 py-3 sm:grid-cols-3 sm:bg-transparent sm:px-0 sm:py-2">
              <div className="font-teko text-sm text-white sm:text-left">Staking (both types)</div>
              <div className="font-teko text-sm text-white text-center sm:text-left">100 000,00 CELESTIUM</div>
              <div className="font-teko text-sm text-white text-center sm:text-left">12 000,00 CELESTIUM</div>
            </div>
            <div className="grid gap-4 rounded-lg bg-[#0F121D] px-4 py-3 sm:grid-cols-3 sm:bg-transparent sm:px-0 sm:py-2">
              <div className="font-teko text-sm text-white sm:text-left">CELESTIUMs (all types)</div>
              <div className="font-teko text-sm text-white text-center sm:text-left">20 000,00 CELESTIUM</div>
              <div className="font-teko text-sm text-white text-center sm:text-left">10 000,00 CELESTIUM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
