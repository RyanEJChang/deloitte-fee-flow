import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Code, Eye, Download, Copy, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';

interface StageDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stageNumber: number;
  title: string;
  englishTitle: string;
}

interface FileContent {
  simple?: string;
  prompt?: string;
  code?: string;
}

export const StageDetailModal: React.FC<StageDetailModalProps> = ({
  open,
  onOpenChange,
  stageNumber,
  title,
  englishTitle
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [fileContent, setFileContent] = useState<FileContent>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const loadFile = async (fileName: string, contentKey: keyof FileContent) => {
    if (fileContent[contentKey] || loading[contentKey]) return;

    setLoading(prev => ({ ...prev, [contentKey]: true }));
    
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(fileName);
      
      if (error) {
        console.error(`Error loading ${fileName}:`, error);
        // Fallback content for demo
        setFileContent(prev => ({
          ...prev,
          [contentKey]: getFallbackContent(contentKey, stageNumber)
        }));
      } else {
        const text = await data.text();
        setFileContent(prev => ({ ...prev, [contentKey]: text }));
      }
    } catch (error) {
      console.error(`Error loading ${fileName}:`, error);
      // Fallback content for demo
      setFileContent(prev => ({
        ...prev,
        [contentKey]: getFallbackContent(contentKey, stageNumber)
      }));
    } finally {
      setLoading(prev => ({ ...prev, [contentKey]: false }));
    }
  };

  const getFallbackContent = (contentKey: keyof FileContent, stage: number): string => {
    switch (contentKey) {
      case 'simple':
        return `# 階段 ${stage} - ${title}

## 流程目的
此階段的主要目標是${getStageObjective(stage)}。

## 處理邏輯
1. 讀取輸入檔案並進行初步驗證
2. 根據業務規則執行資料處理
3. 生成標準化的輸出結果
4. 執行品質檢核和驗證

## 存在意義
此階段在整個勞務費處理流程中扮演關鍵角色，確保資料的準確性和完整性，為後續階段提供可靠的基礎資料。

## 預期成果
- 處理完成的標準化資料檔案
- 詳細的處理報告和統計資訊
- 品質檢核結果和異常報告`;

      case 'prompt':
        return `# 階段 ${stage} 詳細技術文檔

## 完整處理邏輯

### 資料輸入要求
- 檔案格式：Excel (.xlsx)
- 資料結構：標準化欄位定義
- 品質要求：完整性和準確性驗證

### 處理演算法
\`\`\`
1. 資料載入和預處理
   - 檔案完整性檢查
   - 資料格式標準化
   - 缺失值處理

2. 業務邏輯執行
   - 分類規則應用
   - 計算邏輯執行
   - 驗證規則檢查

3. 結果輸出
   - 標準化格式輸出
   - 報告生成
   - 品質指標計算
\`\`\`

### 技術細節
- 程式語言：Python 3.8+
- 主要套件：pandas, openpyxl, numpy
- 記憶體需求：建議 4GB+
- 處理時間：約 2-5 分鐘

### 品質控制
- 自動驗證機制
- 異常檢測和處理
- 完整性檢查
- 準確性驗證`;

      case 'code':
        return `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
階段 ${stage} - ${title}
專業勞務費處理系統
"""

import pandas as pd
import numpy as np
from pathlib import Path
import logging
from typing import Dict, List, Tuple

class Stage${stage}Processor:
    """階段 ${stage} 處理器類別"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.setup_logging()
    
    def setup_logging(self):
        """設定日誌記錄"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
    
    def load_input_files(self, file_paths: List[str]) -> Dict[str, pd.DataFrame]:
        """載入輸入檔案"""
        data = {}
        for file_path in file_paths:
            try:
                df = pd.read_excel(file_path)
                filename = Path(file_path).stem
                data[filename] = df
                self.logger.info(f"成功載入檔案: {filename}")
            except Exception as e:
                self.logger.error(f"載入檔案失敗 {file_path}: {e}")
                raise
        return data
    
    def process_data(self, input_data: Dict[str, pd.DataFrame]) -> Dict[str, pd.DataFrame]:
        """執行主要資料處理邏輯"""
        processed_data = {}
        
        # 主要處理邏輯
        for key, df in input_data.items():
            # 資料清理和預處理
            df_cleaned = self.clean_data(df)
            
            # 業務邏輯處理
            df_processed = self.apply_business_logic(df_cleaned)
            
            # 品質檢核
            df_validated = self.validate_data(df_processed)
            
            processed_data[f"{key}_processed"] = df_validated
            
        return processed_data
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """資料清理"""
        # 移除空行
        df = df.dropna(how='all')
        
        # 標準化欄位名稱
        df.columns = df.columns.str.strip()
        
        return df
    
    def apply_business_logic(self, df: pd.DataFrame) -> pd.DataFrame:
        """應用業務邏輯"""
        # 根據階段特定的業務規則處理資料
        # 這裡會包含具體的處理邏輯
        return df
    
    def validate_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """資料驗證"""
        # 執行品質檢核
        # 檢查必要欄位
        # 驗證資料範圍和格式
        return df
    
    def save_output(self, data: Dict[str, pd.DataFrame], output_dir: str):
        """儲存處理結果"""
        output_path = Path(output_dir)
        output_path.mkdir(exist_ok=True)
        
        for filename, df in data.items():
            file_path = output_path / f"{filename}.xlsx"
            df.to_excel(file_path, index=False)
            self.logger.info(f"儲存檔案: {file_path}")

def main():
    """主執行函數"""
    processor = Stage${stage}Processor()
    
    # 設定檔案路徑
    input_files = ["input_file_1.xlsx", "input_file_2.xlsx"]
    output_dir = "output"
    
    try:
        # 載入輸入檔案
        input_data = processor.load_input_files(input_files)
        
        # 執行處理
        processed_data = processor.process_data(input_data)
        
        # 儲存結果
        processor.save_output(processed_data, output_dir)
        
        print("階段 ${stage} 處理完成！")
        
    except Exception as e:
        logging.error(f"處理過程發生錯誤: {e}")
        raise

if __name__ == "__main__":
    main()`;
      default:
        return '';
    }
  };

  const getStageObjective = (stage: number): string => {
    const objectives: Record<number, string> = {
      1: '對供應商進行WHT/GUI分類處理，建立基礎分類架構',
      2: '執行期初資料調節，確保資料基準一致性',
      3: '進行六大費用分類，建立標準化分類體系',
      4: '執行費用重新分配，優化成本歸屬',
      5: '生成最終調節表，完成整體處理流程'
    };
    return objectives[stage] || '執行專業化資料處理';
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Load file content based on tab
    switch (value) {
      case 'overview':
        loadFile(`coding_${stageNumber}_simple.md`, 'simple');
        break;
      case 'details':
        loadFile(`coding_${stageNumber}_prompt.md`, 'prompt');
        break;
      case 'code':
        loadFile(`coding_${stageNumber}.py`, 'code');
        break;
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const renderContent = (content: string | undefined, isLoading: boolean) => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-20 w-full" />
        </div>
      );
    }

    if (!content) {
      return (
        <div className="text-center py-8 text-text-secondary">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>檔案載入中...</p>
        </div>
      );
    }

    return (
      <div className="relative">
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopy(content)}
            className="text-xs"
          >
            {copied ? <CheckCircle className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
            {copied ? '已複製' : '複製'}
          </Button>
        </div>
        <pre className="whitespace-pre-wrap text-sm text-text-primary bg-background-light p-4 rounded-md max-h-96 overflow-y-auto">
          {content}
        </pre>
      </div>
    );
  };

  // Load initial content when modal opens
  useEffect(() => {
    if (open && activeTab === 'overview') {
      loadFile(`coding_${stageNumber}_simple.md`, 'simple');
    }
  }, [open, stageNumber]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b border-divider">
          <div className="flex items-center gap-3">
            <Badge className="bg-deloitte-green text-white">
              STAGE {stageNumber.toString().padStart(2, '0')}
            </Badge>
            <div>
              <DialogTitle className="text-xl text-text-primary">{title}</DialogTitle>
              <p className="text-sm text-text-secondary mt-1">{englishTitle}</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3 bg-background-light">
              <TabsTrigger 
                value="overview" 
                className="text-sm data-[state=active]:bg-background data-[state=active]:text-deloitte-green data-[state=active]:border-b-2 data-[state=active]:border-deloitte-green"
              >
                <Eye className="w-4 h-4 mr-2" />
                流程概述
              </TabsTrigger>
              <TabsTrigger 
                value="details"
                className="text-sm data-[state=active]:bg-background data-[state=active]:text-deloitte-green data-[state=active]:border-b-2 data-[state=active]:border-deloitte-green"
              >
                <FileText className="w-4 h-4 mr-2" />
                技術文檔
              </TabsTrigger>
              <TabsTrigger 
                value="code"
                className="text-sm data-[state=active]:bg-background data-[state=active]:text-deloitte-green data-[state=active]:border-b-2 data-[state=active]:border-deloitte-green"
              >
                <Code className="w-4 h-4 mr-2" />
                原始碼
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="px-6 pb-6 flex-1 min-h-0">
            <TabsContent value="overview" className="mt-4">
              {renderContent(fileContent.simple, loading.simple || false)}
            </TabsContent>
            
            <TabsContent value="details" className="mt-4">
              {renderContent(fileContent.prompt, loading.prompt || false)}
            </TabsContent>
            
            <TabsContent value="code" className="mt-4">
              {renderContent(fileContent.code, loading.code || false)}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};