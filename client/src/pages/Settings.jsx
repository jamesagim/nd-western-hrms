import { useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import SettingsSidebar from "../components/settings/SettingsSidebar";

import CompanySettings from "../components/settings/CompanySettings";
import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";


function Settings(){


const [activeTab,setActiveTab]=
useState("Company");



const renderContent = ()=>{


switch(activeTab){


case "Company":
return <CompanySettings />;


case "Profile":
return <ProfileSettings />;


case "Security":
return <SecuritySettings />;


case "Preferences":
return <PreferencesSettings />;


case "Appearance":
return <AppearanceSettings />;


default:
return <CompanySettings />;


}



};



return(

<AppLayout>


<PageHeader

title="Settings"

subtitle="Manage system settings"

/>



<div className="flex gap-8 items-start">


<SettingsSidebar

activeTab={activeTab}

setActiveTab={setActiveTab}

/>



<Card className="flex-1">

{renderContent()}


</Card>



</div>



</AppLayout>


);


}


export default Settings;