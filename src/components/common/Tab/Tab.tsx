import React, { type ReactNode } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./tab.scss";

import { Tab as CustomTab } from "@mui/material";
interface ITabProps {
    value: string;
    children: ReactNode;
    tabs: { label: string; value: string }[];
    onChange?: (
        event: React.SyntheticEvent<Element, Event>,
        value: any,
    ) => void | undefined;
}
function Tab({ value, onChange, tabs, children }: ITabProps) {
    return (
        <TabContext value={value}>
            <TabList onChange={onChange}>
                {tabs.map((tab, index) => (
                    <CustomTab
                        key={tab.label + index}
                        label={tab.label}
                        value={tab.value}
                    />
                ))}
            </TabList>
            {tabs.map((tab) => (
                <TabPanel key={tab.value} value={tab.value}>
                    {children}
                </TabPanel>
            ))}
        </TabContext>
    );
}

export default Tab;
