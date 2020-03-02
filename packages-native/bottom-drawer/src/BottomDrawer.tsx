import { createElement, ReactNode } from "react";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { BottomDrawerStyle, defaultBottomDrawerStyle } from "./ui/Styles";
import { BottomSheet } from "./components/BottomSheet";
import { BottomDrawer as BottomDrawerComponent } from "./components/BottomDrawer";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { NativeModules, View } from "react-native";

export const BottomDrawer = (props: BottomDrawerProps<BottomDrawerStyle>): ReactNode => {
    const styles = flattenStyles(defaultBottomDrawerStyle, props.style);

    const isInteractableInstalled = typeof NativeModules.InteractableViewManager !== "undefined";

    if (!isInteractableInstalled) {
        throw new Error(
            "Module 'react-native-interactable' not installed, please install the dependency in you app before use this widget."
        );
    }

    switch (props.type) {
        case "sheet":
            return (
                <BottomSheet
                    content={props.mainContent}
                    header={props.headerContent}
                    stateAttribute={props.stateAttribute}
                    onOpen={props.onOpen}
                    onClose={props.onClose}
                    styles={styles}
                />
            );
        case "drawer":
            return (
                <BottomDrawerComponent
                    content={props.mainContent}
                    header={props.headerContent}
                    currentSnapPointAttribute={props.currentSnapPointAttribute}
                    onChange={props.onChange}
                    styles={styles}
                />
            );
    }
    return <View />;
};
