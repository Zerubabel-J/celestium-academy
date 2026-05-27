"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PayoutRow {
  date: string;
  payoutValue: string;
  description: string;
  txId: string;
}

interface TransactionRow {
  claimId: string;
  date: string;
  wallet: string;
  value: string;
  status: string | string; // Can be "Pending" or a transaction hash
}

interface PayoutTablesProps {
  activeTab: "affiliate" | "matching";
}

export function PayoutTables({ activeTab }: PayoutTablesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageTx, setCurrentPageTx] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const affiliateData: PayoutRow[] = Array.from({ length: 30 }, (_, i) => ({
    date: "30. 10. 2023",
    payoutValue: "26 055,00 CELESTIUM",
    description: "Commision 8% * 100,000 CELESTIUM wak leg",
    txId: "54fe6f6b7c9b619c2a10bd81a6e0abad76a1bab1d65bd7627097d20f1a8d1dee",
  }));

  const transactionData: TransactionRow[] = Array.from({ length: 30 }, (_, i) => ({
    claimId: "3516",
    date: "30. 10. 2023",
    wallet: "0x879...3Q3",
    value: "26 055,00 CELESTIUM",
    status: i === 0 ? "Pending" : "0x56d5ff3426f579.....a380793a8054b06715428e",
  }));

  const paginatedAffiliate = affiliateData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedTransaction = transactionData.slice(
    (currentPageTx - 1) * itemsPerPage,
    currentPageTx * itemsPerPage
  );

  const totalPages = Math.ceil(affiliateData.length / itemsPerPage);
  const totalPagesTx = Math.ceil(transactionData.length / itemsPerPage);

  return (
    <div className="space-y-8">
      {/* Affiliate Claim Payout Table */}
      {activeTab === "affiliate" && (
        <div className="space-y-4">
          <h2 className="font-abel text-2xl text-white text-center">
            Affiliate claim payout table
          </h2>

          <div className="overflow-hidden rounded-[10px] border border-[#151A2A] bg-[#131624]">
            <div className="overflow-x-auto">
              <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow className="border-[#151A2A] hover:bg-transparent">
                  <TableHead className="w-[133px] font-abel text-xs text-[#9999AD] text-center">
                    Payout date
                  </TableHead>
                  <TableHead className="w-[164px] font-abel text-xs text-[#9999AD] text-center">
                    Payout value
                  </TableHead>
                  <TableHead className="w-[279px] font-abel text-xs text-[#9999AD] text-center">
                    Counting of your revenue
                  </TableHead>
                  <TableHead className="w-[467px] font-abel text-xs text-[#9999AD] text-center">
                    Transaction TX id
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAffiliate.map((row, index) => (
                  <TableRow
                    key={index}
                    className={`border-[#151A2A] ${
                      index % 2 === 0 ? "bg-[#0F121D]" : "bg-transparent"
                    }`}
                  >
                    <TableCell className="font-abel text-xs text-white text-center">
                      {row.date}
                    </TableCell>
                    <TableCell className="font-abel text-xs text-white text-center">
                      {row.payoutValue}
                    </TableCell>
                    <TableCell className="font-teko text-xs text-white text-center">
                      {row.description}
                    </TableCell>
                    <TableCell className="font-teko text-xs text-white text-center">
                      {row.txId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-2 border border-[#151A2A] rounded-[5px] bg-[#131624]">
              <Filter className="w-[18px] h-[18px] text-[#6A6F84]" />
              <span className="font-teko text-xs text-[#6A6F84]">
                Showing {itemsPerPage} of {affiliateData.length} Ads
              </span>
              <ChevronDown className="w-3 h-3 text-[#6A6F84]" />
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-full border border-[#3E3788] text-white hover:bg-[#201C40] disabled:opacity-50"
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant="ghost"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-full border border-[#3E3788] text-white font-teko text-xs ${
                    currentPage === page ? "bg-[#201C40]" : ""
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-full border border-[#3E3788] text-white hover:bg-[#201C40] disabled:opacity-50"
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Overview Table */}
      {activeTab === "matching" && (
        <div className="space-y-4">
          <h2 className="font-abel text-2xl text-white text-center">
            Transaction overview
          </h2>

          <div className="overflow-hidden rounded-[10px] border border-[#151A2A] bg-[#131624]">
            <div className="overflow-x-auto">
              <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow className="border-[#151A2A] hover:bg-transparent">
                  <TableHead className="w-[133px] font-abel text-xs text-[#9999AD] text-center">
                    Date
                  </TableHead>
                  <TableHead className="w-[102px] font-abel text-xs text-[#9999AD] text-center">
                    Claim ID
                  </TableHead>
                  <TableHead className="w-[173px] font-abel text-xs text-[#9999AD] text-center">
                    Wallet
                  </TableHead>
                  <TableHead className="w-[201px] font-abel text-xs text-[#9999AD] text-center">
                    Value
                  </TableHead>
                  <TableHead className="w-[446px] font-abel text-xs text-[#9999AD] text-center">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransaction.map((row, index) => (
                  <TableRow
                    key={index}
                    className={`border-[#151A2A] ${
                      index % 2 === 0 ? "bg-[#0F121D]" : "bg-transparent"
                    }`}
                  >
                    <TableCell className="font-teko text-xs text-[#9999AD] text-center">
                      {row.date}
                    </TableCell>
                    <TableCell className="font-teko text-xs text-white text-center">
                      {row.claimId}
                    </TableCell>
                    <TableCell className="font-teko text-xs text-white text-center">
                      {row.wallet}
                    </TableCell>
                    <TableCell className="font-teko text-xs text-white text-center">
                      {row.value}
                    </TableCell>
                    <TableCell
                      className={`font-abel text-xs text-center ${
                        row.status === "Pending"
                          ? "text-[#EB5757]"
                          : "text-white font-teko"
                      }`}
                    >
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-2 border border-[#151A2A] rounded-[5px] bg-[#131624]">
              <Filter className="w-[18px] h-[18px] text-[#6A6F84]" />
              <span className="font-teko text-xs text-[#6A6F84]">
                Showing {itemsPerPage} of {transactionData.length} Ads
              </span>
              <ChevronDown className="w-3 h-3 text-[#6A6F84]" />
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPageTx(Math.max(1, currentPageTx - 1))}
                disabled={currentPageTx === 1}
                className="w-9 h-9 rounded-full border border-[#3E3788] text-white hover:bg-[#201C40] disabled:opacity-50"
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant="ghost"
                  onClick={() => setCurrentPageTx(page)}
                  className={`w-9 h-9 rounded-full border border-[#3E3788] text-white font-teko text-xs ${
                    currentPageTx === page ? "bg-[#201C40]" : ""
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPageTx(Math.min(totalPagesTx, currentPageTx + 1))}
                disabled={currentPageTx === totalPagesTx}
                className="w-9 h-9 rounded-full border border-[#3E3788] text-white hover:bg-[#201C40] disabled:opacity-50"
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
