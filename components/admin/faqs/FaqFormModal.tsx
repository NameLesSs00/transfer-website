"use client";

import { FormEvent, useState } from "react";
import { HelpCircle, Loader2, Save } from "lucide-react";
import {
  closeFaqModal,
  createFaq,
  fetchFaqs,
  updateFaq,
} from "@/store/features/faqs/faqsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type FaqFormState = {
  question: string;
  answer: string;
};

export function FaqFormModal() {
  const { formMode, isFormModalOpen, selectedFaq } = useAppSelector((state) => state.faqs);

  if (!isFormModalOpen) return null;

  return <FaqFormModalContent key={`${formMode}-${selectedFaq?.id ?? "new"}`} />;
}

function FaqFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    pageSize,
    selectedFaq,
    updateStatus,
  } = useAppSelector((state) => state.faqs);
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";
  const [form, setForm] = useState<FaqFormState>({
    question: selectedFaq?.question ?? "",
    answer: selectedFaq?.answer ?? "",
  });

  const canSubmit = Boolean(form.question.trim()) && Boolean(form.answer.trim());

  function updateField<Key extends keyof FaqFormState>(
    key: Key,
    value: FaqFormState[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const payload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      displayOrder: 1,
    };

    const result =
      isEditing && selectedFaq
        ? await dispatch(updateFaq({ id: selectedFaq.id, ...payload }))
        : await dispatch(createFaq(payload));

    if (createFaq.fulfilled.match(result) || updateFaq.fulfilled.match(result)) {
      void dispatch(fetchFaqs({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit FAQ" : "Add FAQ"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Keep customer-facing questions clear and helpful.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeFaqModal())}
            className="rounded-lg px-3 py-1 text-sm font-bold text-[#667085] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-sm font-semibold text-transfer-dark">Question</span>
            <input
              value={form.question}
              onChange={(event) => updateField("question", event.target.value)}
              placeholder="How do I book a transfer?"
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-sm font-semibold text-transfer-dark">Answer</span>
            <textarea
              value={form.answer}
              onChange={(event) => updateField("answer", event.target.value)}
              placeholder="Choose your destination, vehicle, and trip date, then confirm your booking details."
              className="min-h-[130px] rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <button
            disabled={isSubmitting || !canSubmit}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#ad743a] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <HelpCircle className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create FAQ"}
          </button>
        </form>
      </section>
    </div>
  );
}
