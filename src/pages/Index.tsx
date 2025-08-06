import React, { useState } from 'react';
import { ProcessingStage } from '@/components/ProcessingStage';
import { StageDetailModal } from '@/components/StageDetailModal';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, User, Bell } from 'lucide-react';
import deloitteLogo from '@/assets/deloitte-logo.png';

const Index = () => {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const stages = [
    {
      number: 1,
      title: '供應商WHT/GUI分類處理',
      englishTitle: 'Vendor Classification Processing',
      description: [
        '自動供應商分類',
        '稅務處理方式判定',
        '勞務費明細提取'
      ],
      inputFiles: 2,
      outputFiles: 2
    },
    {
      number: 2,
      title: '期初資料調節處理',
      englishTitle: 'Initial Data Reconciliation',
      description: [
        '期初餘額驗證',
        '歷史資料整合',
        '基準點建立'
      ],
      inputFiles: 3,
      outputFiles: 2
    },
    {
      number: 3,
      title: '六大分類費用處理',
      englishTitle: 'Six-Category Expense Processing',
      description: [
        '費用分類定義',
        '自動歸類邏輯',
        '分類準確性驗證'
      ],
      inputFiles: 2,
      outputFiles: 3
    },
    {
      number: 4,
      title: '費用重新分配邏輯',
      englishTitle: 'Cost Reallocation Logic',
      description: [
        '分配規則設定',
        '成本歸屬調整',
        '分配結果驗證'
      ],
      inputFiles: 3,
      outputFiles: 2
    },
    {
      number: 5,
      title: '調節表自動生成',
      englishTitle: 'Reconciliation Table Generation',
      description: [
        '最終報表產出',
        '差異分析計算',
        '品質檢核報告'
      ],
      inputFiles: 4,
      outputFiles: 1
    }
  ];

  const handleStageClick = (stageNumber: number) => {
    const stage = stages.find(s => s.number === stageNumber);
    if (stage) {
      setSelectedStage(stageNumber);
      setModalOpen(true);
    }
  };

  

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-divider">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo and System Name */}
          <div className="flex items-center gap-4">
            <img 
              src={deloitteLogo} 
              alt="Deloitte" 
              className="h-8 w-auto"
            />
            <div className="hidden md:block border-l border-divider pl-4">
              <h1 className="text-sm font-semibold text-text-primary">勞務費自動化處理系統</h1>
              <p className="text-xs text-text-secondary">Professional Fee Reconciliation Tool</p>
            </div>
          </div>

          {/* Center: System Info */}
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-text-primary">五階段處理流程展示</p>
            <p className="text-xs text-text-secondary">Professional Processing Workflow</p>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section with Enhanced Visual Design */}
        <section className="relative bg-gradient-to-br from-background via-background-light to-background py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-deloitte-green rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-deloitte-green-dark rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-3 bg-deloitte-green/10 px-6 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-deloitte-green rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-deloitte-green">Deloitte專業級處理平台</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              勞務費自動化
              <span className="text-deloitte-green">調節表工具</span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-4 max-w-2xl mx-auto">
              Professional Fee Reconciliation Automation Tool
            </p>
            
            <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
              企業級勞務費處理與調節表編製工具展示平台，完整呈現五階段自動化處理流程的專業架構，
              深度剖析每個環節的技術實現與商業邏輯，為企業提供頂級的財務處理解決方案洞察。
            </p>
            
          </div>
        </section>

        {/* Processing Workflow Visualization */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                五階段處理流程視覺化
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                完整的勞務費處理工作流程，每個階段都經過精心設計，確保資料處理的專業性和準確性
              </p>
            </div>

            {/* Horizontal Stage Cards */}
            <div className="relative">
              {/* Desktop Layout */}
              <div className="hidden lg:flex items-center justify-center gap-8 overflow-x-auto pb-8">
                {stages.map((stage) => (
                  <ProcessingStage
                    key={stage.number}
                    stageNumber={stage.number}
                    title={stage.title}
                    englishTitle={stage.englishTitle}
                    description={stage.description}
                    inputFiles={stage.inputFiles}
                    outputFiles={stage.outputFiles}
                    onViewDetails={() => handleStageClick(stage.number)}
                    isConnected={stage.number < stages.length}
                  />
                ))}
              </div>

              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden space-y-6">
                {stages.map((stage) => (
                  <ProcessingStage
                    key={stage.number}
                    stageNumber={stage.number}
                    title={stage.title}
                    englishTitle={stage.englishTitle}
                    description={stage.description}
                    inputFiles={stage.inputFiles}
                    outputFiles={stage.outputFiles}
                    onViewDetails={() => handleStageClick(stage.number)}
                    isConnected={false}
                  />
                ))}
              </div>
            </div>

            {/* Processing Chain Overview */}
            <div className="mt-16 text-center">
              <div className="bg-background-light rounded-lg p-8 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                  完整處理鏈路展示
                </h3>
                <div className="text-sm text-text-secondary space-y-2">
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <span className="px-3 py-1 bg-background rounded border">匯入_總明細.xlsx</span>
                    <span className="text-deloitte-green">→</span>
                    <span className="px-3 py-1 bg-deloitte-green text-white rounded">分類處理</span>
                    <span className="text-deloitte-green">→</span>
                    <span className="px-3 py-1 bg-background rounded border">調節表輸出</span>
                  </div>
                  <p className="text-xs mt-4">
                    資料流程經過五個專業處理階段，確保每一步都符合企業級標準和合規要求
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Stage Detail Modal */}
      {selectedStage && (
        <StageDetailModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          stageNumber={selectedStage}
          title={stages.find(s => s.number === selectedStage)?.title || ''}
          englishTitle={stages.find(s => s.number === selectedStage)?.englishTitle || ''}
        />
      )}
    </div>
  );
};

export default Index;
