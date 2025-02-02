import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import AppSettings from "../settings/AppSettings";
import UserSettings from "../settings/UserSettings";

export default function MyTabs() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3 d-flex justify-content-end"
    >
      <Tab className="me-2" eventKey="main" title="Main Settings">
        <AppSettings/>
      </Tab>
      <Tab className="me-2" eventKey="profile" title="User Settings">
        <UserSettings/>
      </Tab>
    </Tabs>
  );
}