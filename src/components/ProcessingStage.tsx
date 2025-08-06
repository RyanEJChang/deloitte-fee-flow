import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Code, Eye, ArrowRight } from 'lucide-react';

interface ProcessingStageProps {
  stageNumber: number;
  title: string;
  englishTitle: string;
  description: string[];
  isCompleted: boolean;
  inputFiles: number;
  outputFiles: number;
  onViewDetails: () => void;
  isConnected?: boolean;
}

export const ProcessingStage: React.FC<ProcessingStageProps> = ({
  stageNumber,
  title,
  englishTitle,
  description,
  isCompleted,
  inputFiles,
  outputFiles,
  onViewDetails,
  isConnected = true
}) => {
  return (
    <div className="relative">
      <Card className="w-80 h-72 p-6 bg-card border-divider hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 group">
        {/* Stage Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-text-secondary tracking-wider">
              STAGE {stageNumber.toString().padStart(2, '0')}
            </span>
          </div>
          {isCompleted && (
            <Badge className="bg-deloitte-green text-white hover:bg-deloitte-green-dark">
              <CheckCircle className="w-3 h-3 mr-1" />
              完成
            </Badge>
          )}
        </div>

        {/* Stage Title */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-text-primary mb-1 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-text-secondary font-medium">
            {englishTitle}
          </p>
        </div>

        {/* Processing Points */}
        <div className="mb-6">
          <p className="text-sm font-medium text-text-primary mb-2">處理重點：</p>
          <ul className="space-y-1">
            {description.map((point, index) => (
              <li key={index} className="text-xs text-text-secondary flex items-start gap-2">
                <span className="w-1 h-1 bg-deloitte-green rounded-full mt-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Statistics */}
        <div className="mb-4">
          <p className="text-xs font-medium text-text-primary mb-2">📊 處理統計</p>
          <p className="text-xs text-text-secondary">
            輸入：{inputFiles}個檔案 | 輸出：{outputFiles}個檔案
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline" 
            size="sm" 
            className="text-xs h-8 px-3 flex-1 border-divider hover:border-deloitte-green hover:text-deloitte-green transition-colors"
            onClick={onViewDetails}
          >
            <Eye className="w-3 h-3 mr-1" />
            檢視詳細
          </Button>
        </div>
      </Card>

      {/* Connection Arrow */}
      {isConnected && stageNumber < 5 && (
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-8 h-0.5 bg-deloitte-green relative">
            <ArrowRight className="w-3 h-3 text-deloitte-green absolute -right-1 -top-1" />
          </div>
        </div>
      )}
    </div>
  );
};