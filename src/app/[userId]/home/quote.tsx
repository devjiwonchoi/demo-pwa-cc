"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon } from "./edit-icon";

export function Quote() {
  const [quote, setQuote] = useState("");
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [tempQuote, setTempQuote] = useState("");

  const handleEditQuote = () => {
    setTempQuote(quote);
    setIsEditingQuote(true);
  };

  const handleSaveQuote = () => {
    if (tempQuote && tempQuote.trim()) {
      setQuote(tempQuote.trim());

      // TODO: Send data to server
      console.log('Sending quote data to server:', {
        quote: tempQuote.trim(),
        timestamp: new Date().toISOString(),
        action: 'update_quote'
      });
    }
    setIsEditingQuote(false);
  };

  const handleCancelEdit = () => {
    setTempQuote("");
    setIsEditingQuote(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between rounded-4xl bg-[#f9f9f9] p-4">
        {isEditingQuote ? (
          <EditQuote
            tempQuote={tempQuote}
            setTempQuote={setTempQuote}
            onSave={handleSaveQuote}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
          {quote ? (
            <p className="font-medium text-black">{quote}</p>
          ) : (
            <p className="font-medium text-app-disabled">나만의 동기부여 문구를 입력하세요</p>
          )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-app-disabled hover:bg-gray-200"
              onClick={handleEditQuote}
            >
              <EditIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function EditQuote({
  tempQuote,
  setTempQuote,
  onSave,
  onCancel
}: {
  tempQuote: string;
  setTempQuote: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const handleSaveQuote = async () => {
    if (tempQuote && tempQuote.trim()) {
      // TODO: Implement server call to save quote
      // try {
      //   const result = await updateMotivationQuoteAction(tempQuote.trim());
      //   if (result.success) {
      //     // Success handled by parent component
      //   } else {
      //     console.error("[v0] Error updating motivation quote:", result.error);
      //   }
      // } catch (error) {
      //   console.error("[v0] Error updating motivation quote:", error);
      // }
    }
    onSave();
  };

  const handleCancelEdit = () => {
    onCancel();
  };

  return (
    <div className="flex flex-1 items-center gap-2">
      <input
        type="text"
        value={tempQuote}
        onChange={(e) => setTempQuote(e.target.value)}
        className="flex-1 bg-transparent font-medium text-black placeholder-disabled outline-none"
        placeholder="나만의 동기부여 문구를 입력하세요"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSaveQuote();
          } else if (e.key === "Escape") {
            handleCancelEdit();
          }
        }}
      />
      {/* TODO: 저장 취소 sucks */}
      <Button
        variant="ghost"
        size="sm"
        className="h-auto px-2 py-1 text-xs text-app-primary hover:bg-app-primary/10"
        onClick={handleSaveQuote}
      >
        저장
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-auto px-2 py-1 text-xs text-app-disabled hover:bg-gray-100"
        onClick={handleCancelEdit}
      >
        취소
      </Button>
    </div>
  );
}
