"use client";

import { Edit3, HelpCircle, Loader2, Trash2 } from "lucide-react";
import {
  fetchFaqs,
  openDeleteFaqConfirm,
  openEditFaqModal,
} from "@/store/features/faqs/faqsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function FaqsTable() {
  const dispatch = useAppDispatch();
  const {
    isDescending,
    items,
    listStatus,
    pageNumber,
    pageSize,
    search,
    sortBy,
    totalPages,
    totalRecords,
  } = useAppSelector((state) => state.faqs);

  function fetchPage(targetPage: number) {
    void dispatch(
      fetchFaqs({
        pageNumber: targetPage,
        pageSize,
        search,
        sortBy,
        isDescending,
      })
    );
  }

  return (
    <>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#fbfaf8] text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            <tr>
              <th className="px-5 py-4">Question</th>
              <th className="px-5 py-4">Answer</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listStatus === "loading" ? (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-transfer-green" />
                  Loading FAQs...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  No FAQs found.
                </td>
              </tr>
            ) : (
              items.map((faq) => (
                <tr key={faq.id} className="text-sm font-medium text-transfer-dark">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbf5f0] font-bold text-transfer-green">
                        <HelpCircle className="h-5 w-5" />
                      </span>
                      <span className="max-w-[300px] font-bold line-clamp-2">
                        {faq.question}
                      </span>
                    </div>
                  </td>
                  <td className="max-w-[420px] px-5 py-4 text-[#667085]">
                    <span className="line-clamp-2">{faq.answer}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => dispatch(openEditFaqModal(faq))}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-transfer-dark hover:bg-gray-50"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(openDeleteFaqConfirm(faq))}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 text-xs font-bold text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[#667085]">
          Page {pageNumber} of {totalPages} - {totalRecords} records
        </p>
        <div className="flex gap-2">
          <button
            disabled={pageNumber <= 1 || listStatus === "loading"}
            onClick={() => fetchPage(pageNumber - 1)}
            className="h-9 rounded-lg border border-gray-200 px-4 text-sm font-bold text-transfer-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={pageNumber >= totalPages || listStatus === "loading"}
            onClick={() => fetchPage(pageNumber + 1)}
            className="h-9 rounded-lg border border-gray-200 px-4 text-sm font-bold text-transfer-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
