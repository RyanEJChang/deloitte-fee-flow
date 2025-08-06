import React, { useState } from 'react';
import { ProcessingStage } from '@/components/ProcessingStage';
import { StageDetailModal } from '@/components/StageDetailModal';
import { ProcessingStats } from '@/components/ProcessingStats';
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
      isCompleted: true,
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
      isCompleted: true,
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
      isCompleted: true,
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
      isCompleted: false,
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
      isCompleted: false,
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

  const completedStages = stages.filter(stage => stage.isCompleted).length;

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

          {/* Center: Progress Indicator */}
          <div className="hidden lg:flex items-center gap-2">
            {stages.map((stage) => (
              <div key={stage.number} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    stage.isCompleted 
                      ? 'bg-deloitte-green text-white' 
                      : 'bg-background-light text-text-secondary'
                  }`}
                >
                  {stage.number}
                </div>
                {stage.number < stages.length && (
                  <div className={`w-6 h-0.5 ${stage.isCompleted ? 'bg-deloitte-green' : 'bg-divider'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Right: System Status and User Menu */}
          <div className="flex items-center gap-3">
            <Badge className="hidden md:inline-flex bg-deloitte-green text-white">
              系統正常運行
            </Badge>
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

      {/* Processing Stats Widget */}
      <ProcessingStats
        currentStage={completedStages + 1}
        totalStages={5}
        completedStages={completedStages}
        processingTime="02:34:15"
        fileCount={12}
        errorCount={0}
      />

      {/* Main Content */}
      <main className="pt-16">
        {/* System Title Section */}
        <section className="bg-background-light py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              勞務費自動化調節表工具
            </h1>
            <p className="text-lg text-text-secondary mb-2">
              Professional Fee Reconciliation Automation Tool
            </p>
            <p className="text-base text-text-secondary max-w-3xl mx-auto">
              企業級勞務費處理與調節表編製工具，提供完整的五階段自動化處理流程，
              確保財務資料的準確性與合規性，提升處理效率並降低人為錯誤。
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
                    isCompleted={stage.isCompleted}
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
                    isCompleted={stage.isCompleted}
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
