import { createElement, ReactNode, Fragment, ReactElement, useState, useEffect, useCallback, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button, Dimensions, LayoutChangeEvent, View, Text } from "react-native";
import { ActionValue, EditableValue, ValueStatus } from "mendix";
import { executeAction } from "@widgets-resources/piw-utils";
import { BottomDrawerStyle } from "../ui/Styles";

interface BottomSheetProps {
    content: ReactNode;
    header: ReactNode;
    stateAttribute?: EditableValue<boolean>;
    onOpen?: ActionValue;
    onClose?: ActionValue;
    styles: BottomDrawerStyle;
}

export const BottomSheet = (props: BottomSheetProps): ReactElement => {
    const bottomSheetRef = useRef<RBSheet>(null);
    const minHeight = 40;
    const maxHeight = Dimensions.get("window").height - 75;
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);

    const onLayoutHandler = (event: LayoutChangeEvent): void => {
        console.warn("ON LAYOUT");
        const newHeight = event.nativeEvent.layout.height;
        console.warn("new height", newHeight);
        if (height !== newHeight && newHeight > 0) {
            if (newHeight > maxHeight) {
                setHeight(maxHeight);
            } else {
                setHeight(newHeight);
            }
        }
    };

    useEffect(() => {
        console.warn("USE EFFECT");
        if (
            props.stateAttribute &&
            props.stateAttribute.status === ValueStatus.Available &&
            props.stateAttribute.value
        ) {
            if (props.stateAttribute.value !== open) {
                if (!open && bottomSheetRef.current) {
                    bottomSheetRef.current.open();
                }
                setOpen(props.stateAttribute.value);
            }
        }
    }, [props.stateAttribute, bottomSheetRef.current]);

    const onOpenHandler = useCallback((): void => {
        console.warn("ON OPEN");
        if (bottomSheetRef.current) {
            bottomSheetRef.current.open();
            setOpen(true);
            if (props.stateAttribute) {
                props.stateAttribute.setValue(true);
            }
            executeAction(props.onOpen);
        }
    }, [bottomSheetRef.current, props.stateAttribute]);

    const onCloseHandler = useCallback(() => {
        console.warn("ON CLOSE");
        setOpen(false);
        if (props.stateAttribute) {
            props.stateAttribute.setValue(false);
        }
        executeAction(props.onClose);
    }, [props.stateAttribute]);

    return (
        <Fragment>
            <Text>Height: {Math.round(height ?? 0)}</Text>
            <Button title="OPEN BOTTOM SHEET" onPress={onOpenHandler} />
            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown
                closeOnPressMask
                closeOnPressBack
                onClose={onCloseHandler}
                height={height && height > 0 ? Math.round(height) : 260}
                customStyles={{
                    container: {
                        maxHeight,
                        minHeight,
                        backgroundColor: "white"
                    },
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <View onLayout={onLayoutHandler}>
                    {props.header}
                    {props.content}
                </View>
            </RBSheet>
        </Fragment>
    );
};
