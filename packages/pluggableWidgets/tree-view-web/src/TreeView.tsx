import { createElement, ReactElement } from "react";
import { TreeViewContainerProps } from "../typings/TreeViewProps";
import { TreeView as TreeViewComponent } from "./components/TreeView";

export function TreeView(props: TreeViewContainerProps): ReactElement {
    // TODO: Handle async states more gracefully?
    const items =
        props.datasource.items?.map(item => {
            return {
                id: item.id,
                value: props.caption?.get(item).value,
                content: props.children?.get(item)
            };
        }) ?? [];

    return (
        <TreeViewComponent
            name={props.name}
            class={props.class}
            style={props.style}
            items={items}
            isUserDefinedLeafNode={!props.hasChildren}
            startExpanded={props.startExpanded}
        />
    );
}
