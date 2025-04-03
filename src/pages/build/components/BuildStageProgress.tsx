
import { Progress } from "@/components/ui/progress";
import { ChatStage } from "../constants";

interface BuildStage {
  key: string;
  label: string;
}

interface BuildStageProgressProps {
  stages: BuildStage[];
  currentStage: ChatStage;
}

export const BuildStageProgress: React.FC<BuildStageProgressProps> = ({ 
  stages, 
  currentStage 
}) => {
  const stageIndex = stages.findIndex(stage => stage.key === currentStage);
  const progressPercentage = ((stageIndex + 1) / stages.length) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        {stages.map((stage, index) => (
          <div 
            key={stage.key} 
            className={`${index === stageIndex ? 'text-violet-400 font-medium' : ''}`}
          >
            {stage.label}
          </div>
        ))}
      </div>
      <Progress value={progressPercentage} className="h-1 bg-gray-800" />
    </div>
  );
};
