import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { DatagridPreviewProps } from "../typings/DatagridProps";

export function getProperties(values: DatagridPreviewProps, defaultProperties: Properties): Properties {
    values.columns.forEach((column, index) => {
        if (!column.hasWidgets) {
            hidePropertyIn(defaultProperties, values, "columns", index, "content");
        }
        if (!values.columnsSortable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "sortable");
        }
        if (!values.columnsFilterable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "filterable");
        }
        if (!values.columnsResizable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "resizable");
        }
        if (!values.columnsDraggable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "draggable");
        }
        if (!values.columnsHidable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "hidable");
        }
    });
    if (!values.pagingEnabled) {
        hidePropertyIn(defaultProperties, values, "pagingPosition");
    }
    if (!values.showHeader) {
        hidePropertyIn(defaultProperties, values, "headerWidgets");
    }
    if (!values.showFooter) {
        hidePropertyIn(defaultProperties, values, "footerWidgets");
    }
    return defaultProperties;
}

export const getPreview = (values: DatagridPreviewProps): any => {
    const columns =
        values.columns.length > 0
            ? values.columns.map(column => ({
                  type: "layout",
                  children: [
                      {
                          type: "text",
                          content: column.header,
                          fontSize: 11
                      },
                      column.hasWidgets
                          ? { type: "container", property: column.content }
                          : {
                                type: "text",
                                content: column.attribute,
                                fontSize: 10
                            }
                  ]
              }))
            : [
                  {
                      type: "layout",
                      children: [
                          {
                              type: "text",
                              content: "Column",
                              fontSize: 11
                          },
                          {
                              type: "text",
                              content: "Value",
                              fontSize: 10
                          }
                      ]
                  }
              ];
    return {
        type: "layout",
        children: [
            values.showHeader
                ? { type: "layout", children: [{ type: "container", property: values.headerWidgets }] }
                : undefined, // Header
            { type: "layout", orientation: "horizontal", children: columns }, // Columns
            values.showFooter
                ? { type: "layout", children: [{ type: "container", property: values.footerWidgets }] }
                : undefined // Footer
        ]
    };
};
