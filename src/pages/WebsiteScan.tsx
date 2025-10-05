import FreeAuditForm from "../components/WebsiteScan/FreeAuditForm";
import ScanLayout from "../components/common/Layout/ScanLayout";
import FreeAuditAnalysis from "../components/WebsiteScan/AuditAnalysis";

const WebsiteScan = () => {
  return (
    <div>
      <ScanLayout>
        <FreeAuditAnalysis/>
        <FreeAuditForm />
      </ScanLayout>
    </div>
  );
};

export default WebsiteScan;
