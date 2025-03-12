
import AudienceSection from "./features/AudienceSection";
import ProblemSolutionSection from "./features/ProblemSolutionSection";
import SolutionSection from "./features/SolutionSection";

const Features = () => {
  return (
    <>
      <AudienceSection />
      <div className="section-light">
        <ProblemSolutionSection />
      </div>
      <SolutionSection />
    </>
  );
};

export default Features;
