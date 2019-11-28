/**
 * This file was generated from ActionBottomSheet.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue, NativeIcon } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Array<Partial<Style>>;
}

export interface ActionButtonsType {
    caption: DynamicValue<string>;
    action?: ActionValue;
}

export interface ActionBottomSheetProps<Style> extends CommonProps<Style> {
    caption?: DynamicValue<string>;
    icon?: DynamicValue<NativeIcon>;
    actionButtons: ActionButtonsType[];
}
