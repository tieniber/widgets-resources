import { createElement, useCallback } from "react";
import { TouchableOpacity, ActionSheetIOS, Text } from "react-native";
import { ActionBottomSheetProps } from "../typings/ActionBottomSheetProps";
import { ActionBottomSheetStyle } from "./ui/Styles";
import { ValueStatus } from "mendix";
import { executeAction } from "@widgets-resources/piw-utils";

export function ActionBottomSheet(props: ActionBottomSheetProps<ActionBottomSheetStyle>): JSX.Element {
    const actionButtons = props.actionButtons;

    const showActionSheet = useCallback(() => {
        const buttonCaptions: string[] = ["Cancel"];
        const buttonActions: Array<(() => void) | undefined> = [undefined];

        actionButtons.forEach(actionButton => {
            buttonCaptions.push(
                actionButton.caption.status === ValueStatus.Available ? actionButton.caption.value : ""
            );
            buttonActions.push(() => executeAction(actionButton.action));
        });

        ActionSheetIOS.showActionSheetWithOptions(
            { options: buttonCaptions, destructiveButtonIndex: 1, cancelButtonIndex: 0 },
            buttonIndex => {
                if (buttonActions[buttonIndex]) {
                    buttonActions[buttonIndex]!();
                }
            }
        );
    }, [actionButtons]);

    return (
        <TouchableOpacity onPress={showActionSheet}>
            <Text>
                {props.caption && props.caption.status === ValueStatus.Available ? props.caption.value : "No caption"}
            </Text>
        </TouchableOpacity>
    );
}
