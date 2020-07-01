import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Login from './pages/Users/Login';
import Users from './pages/Users/Users';
import Pit from './pages/Mine/pit';
import EquipType from './pages/Equipment/EquipType'
import Zone from './pages/Mine/Zone';
import Bench from './pages/Mine/bench';
import Tab from './pages/Equipment/Tab';
import WorkshopType from './pages/Personel/WorkshopType';
import TeamType from './pages/Personel/TeamType';
import Team from './pages/Personel/Team';
import Equipment from './pages/Equipment/Equipment';
import ChangeSerial from './pages/Equipment/ChangeSerial';
import StateGroup from './pages/Equipment/StateGroup';
import Model from './pages/Equipment/Model';
import NumberOfShovelfuls from './pages/Equipment/NumberofShovelfuls';
import Ihm from './pages/Equipment/Ihm';
import State from './pages/Equipment/State';
import Job from './pages/Personel/job';
import Workshop from './pages/Personel/Workshop';
import Personel from './pages/Personel/Personel';
import Lithology from './pages/Lithologhy/Lithologhy';
import LithologyType from './pages/Lithologhy/LithologhyType';
import EntityType from './pages/Mine/EntityType';
import Patern from './pages/Mine/Patern';
import Messages from './pages/MapConfig/Messages';
import ImageGroup from './pages/MapConfig/ImageGroup';
import ImageSets from './pages/MapConfig/ImageSet';
import Image from './pages/MapConfig/Image';
import PersonelWorkshop from './pages/Personel/PersonelWorkshop';
import Mine from './pages/Mine/Mine';
import SubArea from './pages/Mine/SubArea';
import MineEntityType from './pages/Mine/MineEntityType';
import MineEntity from './pages/Mine/MineEntity';
import SubAreaType from './pages/Mine/SubAreaType';
import CalendarSetting from './pages/Calendar/CalendarSetting';
import Calendar from './pages/Calendar/Calendar';
import Shift from './pages/Calendar/Shift';
import Allocationworkshop from './pages/Personel/AllocationWorkshop'
import Group from './pages/Equipment/Group';
import NotFound from './components/404/404';
import Map from './pages/Map/Map'
import Farm from './pages/farm';


function Routes() {
    return (
        <Router>
            <Fragment>
                {/* <Switch> */}
                <Route exact path="/" component={Users} />
                {/* ******* EquipMent Menu ********/}
                <Route exact path="/changeSerial" component={ChangeSerial} />
                <Route exact path="/equipType" component={EquipType} />
                <Route exact path="/equipment" component={Equipment} />
                <Route exact path="/ihm" component={Ihm} />
                <Route exact path="/group" component={Group} />
                <Route exact path="/model" component={Model} />
                <Route exact path="/numberofshovelfuls" component={NumberOfShovelfuls} />
                <Route exact path="/stateGroup" component={StateGroup} />
                <Route exact path="/state" component={State} />
                <Route exact path="/tab" component={Tab} />
                {/* ******* Personal ********/}
                <Route exact path="/job" component={Job} />
                <Route exact path="/teamtype" component={TeamType} />
                <Route exact path="/team" component={Team} />
                <Route exact path="/workshopType" component={WorkshopType} />
                <Route exact path="/workshop" component={Workshop} />
                <Route exact path="/personel" component={Personel} />
                <Route exact path="/personelWorkshop" component={PersonelWorkshop} />
                <Route exact path="/allocationsWorkshop" component={Allocationworkshop} />
                {/* ******* Map ********/}
                <Route exact path="/imageGroup" component={ImageGroup} />
                <Route exact path="/ImageSets" component={ImageSets} />
                <Route exact path="/Image" component={Image} />
                <Route exact path="/Messages" component={Messages} />
                {/* ******* Calendar ********/}
                <Route exact path="/calendarsetting" component={CalendarSetting} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/shift" component={Shift} />
                {/* ****** Lithologhy */}
                <Route exact path="/lithology" component={Lithology} />
                <Route exact path="/lithologyType" component={LithologyType} />
                {/* ******* Mine Entity ********/}
                <Route exact path="/bench" component={Bench} />
                <Route exact path="/entityType" component={EntityType} />
                <Route exact path="/subArea" component={SubArea} />
                <Route exact path="/subareatype" component={SubAreaType} />
                <Route exact path="/mine" component={Mine} />
                <Route exact path="/pattern" component={Patern} />
                <Route exact path="/pit" component={Pit} />
                <Route exact path="/mineEntityType" component={MineEntityType} />
                <Route exact path="/mineEntity" component={MineEntity} />
                <Route exact path="/zone" component={Zone} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/map" component={Map} />
                <Route exact path='/createmodel' component={Farm} />
                {/* <Route component={NotFound} /> */}
                {/* <Redirect from='/*' to='/404' /> */}
                {/* </Switch> */}
            </Fragment>
        </Router >
    )
}
export default Routes;