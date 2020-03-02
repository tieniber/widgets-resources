import { Problem, Properties } from "../typings/PageEditor";
import { hideProperty } from "./utils/PageEditorUtils";

export function getProperties(values: any, defaultProperties: Properties): Properties {
    console.log(JSON.stringify(defaultProperties));
    // console.log(target); The epic is still waiting to be merged by PageEditor
    if (values.type === "sheet") {
        hideProperty<any>("currentSnapPointAttribute", defaultProperties);
        hideProperty<any>("onChange", defaultProperties);
        hideProperty<any>("headerContent", defaultProperties);
    } else {
        hideProperty<any>("stateAttribute", defaultProperties);
        hideProperty<any>("onOpen", defaultProperties);
        hideProperty<any>("onClose", defaultProperties);
    }
    return defaultProperties;
}

export function check(values: any): Problem[] {
    const errors: Problem[] = [];
    console.log(values, errors);
    // if (values.type === "drawer") {
    //     errors.push({
    //         property: "snapPoints",
    //         severity: "error",
    //         message: "Snap points are required if ",
    //         url: "https://github.com/mendix/widgets-resources/blob/master/packages-web/maps/README.md#limitations"
    //     });
    // }
    return errors;
}
