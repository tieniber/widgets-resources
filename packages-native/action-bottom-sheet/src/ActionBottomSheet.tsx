import { createElement, useCallback, Fragment, useState } from "react";
import { TouchableOpacity, ActionSheetIOS, Text, Platform } from "react-native";
import { ActionBottomSheetProps } from "../typings/ActionBottomSheetProps";
import { ActionBottomSheetStyle } from "./ui/Styles";
import { ValueStatus } from "mendix";
import { executeAction } from "@widgets-resources/piw-utils";
import Icon from "react-native-vector-icons/FontAwesome";
// import RNBottomActionSheet from "react-native-bottom-action-sheet";

const RNBottomActionSheet = require("react-native-bottom-action-sheet").default;
// const Icon = require("react-native-vector-icons");

console.log("RNBottomActionSheet", RNBottomActionSheet);
console.log("Icon", Icon);

export function ActionBottomSheet(props: ActionBottomSheetProps<ActionBottomSheetStyle>): JSX.Element {
    if (Platform.OS === "ios") {
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
                    {props.caption && props.caption.status === ValueStatus.Available
                        ? props.caption.value
                        : "No caption"}
                </Text>
            </TouchableOpacity>
        );
    } else {
        const [actionBottomSheetVisible, setActionBottomSheetVisible] = useState(false);
        const toggleActionSheet = useCallback(() => {
            setActionBottomSheetVisible(!actionBottomSheetVisible);
        }, [actionBottomSheetVisible]);

        const onSelection = useCallback((index: any, value: any) => {
            // value is optional
            console.log("selection: " + index + " " + value);
            toggleActionSheet();
        }, []);

        let facebook = <Icon name={"facebook"} color={"#000000"} size={30} />;
        let instagram = <Icon name={"instagram"} color={"#000000"} size={30} />;
        let sheetView = (
            <RNBottomActionSheet.SheetView
                visible={actionBottomSheetVisible}
                title={"Awesome!"}
                theme={"light"}
                onSelection={onSelection}
            >
                <RNBottomActionSheet.SheetView.Item
                    title={"Facebook"}
                    subTitle={"Facebook Description"}
                    icon={<Text>bla</Text>}
                />
                <RNBottomActionSheet.SheetView.Item
                    title={"Instagram"}
                    subTitle={"Instagram Description"}
                    icon={instagram}
                />
            </RNBottomActionSheet.SheetView>
        );

        return (
            <Fragment>
                <TouchableOpacity onPress={toggleActionSheet}>
                    {facebook}
                    {instagram}
                    <Text>
                        {props.caption && props.caption.status === ValueStatus.Available
                            ? props.caption.value
                            : "No caption"}
                    </Text>
                </TouchableOpacity>
                {sheetView}
            </Fragment>
        );
    }
}
