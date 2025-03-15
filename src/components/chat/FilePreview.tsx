
import React from "react";
import { FileUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  return (
    <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300 flex items-center">
      <FileUp size={12} className="mr-1" />
      <span className="truncate max-w-[150px]">{file.name}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-4 w-4 ml-1 text-gray-400 hover:text-gray-200"
        onClick={onRemove}
      >
        <X size={10} />
      </Button>
    </div>
  );
};
