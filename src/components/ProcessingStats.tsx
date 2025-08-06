import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface ProcessingStatsProps {
  currentStage: number;
  totalStages: number;
  completedStages: number;
  processingTime: string;
  fileCount: number;
  errorCount: number;
}

export const ProcessingStats: React.FC<ProcessingStatsProps> = ({
  currentStage,
  totalStages,
  completedStages,
  processingTime,
  fileCount,
  errorCount
}) => {
  const progressPercentage = (completedStages / totalStages) * 100;

  return (
    <Card className="fixed top-4 right-4 p-4 bg-background/95 backdrop-blur-sm border-divider shadow-[var(--shadow-elevated)] z-50 min-w-72">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">處理狀態監控</h3>
          <Badge 
            variant={errorCount > 0 ? "destructive" : "default"}
            className={errorCount > 0 ? "" : "bg-deloitte-green text-white"}
          >
            {errorCount > 0 ? "有警告" : "正常"}
          </Badge>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">處理進度</span>
            <span className="text-text-primary font-medium">
              {completedStages}/{totalStages} 階段
            </span>
          </div>
          <div className="w-full bg-background-light rounded-full h-2">
            <div 
              className="bg-deloitte-green h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Current Stage */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-deloitte-green rounded-full animate-pulse" />
          <span className="text-xs text-text-secondary">
            當前階段：<span className="text-text-primary font-medium">Stage {currentStage}</span>
          </span>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-divider">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-text-secondary" />
            <div>
              <p className="text-xs text-text-secondary">處理時間</p>
              <p className="text-xs font-medium text-text-primary">{processingTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-text-secondary" />
            <div>
              <p className="text-xs text-text-secondary">檔案數量</p>
              <p className="text-xs font-medium text-text-primary">{fileCount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-deloitte-green" />
            <div>
              <p className="text-xs text-text-secondary">已完成</p>
              <p className="text-xs font-medium text-text-primary">{completedStages}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertCircle className={`w-4 h-4 ${errorCount > 0 ? 'text-deloitte-red' : 'text-text-secondary'}`} />
            <div>
              <p className="text-xs text-text-secondary">警告</p>
              <p className="text-xs font-medium text-text-primary">{errorCount}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};