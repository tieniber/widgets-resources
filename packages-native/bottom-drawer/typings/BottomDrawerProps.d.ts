/**
 * This file was generated from BottomDrawer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type TypeEnum = "sheet" | "drawer";

export interface BottomDrawerProps<Style> extends CommonProps<Style> {
    type: TypeEnum;
    stateAttribute?: EditableValue<boolean>;
    currentSnapPointAttribute?: EditableValue<BigJs.Big>;
    headerContent?: ReactNode;
    mainContent?: ReactNode;
    onOpen?: ActionValue;
    onClose?: ActionValue;
    onChange?: ActionValue;
}
