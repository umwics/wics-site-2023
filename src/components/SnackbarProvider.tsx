import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";
import React, { RefObject, useRef } from "react";

interface SnackbarProviderProps {
    children: React.ReactNode;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }: SnackbarProviderProps) => {
    const notistackRef = useRef<NotistackSnackbarProvider>() as RefObject<
        NotistackSnackbarProvider // Notistack doesn't like mutable ref type?
    >;
    const onDismiss = (key: React.ReactText) => () => {
        notistackRef.current?.closeSnackbar(key);
    };

    return (
        <NotistackSnackbarProvider
            ref={notistackRef}
            maxSnack={4}
            action={key => (
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={onDismiss(key)}
                >
                    <Close fontSize="small" />
                </IconButton>
            )}
        >
            {children}
        </NotistackSnackbarProvider>
    );
};

export default SnackbarProvider;
