import { forwardRef, useImperativeHandle, useState } from "react";
import type { ComponentType } from "react";

export type WithRefDialogHandle = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

type DialogProps = {
  open?: boolean;
  onClose?: () => void;
};

function withRefDialog<P extends DialogProps>(Component: ComponentType<P>) {
  const Wrapper = forwardRef<WithRefDialogHandle, P>((props, ref) => {
    const [open, setOpen] = useState(props.open ?? false);

    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose,
        toggle: handleToggle,
      }),
      []
    );

    function handleClose() {
      setOpen(false);
    }

    function handleOpen() {
      setOpen(true);
    }

    function handleToggle() {
      setOpen((prev) => !prev);
    }

    if (!open) return null;

    const componentProps = {
      ...props,
      open,
      ref,
      onClose: handleClose,
      onOpen: handleOpen,
      onToggle: handleToggle,
    } as unknown as P;

    return <Component {...componentProps} />;
  });

  Wrapper.displayName = `withRef(${Component.displayName || Component.name})`;

  return Wrapper;
}

export default withRefDialog;
