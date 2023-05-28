import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const timeout = 300_000; // Five minute timeout
const promptBeforeIdle = 10_000; // ten second countdown

function IdleMonitor({ timesUp }) {
  const [stateMonitor, setStateMonitor] = useState("Active");
  const [remaining, setRemaining] = useState(timeout);
  const [visible, setVisible] = useState(false);

  const onIdle = () => {
    setStateMonitor("Idle");
    setVisible(false);
    timesUp();
  };

  const onActive = () => {
    setStateMonitor("Active");
    setVisible(false);
  };

  const onPrompt = () => {
    setStateMonitor("Prompted");
    setVisible(true);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const handleStillHere = () => {
    activate();
  };

  const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0);
  if (timeTillPrompt > 0 && timeTillPrompt % 60 === 0) {
    console.log(
      `Current state: ${stateMonitor}, ${timeTillPrompt} seconds until prompt`
    );
  }

  const footerContent = (
    <div className="text-center">
      <Button
        label="Necesito más tiempo"
        icon="pi pi-check"
        onClick={handleStillHere}
        className="tienda-button"
        autoFocus
      />
    </div>
  );

  return (
    <>
      <Dialog
        header={
          <div className="text-center text-primary">
            <i className="pi pi-exclamation-circle" />
            <span className="ml-3">ATENCIÓN</span>
          </div>
        }
        visible={visible}
        style={{ width: "25vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={handleStillHere}
        footer={footerContent}
      >
        <div className="text-center">
          <span>Su sesión expirará en</span>
          <span className="text-primary font-bold mx-1">{remaining}</span>
          <span>segundos</span>
        </div>
      </Dialog>
    </>
  );
}

export default IdleMonitor;
