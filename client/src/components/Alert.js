import { useAppContext } from "./AppContext";

export default function Alert() {
  const { alertText, alertType } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}
