import { ActionValue, EditableValue } from "mendix";
import { createElement, ReactElement, ReactNode, useCallback, useState } from "react";
import Interactable, { ISnapPoint } from "react-native-interactable";
import { Dimensions, LayoutChangeEvent, View } from "react-native";
import { BottomDrawerStyle } from "../ui/Styles";

interface BottomDrawerProps {
    header: ReactNode;
    content: ReactNode;
    currentSnapPointAttribute?: EditableValue<BigJs.Big>;
    onChange?: ActionValue;
    styles: BottomDrawerStyle;
}

export const BottomDrawer = (props: BottomDrawerProps): ReactElement => {
    const minHeight = 40;
    const maxHeight = Dimensions.get("window").height - 75;
    const [height, setHeight] = useState(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const newHeight = event.nativeEvent.layout.height;
        if (height !== newHeight && newHeight > 0) {
            if (newHeight > maxHeight) {
                setHeight(maxHeight);
            } else {
                setHeight(newHeight);
            }
        }
    };

    const getSnapPoints = useCallback((): ISnapPoint[] => {
        const snapPoints = [{ y: minHeight }];
        if (height / 2 > minHeight) {
            snapPoints.push({ y: height / 2 });
        }
        if (height > minHeight) {
            snapPoints.push({ y: height });
        }
        return snapPoints;
    }, [height]);

    return (
        <Interactable.View
            verticalOnly
            snapPoints={getSnapPoints()}
            boundaries={{ top: -300 }}
            onSnap={() => props.onChange && props.onChange.canExecute && props.onChange.execute()}
            initialPosition={{ y: minHeight }}
        >
            <View style={props.styles.container} onLayout={onLayout}>
                {props.header}
                {props.content}
            </View>
        </Interactable.View>
    );
};
