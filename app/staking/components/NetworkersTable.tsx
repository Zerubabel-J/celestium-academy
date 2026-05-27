"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

interface NetworkerRow {
  wallet: string;
  regDate: string;
  binarLvl: string;
  side: "left" | "right";
  staking: string;
  betting: string;
  directTotal: string;
  stakingVolume: string;
  bettingVolume: string;
  totalVolume: string;
}

interface NetworkersTableProps {
  structureType: "binary" | "linear";
}

export function NetworkersTable({ structureType }: NetworkersTableProps) {
  const [viewType, setViewType] = useState<"table" | "tree">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("user-id");
  const itemsPerPage = 10;

  // Mock data
  const networkersData: NetworkerRow[] = [
    {
      wallet: "0x879...3Q3",
      regDate: "30. 7. 23",
      binarLvl: "LVL 1",
      side: "left",
      staking: "10 000,00 CELESTIUM",
      betting: "10 000,00 CELESTIUM",
      directTotal: "10 (5 active)",
      stakingVolume: "10 000,00 CELESTIUM",
      bettingVolume: "5 211,00 CELESTIUM",
      totalVolume: "26 055,00 CELESTIUM",
    },
    {
      wallet: "0x879...3Q3",
      regDate: "30. 7. 23",
      binarLvl: "LVL 2",
      side: "right",
      staking: "10 000,00 CELESTIUM",
      betting: "10 000,00 CELESTIUM",
      directTotal: "10 (5 active)",
      stakingVolume: "10 000,00 CELESTIUM",
      bettingVolume: "5 211,00 CELESTIUM",
      totalVolume: "26 055,00 CELESTIUM",
    },
    {
      wallet: "0x879...3Q3",
      regDate: "30. 7. 23",
      binarLvl: "LVL 99",
      side: "left",
      staking: "10 000,00 CELESTIUM",
      betting: "10 000,00 CELESTIUM",
      directTotal: "10 (5 active)",
      stakingVolume: "10 000,00 CELESTIUM",
      bettingVolume: "5 211,00 CELESTIUM",
      totalVolume: "26 055,00 CELESTIUM",
    },
    {
      wallet: "0x879...3Q3",
      regDate: "30. 7. 23",
      binarLvl: "LVL 5",
      side: "right",
      staking: "10 000,00 CELESTIUM",
      betting: "10 000,00 CELESTIUM",
      directTotal: "10 (5 active)",
      stakingVolume: "10 000,00 CELESTIUM",
      bettingVolume: "5 211,00 CELESTIUM",
      totalVolume: "26 055,00 CELESTIUM",
    },
    {
      wallet: "0x879...3Q3",
      regDate: "30. 7. 23",
      binarLvl: "LVL 6",
      side: "left",
      staking: "10 000,00 CELESTIUM",
      betting: "10 000,00 CELESTIUM",
      directTotal: "10 (5 active)",
      stakingVolume: "10 000,00 CELESTIUM",
      bettingVolume: "5 211,00 CELESTIUM",
      totalVolume: "26 055,00 CELESTIUM",
    },
  ];

  const paginatedData = networkersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(networkersData.length / itemsPerPage);

  const getSideIcon = (side: "left" | "right") => {
    if (side === "left") {
      return <ArrowUp className="w-[10px] h-[12px] text-[#DD375F]" />;
    }
    return <ArrowDown className="w-[10px] h-[5px] text-[#FFC800]" />;
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <h2 className="font-abel text-2xl text-white text-center">
        Active networkers in you structure and their results
      </h2>

      {/* View Type Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewType("table")}
          className={`px-[22px] py-[11px] rounded-[5px] font-teko text-xs transition-colors ${
            viewType === "table"
              ? "bg-[#FFC800] text-[#0F121D]"
              : "bg-[#131624] text-[#6A6F84]"
          }`}
        >
          Table
        </button>
        <button
          onClick={() => setViewType("tree")}
          className={`px-[22px] py-[11px] rounded-[5px] font-teko text-xs transition-colors ${
            viewType === "tree"
              ? "bg-[#FFC800] text-[#0F121D]"
              : "bg-[#131624] text-[#6A6F84]"
          }`}
        >
          Genealogy tree
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-white"></div>
          <span className="font-abel text-xs text-white">Left</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-white rotate-180"></div>
          <span className="font-abel text-xs text-white">Right</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-white"></div>
          <span className="font-abel text-xs text-white">Direct</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-white"></div>
          <span className="font-abel text-xs text-white">Depth</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-white">
            <div className="w-3 h-3 bg-white rounded-full m-[2px]"></div>
          </div>
          <span className="font-abel text-xs text-white">Betting active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-white">
            <div className="w-2.5 h-2.5 bg-white rounded-full m-[3px]"></div>
          </div>
          <span className="font-abel text-xs text-white">Staking active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#DD375F]"></div>
          <span className="font-abel text-xs text-white">Direct affil active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#FFC800]"></div>
          <span className="font-abel text-xs text-white">Depth binary active</span>
        </div>
      </div>

      {/* Sort and Filter Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-abel text-xs text-[#9999AD]">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-5 py-2 bg-transparent border border-[#6A6F84] rounded-[5px] text-white font-teko text-xs"
        >
          <option value="user-id">User ID</option>
          <option value="date">Date</option>
          <option value="volume">Volume</option>
        </select>
        <button className="px-5 py-2 bg-[#201C40] text-white font-abel text-xs rounded-[5px]">
          Date from-to
        </button>
      </div>

      {/* Table */}
      {viewType === "table" && (
        <div className="overflow-hidden rounded-[10px] border border-[#151A2A] bg-[#131624]">
          <div className="overflow-x-auto">
            <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow className="border-[#151A2A] hover:bg-transparent">
                <TableHead className="font-abel text-xs text-white text-left">Active clients</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">User as client data</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Networking structure activity</TableHead>
              </TableRow>
              <TableRow className="border-[#151A2A] hover:bg-transparent">
                <TableHead className="font-abel text-xs text-white">Wallet</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Binar LVL</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Side</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Staking</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Betting</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Direct (total)</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Staking volume</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Betting volume</TableHead>
                <TableHead className="font-abel text-xs text-white text-center">Total volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  className={`border-[#151A2A] ${
                    index % 2 === 0 ? "bg-[#0F121D]" : "bg-transparent"
                  }`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border ${
                        row.side === "left" ? "border-[#DD375F]" : "border-[#FFC800]"
                      } flex items-center justify-center`}>
                        {getSideIcon(row.side)}
                      </div>
                      <div>
                        <div className="font-abel text-xs text-[#666685]">{row.wallet}</div>
                        <div className="font-teko text-[10px] text-[#9999AD]">
                          Reg. date: <span className="font-abel">{row.regDate}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="inline-block px-3 py-1 border border-white rounded-2xl font-teko text-[10px] text-white">
                        {row.binarLvl}
                      </div>
                      <div className="mt-1 font-teko text-[10px] text-white">{row.staking}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`inline-block w-5 h-5 rounded-full border ${
                      row.side === "left" ? "border-[#DD375F]" : "border-[#FFC800]"
                    } flex items-center justify-center`}>
                      {row.side === "left" ? (
                        <ArrowUp className="w-[10px] h-[5px] text-[#DD375F]" />
                      ) : (
                        <ArrowDown className="w-[10px] h-[5px] text-[#FFC800]" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-teko text-[10px] text-white text-center">
                    {row.staking}
                  </TableCell>
                  <TableCell className="font-teko text-[10px] text-white text-center">
                    {row.betting}
                  </TableCell>
                  <TableCell className="font-teko text-[10px] text-white text-center">
                    {row.directTotal}
                  </TableCell>
                  <TableCell className="font-teko text-[10px] text-white text-center">
                    {row.stakingVolume}
                  </TableCell>
                  <TableCell className="font-teko text-[10px] text-white text-center">
                    {row.bettingVolume}
                  </TableCell>
                  <TableCell className="font-abel text-[10px] text-white text-center">
                    {row.totalVolume}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-2 border border-[#151A2A] rounded-[5px] bg-[#131624]">
          <Filter className="w-[18px] h-[18px] text-[#6A6F84]" />
          <span className="font-teko text-xs text-[#6A6F84]">
            Showing {itemsPerPage} of {networkersData.length} Ads
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
  );
}
