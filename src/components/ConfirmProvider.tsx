import React, { createContext, useCallback, useContext, useState } from "react";
import ConfirmDialog, { OptionProps } from "./ConfirmDialog";

type ConfirmContextInstance = ((options: OptionProps) => Promise<unknown>) | undefined;

const ConfirmContext = createContext<ConfirmContextInstance>(undefined);

interface ConfirmProviderProps {
    children: React.ReactNode;
}

const ConfirmProvider: React.FC<ConfirmProviderProps> = ({ children }: ConfirmProviderProps) => {
    const [options, setOptions] = useState<OptionProps>({});
    const [resolvers, setResolvers] = useState<
        [(value?: unknown) => void, (reason?: any) => void] | []
    >([]);
    const [resolve, reject] = resolvers;

    const confirm = useCallback(
        (options: OptionProps) =>
            new Promise((resolve, reject) => {
                setOptions(options);
                setResolvers([resolve, reject]);
            }),
        []
    );

    const handleClose = useCallback(() => {
        setResolvers([]);
    }, []);

    const handleCancel = useCallback(() => {
        reject && reject();
        handleClose();
    }, [reject, handleClose]);

    const handleConfirm = useCallback(() => {
        resolve && resolve();
        handleClose();
    }, [resolve, handleClose]);

    return (
        <React.Fragment>
            <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
            <ConfirmDialog
                open={resolvers.length === 2}
                {...options}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                onClose={handleClose}
            ></ConfirmDialog>
        </React.Fragment>
    );
};

export const useConfirm = (): ConfirmContextInstance => {
    return useContext(ConfirmContext);
};

export default ConfirmProvider;
